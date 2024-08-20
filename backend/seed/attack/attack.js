const axios = require("axios");

const url = "http://localhost:3000/comment/214";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzMsImlhdCI6MTcyNDEyNDU3MSwiZXhwIjoxNzI2NzE2NTcxfQ.aoYDxeqb1jb3mEtEMBNf2-CCDBV9pggDGRpYtc6JRak";

const requestBody = {
  content: "tests",
};

axios
  .put(url, requestBody, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  });

axios
  .delete(url, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  });
