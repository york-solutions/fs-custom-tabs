/**
 * This class handles access and modifying any of the original controls and content on the page.
 */

class OriginalController {

  constructor() {
    this._tabsRendered = false;
    this._tabsList = null;
    this._whenRenderedCallbacks = [];
    this._onTabClickCallbacks = [];
    this._customTabs = new Set();

    this.whenTabsRender(function(){
      this._setupClickListeners();
    }.bind(this));

    this._pollForTabs();
  }

  areTabsRendered() {
    return this._tabsRendered;
  }

  whenTabsRender(callback) {
    if(this.areTabsRendered()) {
      setTimeout(callback);
    } else {
      this._whenRenderedCallbacks.push(callback);
    }
  }

  onTabClick(callback) {
    this._onTabClickCallbacks.push(callback);
  }

  addCustomTab($tab) {
    this.whenTabsRender(function(){
      this._customTabs.add($tab);
      this._tabsList.appendChild($tab);
    }.bind(this));
  }

  clearCustomTabs() {
    for(let $tab of this._customTabs) {
      this._tabsList.removeChild($tab);
    }
    this._customTabs.clear();
  }

  addContentSection($content, $existing) {
    const main = document.querySelector('#ancestorPage .mainContent');
    if($existing) {
      main.removeChild($existing);
    }
    main.appendChild($content);
  }

  removeTabHighlights() {
    document.getElementById('PersonSummary').setAttribute('data-section-showing', '');
  }

  hideContentSections() {
    const sections = document.querySelectorAll('#ancestorPage [class*="-content"]:not([class~="custom-content"])');
    for(var i = 0; i < sections.length; i++) {
      sections[i].classList.add('hide');
    }
  }

  _pollForTabs() {

    // Start polling
    const interval = setInterval(function() {
      if(this._tabsList = this._getTabsList()) {
        
        // Stop polling
        clearInterval(interval);
        this._tabsRendered = true;

        // Fire callbacks
        this._whenRenderedCallbacks.forEach(function(cb) {
          cb();
        });

        // Empty callbacks list
        this._whenRenderedCallbacks = [];
      }
    }.bind(this), 1000);
  }

  _getTabsList() {
    return document.querySelector('#PersonSummary .tab-list');
  }

  _onTabClick() {
    for(var i = 0; i < this._onTabClickCallbacks.length; i++) {
      this._onTabClickCallbacks[i]();
    }
  }

  _setupClickListeners() {
    for(var i = 0; i < this._tabsList.children.length; i++) {
      this._tabsList.children[i].addEventListener('click', function(){
        this._onTabClick();
      }.bind(this));
    }
  }

}

// Singleton!
export default new OriginalController();