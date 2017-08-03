const tabs = [

  {
    "id": "dna",
    "icon": "https://cdn4.iconfinder.com/data/icons/medicons-2/512/dna_helix-128.png",
    "title": "DNA",
    "description": "View DNA test results and discover DNA cousins.",
    "company": "DNA Company",
    "phone": "800-555-1212",
    "email": "info@dnacompany.com",
    "url": "https://misbach.github.io/tabs/dna/index.html?pid={pid}&token={token}"
  },
  {
    "id": "echo",
    "icon": "https://boulevardpr.com/echowp/wp-content/uploads/2015/08/echo_social02.jpg",
    "title": "Echo",
    "description": "HTTP Echo, for testing because Google won't let us iframe",
    "url": "https://httpbin.org/get?pid={pid}&token={token}",
    "company": "ACME",
    "phone": "888-123-4567",
    "email": "dev@acme.com"
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