/*
  File: /~dmarsine/js/assignment5.js
  Loads JSON text to the page
  Author: Dean Marsinelli
  Contact: marsinellid@gmail.com
  Created on: October 31, 2014
*/

var story;
  
// load the json file as an object called story
jQuery.ajax({
  async: false,
  dataType: "json",
  url: "telltale.json",
  success: function(data) {
    story = data;
  }
});
  
// when the json is finished loading, call function place content to place the text on the page
jQuery(document).ready( function() {
  placeContent();
});


/*
 placeContent places JSON text in the main div on this page.
 This code was written by Jesse Heines. 
*/
function placeContent() {
  var strContent = "";

  // create dynamic content from JSON
  strContent += "<h1 class='title'>" + story.title + "</h1>";
  strContent += "<h2 class='author'>by " + story.author + "</h2>";
  strContent += "<h3 class='date'>" + story.date + "</h3>";

  // loop through all the paragraphs and sentences adding them to the strContent string
  for (var para = 0; para < story.text.paragraphs.length; para++) {
    strContent += "<p class='text'>";
    for (var sent = 0; sent < story.text.paragraphs[para].length; sent++) {
      strContent += story.text.paragraphs[para][sent] + "&nbsp; ";
    }
    strContent += "</p>";
  }

  // place dynamic content on page
  jQuery("#main").html(strContent);
}
