// URL of where the master tabs manifest list should be fetched from
const tabsUrl = 'https://rawgit.com/york-solutions/fs-custom-tabs/master/tabs.json';

// List of all available tabs (not side-loaded)
const tabs = [];

// Index to tabs keyed by tab.id
const index = {};

const loadedCallbacks = [];
let loaded = false;

// Load local cached version
loadLocal((localTabs, timestamp) => {

  // Fetch the list remotely if it's not available locally (first load of the extension)
  // or refresh if the list of tabs is more than an hour old.
  if(!localTabs || (timestamp && (timestamp + 3600000 < Date.now()))) {
    loadRemotely((remoteTabs) => {
      processTabs(remoteTabs);
      saveTabs(remoteTabs);
    });
  } 
  
  // Otherwise (list available and is fresh) then continue
  else {
    processTabs(localTabs);
  }
});

/**
 * Process the list of loaded tabs, mark as loaded, and fire loaded callbacks
 */
function processTabs(newTabs) {
  newTabs.forEach((tab) => {
    tabs.push(tab);
    index[tab.id] = tab;
  });
  loaded = true;
  loadedCallbacks.forEach((cb) => {
    cb();
  });
}

/**
 * Save the list of loaded tabs
 */
function saveTabs(tabs) {
  chrome.storage.local.set({
    available: JSON.stringify({tabs: tabs, timestamp: Date.now()})
  });
}

/**
 * Load the list of tabs from the local cache, if available
 * 
 * @param {Function} cb function(tabs, timestamp)
 */
function loadLocal(cb) {
  chrome.storage.local.get({
    available: '{}'
  }, (items) => {
    const {tabs, timestamp} = JSON.parse(items.available);
    cb(tabs, timestamp);
  });
}

/**
 * Load the list of available tabs from the remote master source
 */
function loadRemotely(cb) {
  fetch(tabsUrl).then((response) => {
    if(response.ok) {
      return response.json();
    }
  }).then(cb);
}

/**
 * Export the public API
 */
export default {

  get: function(id) {
    return index[id];
  },

  getAll: function() {
    return tabs.slice();
  },

  onLoad: function(cb) {
    if(loaded) {
      cb();
    } else {
      loadedCallbacks.push(cb);
    }
  }

};