const fs = require("fs");
const path = require("path");

const directoryPath = __dirname; // Current directory

fs.readdir(directoryPath, (err, folders) => {
  if (err) {
    return console.error("Unable to scan directory:", err);
  }

  folders.forEach((folder) => {
    const folderPath = path.join(directoryPath, folder);

    if (fs.lstatSync(folderPath).isDirectory()) {
      // Check if the folder name ends with "Details"
      const folderNameMatch = folder.match(/(.+)Details$/);

      if (folderNameMatch) {
        const newFolderName = folderNameMatch[1] + "Controls";
        const newFolderPath = path.join(directoryPath, newFolderName);

        // Rename the folder
        fs.renameSync(folderPath, newFolderPath);

        // Get the files in the renamed folder
        const files = fs.readdirSync(newFolderPath);

        files.forEach((file) => {
          const filePath = path.join(newFolderPath, file);

          // Check if the file name ends with "Details.tsx"
          const fileNameMatch = file.match(/(.+)Details\.tsx$/);

          if (fileNameMatch) {
            const newFileName = fileNameMatch[1] + "Controls.tsx";
            const newFilePath = path.join(newFolderPath, newFileName);

            // Rename the file
            fs.renameSync(filePath, newFilePath);
          }
        });
      }
    }
  });

  console.log("Folders and files renamed successfully!");
});
