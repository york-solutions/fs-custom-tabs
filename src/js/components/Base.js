class Base {

  dom() {
    this._ensureDOM();
    return this.$dom;
  }

  _ensureDOM() {
    if(!this.$dom) {
      this.$dom = this.render();
    }
  }

}

export default Base;