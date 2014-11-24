/*
  File: /~dmarsine/js/dynamictabs.js
  This file will read input from a form and output a 
  multiplication table using tabs.
  Author: Dean Marsinelli
  Contact: marsinellid@gmail.com
  Created on: November 22, 2014
*/

// global variables for tab count
var totalTabs = 0;
var count = 0;

$(document).ready( function() {
  // add a form validator to the input form
  $("#frm").validate({
    // add rules that all 4 inputs are required and must be numbers
    rules: {
      rowStart: {
        required: true,
        number: true
      },
      rowEnd: {
        required: true,
        number: true
      },
      colStart: {
        required: true,
        number: true
      },
      colEnd: {
        required: true,
        number: true
      }
    },
    // add custom error messages and also highlight the input for errors
    messages: {
      rowStart: {
        required: function() {
          HighlightError("rowStart");
          return "Row Start is required.";
        },
        number: function() {
          HighlightError("rowStart");
          return "Please enter a number for Row Start.";
        }
      },
      rowEnd: {
        required: function() {
          HighlightError("rowEnd");
          return "Row End is required.";
        },
        number: function() {
          HighlightError("rowEnd");
          return "Please enter a number for Row End.";
        }
      },
      colStart: {
        required: function() {
          HighlightError("colStart");
          return "Column Start is required.";
        },
        number: function() {
          HighlightError("colStart");
          return "Please enter a number for Column Start.";
        }
      },
      colEnd: {
        required: function() {
          HighlightError("colEnd");
          return "Column End is required.";
        },
        number: function() {
          HighlightError("colEnd");
          return "Please enter a number for Column End.";
        }
      }
    },
    // if an input is successful, get rid of the highlighted border
    success: function(error, element) {
      $(element).css({"border": ""});
    },
    // custom error placement, to the right of input fields
    errorPlacement: function(error, element) {
      var id = $(element).attr("id");
      $("#" + id + "Error").append(error);
    },
    // if the input is valid and the form is submitted, call the SubmitForm function
    submitHandler: SubmitForm
  });
  
  // add a click listener to the clear button that clears all tabs
  $("#clearButton").bind("click", function() {
    if (totalTabs != 0) {
      $('#myTabs ul li').remove();
      $('#myTabs div').remove();
      $("#myTabs").tabs("destroy");
      count = 0;
      totalTabs = 0;
    }
  });

}); // end of document ready
  
/*
  This function will highlight an error when validating the form
*/
function HighlightError(str) {
  $("#" + str).css({"border": "2px solid red"});
}  
 
/*
  This function is called if the form has valid input.
  It will create the multiplacation table and place it 
  in a tab on the page.
*/
function SubmitForm() {
  // get all 4 values entered from the form
  var rowStart = $("#rowStart").val();
  var rowEnd = $("#rowEnd").val();
  var colStart = $("#colStart").val();
  var colEnd = $("#colEnd").val();
  
  // convert the form input to integers, truncate any floating point numbers
  rowStart = parseInt(rowStart);
  rowEnd = parseInt(rowEnd);
  colStart = parseInt(colStart);
  colEnd = parseInt(colEnd);

  // create arrays of each numbers in the initial rows and columns
  var rowArray = CreateNumberArray(rowStart, rowEnd);
  var colArray = CreateNumberArray(colStart, colEnd);
  
  // build a multiplication table as a big string
  var tableContent = CreateTable(rowArray, colArray);

  // create the new tab and add in the HTML for the multiplication table
  // and add a button to close the current tab
  var tabs = $( "#myTabs" ).tabs();
  var ul = tabs.find( "ul" );
  ul.append("<li><a href='#tab" + count + "'>" + rowStart + "-" + rowEnd + " * " + colStart + "-" + colEnd + "</a></li>");
  tabs.append("<div id='tab" + count + "'>" + tableContent + "<p><button class='close'>close tab</button></p></div>");
  tabs.tabs( "refresh" );
  tabs.tabs({ active: totalTabs });
  count++;
  totalTabs++;
        
  // add a click listener for the close button on this new tab
  $("#tab" + (count - 1) + " .close").bind("click", function() { 
    var tabsdiv = $("#myTabs");
    var tabslist = tabsdiv.find("ul");
    
    // get the id of the tab
    var id = $(this).parent().parent().attr("id");
    // remove the div
    $(this).parent().parent().remove();

    // remove the li with the correct id
    $("#myTabs").find("ul").find("li a[href='#" + id + "']").parent().remove();
    
    // refresh the tabs
    tabsdiv.tabs("refresh");
    totalTabs = totalTabs - 1;

    // if there are no tabs, destroy the jQuery tabs element and reset the count
    if (totalTabs == 0) {
      tabsdiv.tabs("destroy");
      count = 0;
    }
  }); // end of close button listener
} // end of form submit

/*
  This function takes in a starting number and ending number and 
  builds an array of all values between those numbers (including both of them)
*/
function CreateNumberArray(start, end) {
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
function CreateTable(rowArray, colArray) {

    // first print the top row by itself
    var content = "<table><tbody id='formOutput'><tr><td></td>";
    for (var k = 0, kk = colArray.length; k < kk; k++)
    {
      content += "<td class='topRow'>" + colArray[k] + "</td>";
    }
    content += "</tr>"

    // now build the rest of the multiplication table by traversing each row
    // and each column in each row, and multiplying the values from the corresponding arrays
    for (var i = 0, ii = rowArray.length; i < ii; i++)
    {
      content += "<tr><td>" + rowArray[i] + "</td>";
      for (var j = 0, jj = colArray.length; j < jj; j++)
      {
        content += "<td>" + rowArray[i] * colArray[j] + "</td>";
      }
    }
    content += "</tr></tbody></table>";
    return content;
}