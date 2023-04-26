const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
app.use(
  cors({
    //origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
//Route to the loan calculator
const loanApiRoute = require("./api/index");
app.use("/api", loanApiRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
