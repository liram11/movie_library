import TomSelect from 'tom-select'

const plugin_n_items = function () {
  const self = this;
  let div;

  const itemCount = function () {
    if (self.items.length == 1) {
      div.innerText = `${self.options[self.items[0]].text}`;
    } else if (self.items.length > 1) {
      div.innerText = `${self.items.length} Selected`;
    } else {
      div.innerText = self.settings.placeholder;
    }
  };

  self.on("initialize", () => {
    div = document.createElement("div");
    div.className = "ts-n-items";
    self.control.append(div);
    itemCount();
  });

  self.on("item_remove", itemCount);
  self.on("item_add", itemCount);
};

TomSelect.define("n_items", plugin_n_items);


const miltipleSelectSettings = {
  plugins: ['n_items', "clear_button", 'checkbox_options'],
  persist: true,
  hideSelected: false,
  controlInput: null,
  render: {
    item: function (data, escape) {
      return "<span></span>";
    }
  },
  onInitialize: function () {
    console.log(this.items)
    this.wrapper.classList.remove("hidden")
  }
}


document.addEventListener('turbo:load', () => {

  document.querySelectorAll('.dropdown-multi-select').forEach((el)=>{
     new TomSelect(el, miltipleSelectSettings);
  });
})

