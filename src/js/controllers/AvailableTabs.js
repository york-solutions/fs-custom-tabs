// URL of where the master tabs manifest list should be fetched from
// const tabsUrl = 'https://rawgit.com/york-solutions/fs-custom-tabs/master/tabs.json';
const tabsUrl = 'https://gist.githubusercontent.com/justincy/cbfd482a75d5d8f8deb638439d06335c/raw/73a92cf458bf4ff579b3e740daa6b247caa57209/tabs.json';

// List of all available tabs (not side-loaded)
const tabs = [];

// Index to tabs keyed by tab.id
const index = [];

const loadedCallbacks = [];
let loaded = false;

// Load local cached version

// Attempt to load from remote source
// TODO: don't load remotely every time; perhaps only every hour or 30 minutes
loadRemotely();

/**
 * Load the list of available tabs from the remote master source
 */
function loadRemotely() {
  fetch(tabsUrl).then((response) => {
    if(response.ok) {
      return response.json();
    }
  }).then((remoteTabs) => {
    remoteTabs.forEach((tab) => {
      tabs.push(tab);
      index[tab.id] = tab;
    });
    doneLoading();
  });
}

/**
 * Fire all registered loaded callbacks
 */
function doneLoading() {
  loaded = true;
  loadedCallbacks.forEach((cb) => {
    cb();
  });
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