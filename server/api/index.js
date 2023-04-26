const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const router = express.Router();
const { BankA, BankB } = require("./static/bank");

const {
  calculateFlatRate,
  calculateReducingBalance,
} = require("./services/loan.service");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/calculate", async (req, res) => {
  const amount = parseFloat(req.body.amount);
  const frequency = req.body.frequency;
  const period = parseInt(req.body.period);
  const startDate = new Date(req.body.startdate);
  const interestType = req.body.interesttype;

  let results_a, results_b;
  // Calculate loan instalments based on interest type
  if (interestType === "flat-rate") {
    results_a = calculateFlatRate(
      BankA.name,
      amount,
      BankA.flat_rate,
      frequency,
      period
    );
    results_b = calculateFlatRate(
      BankB.name,
      amount,
      BankB.flat_rate,
      frequency,
      period
    );
    console.log(results_a, results_b);
    res.json({ results_a, results_b });
  } else if (interestType === "reducing-balance") {
    results_a = calculateReducingBalance(
      BankA.name,
      amount,
      BankA.reducing_rate,
      period,
      frequency
    );
    results_b = calculateReducingBalance(
      BankB.name,
      amount,
      BankB.reducing_rate,
      period,
      frequency
    );
    console.log(results_a, results_b);
    res.json({ results_a, results_b });
  }
});

router.post("/send-email", upload.single("pdf"), (req, res) => {
  // send the email with the PDF attachment
  const email = req.body.email;

  const uploadedFile = req.file;
  const fileName = uploadedFile.filename;
  const filePath = uploadedFile.path;
  console.log(`File ${fileName} uploaded to ${filePath}`);

  // Create a nodemailer transport object with your email service configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "youremail@gmail.com",
      pass: "yourpassword",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: "PDF file attachment",
    text: "Please find the attached PDF file",
    attachments: [
      {
        filename: fileName,
        path: filePath,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email error:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = router;
