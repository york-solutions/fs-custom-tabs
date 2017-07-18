const tabs = [

  {
    "id": "echo",
    "icon": "http://boulevardpr.com/echowp/wp-content/uploads/2015/08/echo_social02.jpg",
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