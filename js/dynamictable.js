/*
  File: /~dmarsine/js/dynamictable.js
  This file will read input from a form and output a multiplication table.
  Author: Dean Marsinelli
  Contact: marsinellid@gmail.com
  Created on: September 23, 2014
*/

// when the document is ready, attach this event handler to
// the submit event of form with id "frm"
$(document).ready( function() {
  $("#frm").submit(function () {
    // clear any previous output
    $("#formOutput").html("");
    $("#errorMessage").html("");
    $("span[id^='error']").html("");
    
    // get all 4 values entered from the form
    var rowStart = $("#rowStart").val();
    var rowEnd = $("#rowEnd").val();
    var colStart = $("#colStart").val();
    var colEnd = $("#colEnd").val();
    
    var invalid = false;
    // validate that all 4 values entered were numbers
    // and if not, let the user know which input was wrong
    if (!$.isNumeric(rowStart)) {
      $("#error1").html("*");
      invalid = true;
    }
    if (!$.isNumeric(rowEnd)) {
      $("#error2").html("*");
      invalid = true;
    }
    if (!$.isNumeric(colStart)) {
      $("#error3").html("*");
      invalid = true;
    }
    if (!$.isNumeric(colEnd)) {
      $("#error4").html("*");
      invalid = true;
    }
    
    // if any input was invalid, show and error message and stop the script
    if (invalid == true) {
      $("#errorMessage").html("Please enter numbers only.");
      return false;
    }
    
    // if all input was valid
    // convert the form input to integers, truncate any floating point numbers
    rowStart = parseInt(rowStart);
    rowEnd = parseInt(rowEnd);
    colStart = parseInt(colStart);
    colEnd = parseInt(colEnd);

    // create arrays of each numbers in the initial rows and columns
    var rowArray = CreateNumberArray(rowStart, rowEnd);
    var colArray = CreateNumberArray(colStart, colEnd);
    
   
    //build a multiplication table and print it to the page
    PrintTable(rowArray, colArray);
  });
});

/*
  This function takes in a starting number and ending number and 
  builds an array of all values between those numbers (including both of them)
*/
function CreateNumberArray(start, end){
  // create empty array
  var array = [];

  // calculate the total length of the array
  var num = Math.abs(end - start);
  
  var increment;
  // if the start of the row is less than the end, we will be incrementing
  if (start < end) {
    increment = 1;
  }
  // otherwise we will decrement
  else {
    increment = -1;
  }
  // fill a vector with all the elements of the starting row
  for (var i = 0; i <= num; i++)
  {
    array[i] = start;
    start = start + increment;
  }
  
  // return the created array
  return array;
}

/*
  This function takes in two arrays of numbers (multiplicands and multipliers)
  and builds a multiplication table out of their products
*/
function PrintTable(rowArray, colArray) {

    // first print the top row by itself
    var toprow = "<tr><td></td>";
    for (var k = 0, kk = colArray.length; k < kk; k++)
    {
      toprow += "<td class='topRow'>" + colArray[k] + "</td>";
    }
    toprow += "</tr>"
    $("#formOutput").append(toprow);
    
    // now build the rest of the multiplication table by traversing each row
    // and each column in each row, and multiplying the values from the corresponding arrays
    for (var i = 0, ii = rowArray.length; i < ii; i++)
    {
      var rowContent = "<tr><td>" + rowArray[i] + "</td>";
      for (var j = 0, jj = colArray.length; j < jj; j++)
      {
       rowContent += "<td>" + rowArray[i] * colArray[j] + "</td>";
      }
      rowContent += "</tr>";
      $("#formOutput").append(rowContent);
    }
}