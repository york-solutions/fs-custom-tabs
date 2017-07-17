class Base {

  dom(forceNew) {
    this._ensureDOM(forceNew);
    return this.$dom;
  }

  _ensureDOM(forceNew) {
    if(!this.$dom || forceNew) {
      this.$dom = this.render();
    }
  }

}

export default Base;