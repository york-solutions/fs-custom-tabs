// import ConfigTab from './components/ConfigTab.js';
import ConfigTabContent from './components/ConfigTabContent.js';
import Tab from './components/Tab.js';

import Original from './controllers/Original.js';
import Installer from './controllers/Installer.js';

// ID of the person page we're currently looking at.
// This helps us detect when the tabs will be rendered.
// Tabs are rendered when the ID changes.
let personId = null;

const configTab = createConfigTab();
const configTabContent = new ConfigTabContent();

let tabs = [configTab];

Original.onTabClick(resetCustomState);

Installer.onInstallTab(renderCustomTabs);
renderCustomTabs();

onURLChange(update);
update();

/**
 * Decide what to do when the page loads and when the URL changes
 */
function update() {

  resetCustomState();

  const newPersonId = getPersonPageId();

  // No longer on a person page
  if(newPersonId === null) {
    // TODO: Do we need to do anything here? cleanup?
  }

  // Switched to a different person page
  else if(newPersonId !== personId) {
    personId = newPersonId;
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
 * Poll for URL changes. The Family Tree uses he HTML5 History API 
 * but that API doesn't fire events for pushState so we can't detect 
 * all URL changes without polling.
 * 
 * @param {Function} callback Function called when a URL change is detected
 */
function onURLChange(callback) {
  
  // Cache the current value
  let path = window.location.pathname;

  // Setup the polling
  window.setInterval(function() {
    if (window.location.pathname !== path) {
      path = window.location.pathname;
      callback();
    }
  }, 500);
}

/**
 * Render the custom tabs
 */
function renderCustomTabs() {
  
  // Get a list of installed tabs and create DOM for them.
  tabs = Installer.getInstalledTabs()
    .map(t => createCustomTab(t));
  tabs.push(configTab);

  // Clear existing custom tabs in the DOM
  Original.clearCustomTabs();

  // Add new tabs
  tabs.forEach(t => Original.addCustomTab(t.dom()));
}

function createConfigTab() {
  const tab = new Tab('+');
  tab.onClick = showConfigTab;
  return tab;
}

function createCustomTab(t) {
  const tab = new Tab(t.title);
  tab.onClick = () => {
    Original.removeTabHighlights();
    removeCustomTabHighlights();
    tab.addHighlight();
    Original.hideContentSections();
    // TODO: show custom content section
    console.log('custom tab clicked', t.title);
  };
  return tab;
}

/**
 * Show the configuration page
 */
function showConfigTab() {
  Original.removeTabHighlights();
  removeCustomTabHighlights();
  configTab.addHighlight();
  Original.hideContentSections();
  renderConfigTabContent();
}

/**
 * Render the config tab content
 */
function renderConfigTabContent() {
  // TODO: currently this will remove and re-add the tab content to the DOM
  // each time we want to show it. Let's improve that.
  const $content = configTabContent.dom();
  document.querySelector('#ancestorPage .mainContent').appendChild($content);
  configTabContent.show();
}

/**
 * Clear highlights on custom tabs and hide custom tab content
 */
function resetCustomState() {
  removeCustomTabHighlights();
  configTabContent.hide();
}

function removeCustomTabHighlights() {
  tabs.forEach(t => t.removeHighlight());
}