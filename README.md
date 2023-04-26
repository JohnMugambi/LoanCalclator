# LoanCalculator

This is a loan calculator web application that allows users to calculate their loan payments based on different interest rates and repayment terms. The application is built using HTML, CSS, and JavaScript, and utilizes the jQuery library for dynamic rendering of the results.

Features:

    Simple Easy-to-use interface for entering loan amount, interest rate, and repayment term
    Option to select between flat rate and reducing balance interest calculation methods
    Dynamic display of loan payments and total interest paid based on the selected options
    Ability to print or download the loan payment schedule as a PDF file
    Integration with an email service to send loan payment details to a specified email address
    Responsive design for optimal viewing on desktop and mobile devices

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 8.0.0

## Folder structure

    .
    ├── ...
    ├── calculator          # Client files
    │   ├── css             # CSS files
    │   ├── image           # Projects images
    │   ├── js              # Script files
    │   ├── php
    │   └── index.htm       # Main html page
    │
    ├── server              # Server files
    │   ├── api             # Routes and services
    │   └── uploads         # PDF documents uploads
    │
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md

## Getting started

- Clone the repository

```
git clone  https://github.com/JohnMugambi/LoanCalclator.git
```

- Install dependencies

```
cd <project_name>
npm install
```

- Run server

```
cd server
nodemon server.js
```

## Nodemailer configuration

Edit [line](https://github.com/JohnMugambi/LoanCalculator/blob/9879d5b9b86987e20f8f3c39ec7afdd271dc2451/server/api/index.js#L81) and [line](https://github.com/JohnMugambi/LoanCalculator/blob/9879d5b9b86987e20f8f3c39ec7afdd271dc2451/server/api/index.js#L88) by adding your email address.

### Loan Calculator Snapshots

Website UI -
![UI snapshot](/calculator/images/ui-snap.png)

PDF Design
![PDF snapshot](/calculator/images/pdf-snap.png)
