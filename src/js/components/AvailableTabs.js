const tabs = [

  {
    "id": "echo",
    "icon": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png",
    "title": "Echo",
    "description": "HTTP Echo, for testing because Google won't let us iframe",
    "url": "https://httpbin.org/get?pid={pid}&token={token}"
  }

];

const index = tabs.reduce((index, tabManifest) => {
  index[tabManifest.id] = tabManifest;
  return index;
}, {});

export default {

  get: function(id) {
    return index[id];
  },

  getAll: function() {
    return tabs.slice();
  }

}