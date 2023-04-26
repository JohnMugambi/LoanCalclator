const BankA = {
  name: "Bank A",
  flat_rate: 20,
  reducing_rate: 18,
};
const BankB = {
  name: "Bank B",
  flat_rate: 22,
  reducing_rate: 25,
};
const Fees = {
  processing_rate: 3, //Percentage
  excise_duty: 20, //
  legal_fees: 10000,
};

module.exports = { BankA, BankB, Fees };
