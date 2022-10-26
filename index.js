require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const express = require("express");
const bodyParser = require("body-parser");
const client = require("twilio")(accountSid, authToken);
const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/dashboard.html`, (err) => {
    if (err) console.log(err);
  });
});
app.post("/", (req, res) => {
  client.messages
    .create({
      body: req.body.message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:" + req.body.contactNo,
      mediaUrl: req.body.url,
    })
    .then((message) => console.log(message.sid))
    .done();
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server has been started listening at 3000...");
});
