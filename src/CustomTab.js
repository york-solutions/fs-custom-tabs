class CustomTab extends Base {

  constructor(data) {
    super();
    this.data = JSON.parse(JSON.stringify(data));
  }

  render() {
    var tab = document.createElement('div');
    tab.classList.add('available-tab');

    var icon = document.createElement('img');
    icon.src = this.data.icon;
    tab.appendChild(icon);

    var descr = document.createElement('p');
    descr.textContent = this.data.description;
    tab.appendChild(descr);

    var button = document.createElement('button');
    button.textContent = '+ Add';
    tab.appendChild(button);

    return tab;
  }

}