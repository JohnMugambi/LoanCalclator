<?php
// Retrieve loan data from the form
$amount = $_POST['amount'];
$frequency = $_POST['frequency'];
$period = $_POST['period'];
$start_date = $_POST['start-date'];
$interest_type = $_POST['interest-type'];

// Calculate loan instalments based on interest type
if ($interest_type == 'flat-rate') {
  // Perform Flat Rate calculation
  // ...
} else if ($interest_type == 'reducing-balance') {
  // Perform Reducing Balance
}
$data = array('name' => 'John', 'age' => 30);
echo json_encode($data);