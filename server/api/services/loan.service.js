const { Fees } = require("../static/bank");

const bankLoanFees = (amount) => {
  let processing_fees = (amount * Fees.processing_rate) / 100;
  let duty = (processing_fees * Fees.excise_duty) / 100;
  let take_home_amt = amount - processing_fees - duty;
  let legal_fees = Fees.legal_fees;
  return { processing_fees, duty, legal_fees, take_home_amt };
};

const dueDate = (months) => {
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setMonth(now.getMonth() + months);
  return futureDate.toDateString();
};
const calculateReducingBalance = (
  bank,
  loan_amount,
  interest_rate,
  loan_period,
  pay_frequency
) => {
  // Define variables
  const loanAmount = loan_amount;
  const interestRate = interest_rate / 100;
  const loanPeriod = loan_period / 12; //get loan period in years
  const paymentFrequency = pay_frequency; // 'monthly', 'semi-annual', or 'annual'

  // Calculate payment amounts and interest rates based on payment frequency
  let paymentsPerYear;
  let interestPerYear;
  let paymentAmount;

  switch (paymentFrequency) {
    case "monthly":
      paymentsPerYear = 12;
      interestPerYear = interestRate / 12;
      paymentAmount = loanAmount / (loanPeriod * paymentsPerYear);
      break;
    case "semi-annual":
      paymentsPerYear = 2;
      interestPerYear = interestRate / 2;
      paymentAmount = loanAmount / (loanPeriod * paymentsPerYear);
      break;
    case "annually":
      paymentsPerYear = 1;
      interestPerYear = interestRate;
      paymentAmount = loanAmount / (loanPeriod * paymentsPerYear);
      break;
    default: // quarterly
      paymentsPerYear = 4;
      interestPerYear = interestRate / 4;
      paymentAmount = loanAmount / (loanPeriod * paymentsPerYear);
  }

  // Calculate reducing balance based on payment frequency
  let balance = loanAmount;
  let totalInterest = 0;
  for (let i = 1; i <= loanPeriod * paymentsPerYear; i++) {
    const interest = (balance * interestPerYear) / paymentsPerYear;
    balance -= interest;
    balance -= paymentAmount;
    totalInterest += interest;
    if (
      (paymentFrequency === "monthly" && i % 3 === 0) ||
      (paymentFrequency === "semi-annual" && i % (paymentsPerYear / 2) === 0) ||
      (paymentFrequency === "annually" && i % paymentsPerYear === 0) ||
      (paymentFrequency === "quarterly" && i % 4 === 0)
    ) {
      console.log(`Period ${i}: ${balance.toFixed(2)}`);
    }
  }
  const totalLoanAmount = loanAmount + totalInterest;
  const additional_fees = bankLoanFees(loanAmount);
  return {
    bank: bank,
    total_interest: totalInterest.toFixed(2),
    total_amount: totalLoanAmount.toFixed(2),
    installment_amount: (totalLoanAmount / paymentsPerYear).toFixed(2),
    ...additional_fees,
  };
};

const calculateFlatRate = (
  bank,
  amount,
  interest_rate,
  pay_frequency,
  loan_period
) => {
  const rate = interest_rate / 100; //in decimal
  const period = loan_period / 12; //in years
  const interest = amount * rate * period;
  const total_amount = amount + interest;

  var installment = null;
  let fees = bankLoanFees(amount);

  if (pay_frequency == "annually") {
    let t = loan_period / 12;
    installment = total_amount / t;
  } else if (pay_frequency == "quarterly") {
    let t = loan_period / 4;
    installment = total_amount / t;
  } else if (pay_frequency == "semi-annual") {
    let t = loan_period / 6;
    installment = total_amount / t;
  } else {
    //every month
    let t = loan_period;
    installment = total_amount / t;
  }

  const additional_fees = bankLoanFees(amount);

  return {
    bank: bank,
    amount: amount,
    total_interest: Math.round(interest),
    total_amount: Math.round(total_amount),
    installment_amount: Math.round(installment),
    due_date: dueDate(loan_period),
    ...additional_fees,
  };
};

module.exports = { calculateReducingBalance, calculateFlatRate };
