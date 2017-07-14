export default {

  /**
   * Copy an object.
   * 
   * WARNING: only use on POJOs.
   */
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

}