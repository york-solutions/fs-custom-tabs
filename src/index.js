!function(){
  
  // ID of the person page we're currently looking at.
  // This helps us detect when the tabs will be rendered.
  // Tabs are rendered when the ID changes.
  var personId = null;

  // Track whether the custom tab has been added to the DOM
  var tabsRendered = false;

  var configTab = new ConfigTab();
  configTab.onClick = showConfigTab;

  var configTabContent = new ConfigTabContent();

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

    resetCustomState();

    var newPersonId = getPersonPageId();

    // No longer on a person page
    if(newPersonId === null) {
      // TODO: Do we need to do anything here? cleanup?
    }

    // Switched to a different person page
    else if(newPersonId !== personId) {
      personId = newPersonId;
      if(!tabsRendered) {
        onTabRender(function(){
          addCustomTabs();
          tabsRendered = true;
        });
      }
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
  function onTabRender(callback) {
    var tabs;

    // Poll for changes
    var interval = setInterval(function() {
      if(tabs = getTabList()) {
        
        // Stop polling
        clearInterval(interval);

        // Setup click listeners so that we can clear highlights
        // on custom tabs when original tabs are clicked
        for(var i = 0; i < tabs.children.length; i++) {
          tabs.children[i].addEventListener('click', function(){
            resetCustomState();
          });
        }

        // Fire the callback
        setTimeout(callback);
      }
    }, 100);
  }

  /**
   * Render the custom tabs
   */
  function addCustomTabs() {
    var tabs = getTabList();
    if(tabs) {
      tabs.appendChild(configTab.dom());
    }
  }

  /**
   * Show the configuration page
   */
  function showConfigTab() {
    configTab.addHighlight();
    removeOriginalTabHighlights();
    hideContentSections();
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
   * Remove highlights (active state) from original person tabs
   */
  function removeOriginalTabHighlights() {
    document.getElementById('PersonSummary').setAttribute('data-section-showing', '');
  }

  /**
   * Hide content sections
   */
  function hideContentSections() {
    var sections = document.querySelectorAll('#ancestorPage [class*="-content"]');
    for(var i = 0; i < sections.length; i++) {
      sections[i].classList.add('hide');
    }
  }

  /**
   * Clear highlights on custom tabs and hide custom tab content
   */
  function resetCustomState() {
    configTab.removeHighlight();
    configTabContent.hide();
  }

  /**
   * Get tab list
   * 
   * @return {NodeList}
   */
  function getTabList() {
    return document.querySelector('#PersonSummary .tab-list');
  }

}();