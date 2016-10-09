# hyper-panes-iterm2-hotkeys

> Hyper panes navigation with iTerm2 hotkeys

## Install

Open your Hyper preferences and add `hyper-panes-iterm2-hotkeys` to plugin list:

```js
plugins: [
  'hyper-panes-iterm2-hotkeys'
],
```

## Usage

Pre-configured hotkeys are:

* prevPane: `CmdOrCtrl+Alt+Left`
* nextPane: `CmdOrCtrl+Alt+Right`

You can change it to something else, with `hotkeys` object in your config:

```js
hotkeys: {
  prevPane: "Cmd+Left",
  nextPane: "Cmd+Right"
}
```

You can find [available hotkeys to use][eldocs] from Electron docs

[eldocs]: https://github.com/electron/electron/blob/master/docs/api/accelerator.md

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)
