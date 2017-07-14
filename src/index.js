!function(){
  
  // ID of the person page we're currently looking at.
  // This helps us detect when the tabs will be rendered.
  // Tabs are rendered when the ID changes.
  var personId = null;

  var configTab = new ConfigTab();
  configTab.onClick = showConfigTab;

  var configTabContent = new ConfigTabContent();

  var original = new OriginalController();
  original.addCustomTab(configTab.dom());
  original.onTabClick(resetCustomState);

  onURLChange(update);

  update();

  /**
   * Decide what to do when the page loads and when the URL changes
   */
  function update() {

    resetCustomState();

    var newPersonId = getPersonPageId();

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
   * Show the configuration page
   */
  function showConfigTab() {
    configTab.addHighlight();
    original.removeTabHighlights();
    original.hideContentSections();
    renderConfigTabContent();
  }

  /**
   * Render the config tab content
   */
  function renderConfigTabContent() {
    // TODO: currently this will remove and re-add the tab content to the DOM
    // each time we want to show it. Let's improve that.
    var $content = configTabContent.dom();
    document.querySelector('#ancestorPage .mainContent').appendChild($content);
    configTabContent.show();
  }

  /**
   * Clear highlights on custom tabs and hide custom tab content
   */
  function resetCustomState() {
    configTab.removeHighlight();
    configTabContent.hide();
  }

}();