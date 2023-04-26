$(document).ready(function () {
  $("#loan-form").submit(function (event) {
    event.preventDefault();
    var frequency = $("#frequency").val();
    var formData = $(this).serialize();
    var url = "http://localhost:3000/api/calculate"; // replace with your server-side processing script
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      success: function (data) {
        // Display results in a response table
        console.log(data);
        var tableRows = "";
        // Loop through the data and create table rows and cells
        $.each(data, function (index, item) {
          tableRows += "<tr>";
          tableRows += "<td>" + item.bank + "</td>";
          tableRows += "<td>" + item.amount + "</td>";
          tableRows += "<td>" + item.total_interest + "</td>";
          tableRows += "<td>" + item.total_amount + "</td>";
          tableRows += "<td>" + item.installment_amount + "</td>";
          tableRows += "<td>" + item.due_date + "</td>";
          tableRows += "</tr>";
        });
        var fees_row = "";
        function feesRow(data) {
          let total_fees =
            data.results_a.legal_fees +
            data.results_a.duty +
            data.results_a.processing_fees;
          fees_row += "<tr>";
          fees_row += "<td>" + "Payment frequency" + "</td>";
          fees_row += "<td colspan='5'>" + frequency + "</td>";
          fees_row += "</tr>";
          fees_row += "<tr>";
          fees_row += "<th>" + "Processing Fees" + "</th>";
          fees_row +=
            "<td colspan='5'>" + data.results_a.processing_fees + "</td>";
          fees_row += "</tr>";
          fees_row += "<tr>";
          fees_row += "<th>" + "Duty" + "</th>";
          fees_row += "<td colspan='5'>" + data.results_a.duty + "</td>";
          fees_row += "</tr>";
          fees_row += "<tr>";
          fees_row += "<th>" + "Legal Fees" + "</th>";
          fees_row += "<td colspan='5'>" + data.results_a.legal_fees + "</td>";
          fees_row += "</tr>";
          fees_row += "<tr>";
          fees_row += "<th>" + "Total Fees" + "</th>";
          fees_row += "<td colspan='5'>" + total_fees + "</td>";
          fees_row += "</tr>";
        }
        feesRow(data);
        var footerRows = "";
        function tfootRow(data) {
          let total_fees =
            data.results_a.legal_fees +
            data.results_a.duty +
            data.results_a.processing_fees;
          footerRows += "<tr>";
          footerRows += "<th>" + "TakeAway Amount" + "</th>";
          footerRows +=
            "<th colspan='5'>" + data.results_a.take_home_amt + "</th>";
          footerRows += "</tr>";
        }
        tfootRow(data);

        // Append the table rows to the table body
        $("#loan-table tbody").append(tableRows);
        $("#loan-table tbody").append(fees_row);
        $("#loan-table tfoot").append(footerRows);
      },
      error: function (error) {
        console.error(error);
      },
    });
  });
});

function exportPDF() {
  var pdf = new jsPDF();
  pdf.text(10, 20, "Loan Summary Details");
  pdf.autoTable({
    html: "#loan-table",
    startY: 25,
    theme: "grid",
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
    },
    styles: { minCellHeight: 10 },
  });
  const url = URL.createObjectURL(pdf.output("blob"));
  const a = document.createElement("a");
  a.href = url;
  a.download = "summary.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function sendEmail() {
  // create a new FormData object
  var email = document.getElementById("email_sub").value;
  var formData = new FormData();

  formData.append("email", email);
  var url = "http://localhost:3000/api/send-email";

  var pdf = new jsPDF();
  pdf.text(10, 20, "Loan Summary Details");
  pdf.autoTable({
    html: "#loan-table",
    startY: 25,
    theme: "grid",
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
    },
    styles: { minCellHeight: 10 },
  });
  const pdfBlob = pdf.output("blob");
  formData.append("pdf", pdfBlob, "summary-details.pdf");

  console.log(formData);
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
    },
    error: function (textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    },
  });
}
