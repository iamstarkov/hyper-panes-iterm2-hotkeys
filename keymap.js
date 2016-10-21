module.exports = {
  'CmdOrCtrl+,':       'show-settings',

  'CmdOrCtrl+N':       'new-window',
  'CmdOrCtrl+T':       'new-tab',

  // accelerator: isMac ? 'Cmd+D' : 'Ctrl+Shift+E',
  'CmdOrCtrl+D':       'split-vertical',
  // accelerator: isMac ? 'Cmd+Shift+D' : 'Ctrl+Shift+O',
  'CmdOrCtrl+Shift+D': 'split-horizontal',

  'CmdOrCtrl+W':       'close',
  'CmdOrCtrl+shift+W': 'close-window',


  'CmdOrCtrl+K':       'clear',

  'CmdOrCtrl+R':       'reload',
  'CmdOrCtrl+Shift+R': 'reload-full',

  // accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
  'Alt+Command+I':     'toggle-devtools',

  'CmdOrCtrl+0':       'zoom-reset',
  'CmdOrCtrl+plus':    'zoom-in',
  'CmdOrCtrl+-':       'zoom-out',

  'CmdOrCtrl+Shift+U': 'update-plugins',

  'CmdOrCtrl+Alt+Left':     'prev-tab',
  'CmdOrCtrl+Alt+Right':    'next-tab',
  'ctrl+shift+tab':         'prev-tab',
  'ctrl+tab':               'next-tab',

  'CmdOrCtrl+Shift+Left':   'prev-tab',
  'CmdOrCtrl+Shift+Right':  'next-tab',

  'CmdOrCtrl+Shift+[':      'prev-tab',
  'CmdOrCtrl+Shift+]':      'next-tab',

  'Ctrl+Shift+Alt+Tab': 'prev-pane',
  'Ctrl+Alt+Tab':       'next-pane',
};
