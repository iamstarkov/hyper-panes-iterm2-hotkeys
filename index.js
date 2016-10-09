const registerShortcut = require('hyperterm-register-shortcut');

let focusedWindow;
const registerWindow = win => {
  win.on('focus', () => { focusedWindow = win; });
  win.on('blur', () => {
    if (focusedWindow === win) {
      focusedWindow = undefined;
    }
  });
}

const onPane = type => () => {
  if (focusedWindow) {
    focusedWindow.rpc.emit(`${type} pane req`);
  }
}

const onApp = app => {
  registerShortcut('prevPane', onPane('prev'))(app);
  registerShortcut('nextPane', onPane('next'))(app);
}

const merge = (one, two) => Object.assign({}, one, two);

const addDefaultHotkeys = config => merge(config, {
  hotkeys: merge(config.hotkeys, {
    prevPane: "CmdOrCtrl+Alt+Left",
    nextPane: "CmdOrCtrl+Alt+Right"
  })
});

const decorateMenu = menu => menu.map(menuItem => {
  if (menuItem.role !== 'window') {
    return menuItem;
  }
  const newMenuItem = Object.assign({}, menuItem);
  newMenuItem.submenu = newMenuItem.submenu.map(submenuItem => {
    const newSubmmenuItem = Object.assign({}, submenuItem);
    if (newSubmmenuItem.label === 'Show Previous Tab') {
      newSubmmenuItem.accelerator = 'Ctrl+Shift+Tab';
    }
    if (newSubmmenuItem.label === 'Show Next Tab') {
      newSubmmenuItem.accelerator = 'Ctrl+Tab';
    }
    if (newSubmmenuItem.label === 'Select Previous Pane') {
      newSubmmenuItem.accelerator = 'CmdOrCtrl+Alt+Left';
    }
    if (newSubmmenuItem.label === 'Select Next Pane') {
      newSubmmenuItem.accelerator = 'CmdOrCtrl+Alt+Right';
    }
    return newSubmmenuItem;
  });
  return newMenuItem;
});

module.exports = {
  onApp: onApp,
  onWindow: registerWindow,
  decorateConfig: addDefaultHotkeys,
  decorateMenu: decorateMenu,
}
