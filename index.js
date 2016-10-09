const Mousetrap = require('mousetrap');

const prevTabKey = "Ctrl+Shift+Tab";
const nextTabKey = "Ctrl+Tab";
const prevPaneKey = "CmdOrCtrl+Alt+Left";
const nextPaneKey = "CmdOrCtrl+Alt+Right";

const merge = (one, two) => Object.assign({}, one, two);
const mousetrapify = key => key.replace('CmdOrCtrl', 'mod').toLowerCase();

let focusedWindow;
const registerWindow = win => {
  win.on('focus', () => { focusedWindow = win; });
  win.on('blur', () => {
    if (focusedWindow === win) {
      focusedWindow = undefined;
    }
  });
}

const selectPane = type => {
  if (focusedWindow) {
    focusedWindow.rpc.emit(`${type} pane req`);
  }
}

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

const decorateTerms = (Terms, { React, notify, Notification }) => {
  return class extends React.Component {
    constructor(props, context) {
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

      keys.bind(
        mousetrapify(prevPaneKey),
        () => selectPane('prev')
      );
      keys.bind(
        mousetrapify(nextPaneKey),
        () => selectPane('next')
      );

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

module.exports = {
  onWindow: registerWindow,
  decorateTerms: decorateTerms,
  decorateMenu: decorateMenu,
}
