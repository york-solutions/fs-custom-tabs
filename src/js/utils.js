export default {

  /**
   * Copy an object.
   * 
   * WARNING: only use on POJOs.
   */
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Calculate the position of an element on the page
   * https://stackoverflow.com/a/28222246
   * 
   * @param {Element} el
   * @return {{left: Integer, top: Integer}}
   */
  elementPosition: function(el) {
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      top: el.top + window.scrollY,
      height: el.height,
      width: el.width
    };
  }

}