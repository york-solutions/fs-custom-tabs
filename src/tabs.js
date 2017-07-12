// Poll for URL changes.
// The Family Tree uses he HTML5 History API but that API
// doesn't fire events for pushState so we can't detect all
// changes without polling.
onURLChange(areWeReady);

areWeReady();

/**
 * Decide what to do when the page loads and when the URL changes
 */
function areWeReady() {
  if(isPersonPage()) {
    console.log('on a person page');
  } else {
    console.log('not on a person page');
  }
}

/**
 * Check to see if we're on a person page
 * 
 * @returns {Boolean}
 */
function isPersonPage() {
  return window.location.pathname.indexOf('/tree/person/') === 0;
}

/**
 * Poll for URL changes.
 * 
 * @param {Function} callback Function called when a URL change is detected
 */
function onURLChange(callback) {
  
  // Cache the current value
  var path = window.location.pathname;

  // Setup the polling
  window.setInterval(function() {
    if (window.location.pathname !== path) {
      path = window.location.pathname;
      callback();
    }
  }, 500);
}