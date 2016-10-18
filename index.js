const Mousetrap = require('mousetrap');

const prevTabKey = "Ctrl+Shift+Tab";
const nextTabKey = "Ctrl+Tab";
const prevPaneKey = "CmdOrCtrl+Alt+Left";
const nextPaneKey = "CmdOrCtrl+Alt+Right";

const keys = obj => Object.keys(obj);
const prop = prop => obj => obj[prop];
const merge = (one, two) => Object.assign({}, one, two);
const stringify = a => JSON.stringify(a);
const log = console.log.bind(console);

const mousetrapify = key => key.replace('CmdOrCtrl', 'mod').toLowerCase();

let win;
function onRendererWindow(window) {
  console.log('onRendererWindow', window);
  win = window;
}

const perform = ({ key, event }) => {
  log({ key, event });

  win.rpc.emit(event);
    /*
  if (event === 'termgroup add req') {
  }
  if (focusedWindow) {
    focusedWindow.rpc.emit(event);
  }
  */
}

/*
const decorateMenu = menu => menu.map(menuItem => {
  if (menuItem.role !== 'window') {
    return menuItem;
  }
  const newMenuItem = Object.assign({}, menuItem);
  newMenuItem.submenu = newMenuItem.submenu.map(submenuItem => {
    const newSubmmenuItem = Object.assign({}, submenuItem);
    switch (newSubmmenuItem.label) {
      case 'Show Previous Tab':    newSubmmenuItem.accelerator = prevTabKey;  break;
      case 'Show Next Tab':        newSubmmenuItem.accelerator = nextTabKey;  break;
      case 'Select Previous Pane': newSubmmenuItem.accelerator = prevPaneKey; break;
      case 'Select Next Pane':     newSubmmenuItem.accelerator = nextPaneKey; break;
    }
    return newSubmmenuItem;
  });
  return newMenuItem;
});
*/

const decorateTerms = (Terms, { React, notify, Notification }) => {
  return class extends React.Component {
    constructor(props, context) {
      console.log('decorateTerms keymap', props.keymap);
      // console.log('decorateTerms focusedWindow', focusedWindow);
      super(props, context);
      this.handleFocusActive = this.handleFocusActive.bind(this);
      this.onTermsRef = this.onTermsRef.bind(this);
    }
    handleFocusActive() {
      const term = this.terms.getActiveTerm();
      if (term) {
        term.focus();
      }
    }
    attachKeyListeners() {
      const term = this.terms.getActiveTerm();
      if (!term) {
        return;
      }
      const document = term.getTermDocument();
      const keys = new Mousetrap(document);

      const keymap = this.props.keymap;

      console.log({keymap});
      Object.keys(keymap).map(accelerator => {
        const event = keymap[accelerator];
        const key = mousetrapify(accelerator);
        log('map keymap', { key, event });
        keys.bind(key, () => {
          // debugger;
          perform({ key, event })
        });
      })

      this.keys = keys;
    }
    onTermsRef(terms) {
      this.terms = terms;
    }
    componentDidUpdate(prev) {
      if (prev.activeSession !== this.props.activeSession) {
        if (this.keys) {
          this.keys.reset();
        }
        this.handleFocusActive();
        this.attachKeyListeners();
      }
    }
    componentWillUnmount() {
      if (this.keys) {
        this.keys.reset();
      }
    }
    render() {
      return React.createElement(Terms, merge(this.props, {
        ref: this.onTermsRef
      }));
    }
  }
}


const decorateConfig = config => {
  console.log('decorateConfig', config);
  return config;
}

module.exports = {
  onRendererWindow,
  decorateTerms,
  // decorateMenu: decorateMenu,
  // decorateConfig,
}
