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
    // TODO: Do we need to do anything here? cleanup?
  }

  // Switched to a different person page
  else if(newPersonId !== personId) {
    personId = newPersonId;
    onTabChange(addCustomTabs);
  }

  // Navigated to different tab of the same person
  else {
    // TODO: might need to update highlighted state of custom tabs
  }
}

/**
 * Get the ID of the person when on a person page.
 * Otherwise return null.
 * 
 * @return {String|null}
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

/**
 * Detect when tabs are rendered on a person page.
 * 
 * @param {Function} callback Function called when the tabs have been rendered
 */
function onTabChange(callback) {
  // Poll for changes
  var interval = setInterval(function(){
    if(getTabList()){
      clearInterval(interval);
      setTimeout(callback);
    }
  }, 100);
}

/**
 * Render the custom tabs
 */
function addCustomTabs() {
  var configTab = generateConfigTab();
  var tabs = getTabList();
  if(tabs) {
    tabs.appendChild(configTab);
  }
}

/**
 * Create the + config tab element
 * 
 * @return {Element}
 */
function generateConfigTab() {
  var configLink = document.createElement('a');
  configLink.classList.add('tab-link');
  configLink.textContent = '+';
  configLink.href = 'javascript:void(0);';
  configLink.addEventListener('click', renderConfigTabContent);

  var configTab = document.createElement('li');
  configTab.classList.add('tab');
  configTab.appendChild(configLink);
  configTab.id = 'custom-config-tab';

  return configTab;
}

/**
 * Render the config tab content
 */
function renderConfigTabContent() {
  removeOriginalTabHighlights();
  highlightCustomConfigTab();

  // TODO: render tab
}

/**
 * 
 */
function removeOriginalTabHighlights() {
  document.getElementById('PersonSummary').setAttribute('data-section-showing', '');
}

function highlightCustomConfigTab() {
  document.getElementById('custom-config-tab').classList.add('tab-highlight');
}

/**
 * Get tab list
 * 
 * @return {NodeList}
 */
function getTabList() {
  return document.querySelector('#PersonSummary .tab-list');
}