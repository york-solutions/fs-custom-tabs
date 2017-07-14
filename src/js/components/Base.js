class Base {

  dom() {
    if(!this.$dom) {
      this.$dom = this.render();
    }
    return this.$dom;
  }

}

export default Base;