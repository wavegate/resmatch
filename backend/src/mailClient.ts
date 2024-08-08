import formData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "mailgun",
  domain: "mail.residencymatch.net",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

export default mg;
