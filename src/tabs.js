// ID of the person page we're currently looking at.
// This helps us detect when the tabs will be rendered.
// Tabs are rendered when the ID changes.
var personId = null;

// Poll for URL changes.
// The Family Tree uses he HTML5 History API but that API
// doesn't fire events for pushState so we can't detect all
// changes without polling.
onURLChange(update);

update();

/**
 * Decide what to do when the page loads and when the URL changes
 */
function update() {
  var newPersonId = getPersonPageId();

  // No longer on a person page
  if(newPersonId === null) {
    console.log('not a person page');
  }

  // Switched to a different person page
  else if(newPersonId !== personId) {
    console.log('new person page', newPersonId);
    personId = newPersonId;
    // TODO: detect when tabs are rendered
  }
}

/**
 * Get the ID of the person when on a person page.
 * Otherwise return null.
 */
function getPersonPageId() {
  if(isPersonPage()) {
    return window.location.pathname.split('/')[3];
  }
  return null;
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