// Import the required modules
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to convert a string to title case
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function updateStateNamesToTitleCase() {
  try {
    // Get all cities from the database
    const cities = await prisma.city.findMany();

    // Iterate over each city and update the state name to title case
    for (const city of cities) {
      const updatedState = titleCase(city.state);

      // Update the city's state name
      await prisma.city.update({
        where: { id: city.id },
        data: { state: updatedState },
      });

      console.log(`Updated state name for ${city.name}: ${updatedState}`);
    }

    console.log(
      "All state names have been updated to title case successfully."
    );
  } catch (error) {
    console.error("Error updating state names:", error);
  } finally {
    // Close the Prisma Client connection when done
    await prisma.$disconnect();
  }
}

// Run the function to update state names
updateStateNamesToTitleCase();
