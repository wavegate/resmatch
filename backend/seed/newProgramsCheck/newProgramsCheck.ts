import { chromium } from "playwright";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  // Load your HTML content as a string from a file
  const htmlContent = fs.readFileSync("newProgramsCheck/file.html", "utf8");

  // Initialize Playwright
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set the content of the page to the loaded HTML
  await page.setContent(htmlContent);

  // Select all article elements with the class 'result'
  const articles = await page.$$("article.result");

  // Process each article sequentially to avoid race conditions
  for (const article of articles) {
    const specialty = await article.$eval(".result__badge", (el) =>
      el.textContent.trim()
    );
    const location = await article.$eval("address", (el) =>
      el.textContent.trim()
    );
    const programName = await article.$eval("h3", (el) =>
      el.textContent.trim()
    );
    const nrmpCode = await article.$eval(
      "footer ul li:nth-child(1) span:nth-child(2)",
      (el) => el.textContent.trim()
    );
    const acgmeCode = await article.$eval(
      "footer ul li:nth-child(2) span:nth-child(2)",
      (el) => el.textContent.trim()
    );

    // Split location into city and state
    const [cityName, state] = location.split(",").map((part) => part.trim());

    // Check if the program exists
    const existingProgram = await prisma.program.findUnique({
      where: {
        nrmpProgramCode: nrmpCode,
      },
    });

    if (!existingProgram) {
      console.log(`Program not found in database: ${nrmpCode}`);

      // Extract institutionCode (first 4 characters of nrmpCode)
      const institutionCode = nrmpCode.slice(0, 4);

      // Check if institution exists
      let institution = await prisma.institution.findUnique({
        where: {
          institutionCode: institutionCode,
        },
      });

      // Create institution if it doesn't exist
      if (!institution) {
        institution = await prisma.institution.create({
          data: {
            name: programName,
            institutionCode: institutionCode,
          },
        });
        console.log(`Created new institution: ${institutionCode}`);
      }

      // Check if city exists (case-insensitive check on name)
      let city = await prisma.city.findFirst({
        where: {
          name: { equals: cityName, mode: "insensitive" },
          state: state,
        },
      });

      // Create city if it doesn't exist
      if (!city) {
        city = await prisma.city.create({
          data: {
            name: cityName,
            state: state,
          },
        });
        console.log(`Created new city: ${cityName}, ${state}`);
      }

      // Extract specialtyCode (next 3 characters of nrmpCode)
      const specialtyCode = nrmpCode.slice(4, 7);

      // Check if specialty exists
      let specialtyRecord = await prisma.specialty.findUnique({
        where: {
          specialtyCode: specialtyCode,
        },
      });

      if (!specialtyRecord) {
        console.log(`Specialty code ${specialtyCode} not found.`);
        continue; // Skip creating the program if the specialty is not found
      }

      // Create the new program
      await prisma.program.create({
        data: {
          name: "Internal Medicine",
          nrmpProgramCode: nrmpCode,
          acgmeCode: acgmeCode,
          city: { connect: { id: city.id } },
          institution: { connect: { id: institution.id } },
          specialty: { connect: { id: specialtyRecord.id } },
        },
      });
      console.log(`Created new program: ${nrmpCode}`);
    }
  }

  await browser.close();
  await prisma.$disconnect();
})();
