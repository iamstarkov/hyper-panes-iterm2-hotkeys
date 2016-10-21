const isMac = process.platform === 'darwin';

module.exports = {
  'CmdOrCtrl+,':       'show-settings',

  'CmdOrCtrl+N':       'new-window',
  'CmdOrCtrl+T':       'new-tab',

  [isMac ? 'CmdOrCtrl+D': 'Ctrl+Shift+E']:        'split-vertical',
  [isMac ? 'CmdOrCtrl+Shift+D' : 'Ctrl+Shift+O']: 'split-horizontal',

  'CmdOrCtrl+W':       'close',
  'CmdOrCtrl+shift+W': 'close-window',


  'CmdOrCtrl+K':       'clear',

  'CmdOrCtrl+R':       'reload',
  'CmdOrCtrl+Shift+R': 'reload-full',

  [isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I']: 'toggle-devtools',

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
