import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  const invites = [];

  // Path to the CSV file
  const filePath = path.resolve(__dirname, "seedData/invites.csv");

  // Read and parse the CSV file

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      // Extract and process data from each row
      const programCode = row["Program Code"] || undefined;
      if (!programCode) return; // Skip if there is no programCode
      const inviteDateTime = row["Date"] ? new Date(row["Date"]) : undefined;
      const locationState = row["Location"] || undefined;
      const img = row["IMG"] || undefined;
      const medicalDegree = row["Degree Type"] || undefined;
      const geographicPreference = row["Geo"]
        ? row["Geo"] === "TRUE"
          ? true
          : false
        : undefined;
      const signal = row["Sig"]
        ? row["Sig"] === "TRUE"
          ? true
          : false
        : undefined;

      let step1Score = row["Step1"];
      let step1ScorePass;
      let comlex1ScorePass;

      if (step1Score === "P") {
        step1ScorePass = true;
        step1Score = null;
      } else {
        step1Score = parseInt(step1Score, 10) || null;
      }

      const comlex1Score = row["Comlex1"];
      if (comlex1Score === "P") {
        comlex1ScorePass = true;
      }

      const step2Score = parseInt(row["Step2"], 10) || null;
      const comlex2Score = row["Comlex2"] || undefined;
      const visaRequired = row["Visa Required"]
        ? row["Visa Required"] === "TRUE"
          ? true
          : false
        : undefined;
      const subI = row["SubI"]
        ? row["SubI"] === "TRUE"
          ? true
          : false
        : undefined;
      const home = row["Home"]
        ? row["Home"] === "TRUE"
          ? true
          : false
        : undefined;
      const yearOfGraduation = parseInt(row["Year of graduation"], 10) || null;
      const greenCard = row["Green card"]
        ? row["Green card"] === "TRUE"
          ? true
          : false
        : undefined;
      const away = row["Away"]
        ? row["Away"] === "TRUE"
          ? true
          : false
        : undefined;
      console.log(programCode);
      // Find related User and Program in the database
      // You might need to modify this based on your schema
      try {
        // Create an invite object to insert into the database
        const invite = {
          programCode,
          userId: 7,
          anonymous: true,
          graduateType:
            img === "nonUSIMG" || img === "USIMG" ? "IMG" : undefined,
          img,
          inviteDateTime,
          locationState,
          medicalDegree,
          geographicPreference,
          signal,
          step1ScorePass,
          step1Score,
          comlex1ScorePass,
          comlex2Score,
          step2Score,
          visaRequired,
          subI,
          home,
          yearOfGraduation,
          greenCard,
          away,
        };
        invites.push(invite);
      } catch (e) {
        console.log(e);
      }
    })
    .on("end", async () => {
      // Insert data into the database
      for (let i = 0; i < invites.length; i++) {
        const invite = invites[i];
        try {
          const program = await prisma.program.findUnique({
            where: { nrmpProgramCode: invite.programCode },
          });
          const { programCode, ...rest } = invite;
          await prisma.interviewInvite.create({
            data: { ...rest, programId: program.id },
          });
          console.log(
            `Successfully inserted invite ${i + 1}:`,
            invite.programCode
          );
        } catch (error) {
          console.error(
            `Error inserting invite ${i + 1} with programId ${
              invite.programId
            }:`,
            error
          );
        }
      }

      console.log("Invites data has been seeded.");
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
