/*
  File: /~dmarsine/js/singlepage.js
  This file contains code to create a single page application
  Author: Dean Marsinelli
  Contact: marsinellid@gmail.com
  Created on: October 31, 2014 
*/

$(document).ready( function() {
  var cache = { };

  // if the page is loaded with no fragment identifier, set the default to #home
  if (!location.hash)
  {
    location.hash = "#home";
  }
  // call navigate immediately
  navigate();

  // bind the navigate function and fadeIn functions to the hashchange event
  $(window).bind("hashchange", navigate);
  $(window).bind("hashchange", fadeIn);

  /*
    getContent function gets the partial html content
    from the given id. it then calls the callback function
    with the data tat was retrieved
    
    credit: Curran Kelleher
  */
  function getContent(id, callback) {
    
    // check to see if the content already exists in our cache
    if (cache[id]) {
    
      // if the data does exist, call our callback function with the content data
      callback(cache[id]);
      
    } else {
      // if the data does not exist in our cache, use jquery and AJAX to retrieve the data
      $.get(id + ".html", function(content) {
        
        // when the data is retrieved, add it to the cache 
        // and call our callback function with that content
        cache[id] = content;
        callback(content);
      }); 
    }
  }

  /*
    navigate function updates the content on a page asynchronously

    credit: Curran Kelleher
  */
  function navigate() {
    // remove the # from the fragment identifier
    var id = location.hash.substr(1);

    getContent(id, function(content) {
      $("#main").html(content);
    });
  }
});