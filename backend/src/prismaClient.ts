import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   log: ["query"],
// });

// prisma.$on("query", (e) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });

export default prisma;
