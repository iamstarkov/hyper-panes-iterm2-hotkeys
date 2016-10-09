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

module.exports = {
  onApp: onApp,
  onWindow: registerWindow,
  decorateConfig: addDefaultHotkeys
}
