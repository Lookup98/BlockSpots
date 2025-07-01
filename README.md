# BlockSpots

[![Extension Icon](icon128.png)](icon128.png)

📺 **Watch the demo video**: [https://youtu.be/9JejveXwCaY](https://youtu.be/9JejveXwCaY)

---

## Overview

**BlocklSpots** is a lightweight Chrome extension designed to help you quickly locate, highlight, and clear visual blocks by keyword in Blockly-based environments such as MIT App Inventor and Kodular Creator.It also support shortcuts Ctrl + shift + F

## Features

* 🔍 **Keyword Search**: Find blocks whose text labels include your search term.
* ✨ **Yellow Highlight**: Matching blocks are painted a distinct yellow to stand out.
* 🔄 **Clear Highlights**: Restore all blocks to their original colors with a single click.
* 🌐 **Language Support**: Switch between English, Português, and Español in the popup.
* ⚡ **Fast & Lightweight**: No performance overhead—scripts run only on demand.
* ✨ **Shortcuts Support**: Just `Ctrl + shift + F`

## Installation in Chrome

1. Download this repository:
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right.
4. Click **Load unpacked** and select the extension’s folder.
5. Pin the extension icon to your toolbar for easy access.

## Installation in Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Select the `manifest.json` file from the extension folder.
4. The **BloclSpots** icon will appear—pin it for quick access.

## Usage

1. Click the **BloclSpots** icon in your toolbar.
2. (Optional) Select your preferred language from the top-left dropdown (EN/PT/ES).
3. Enter a keyword in the input field and press **Highlight** or hit **Enter**.
4. All blocks containing that keyword will turn yellow.
5. Click **Clear** to remove highlights and restore original colors.

## Permissions

The extension requests the following permissions:

* `activeTab`: On user action, grant temporary access to the active tab to highlight blocks.
* `scripting`: Inject scripts into the page when you click **Highlight** or **Clear**.
* Host permissions (in `manifest.json`):

  * `https://ai2.appinventor.mit.edu/*`
  * `https://creator.kodular.io/*`
  * Any additional Blockly-based URLs you wish to support.From the config page.

These permissions ensure the extension only runs on specified Blockly workspaces and only when explicitly triggered by the user.

## Development

To modify or extend the extension:

1. Make your changes in the `popup.html`, `popup.js`, `content_script.js`, or `styles.css` files.
2. Increment the `version` in `manifest.json`.
3. Reload the extension on `chrome://extensions/` (or `about:debugging` for Firefox).
4. Test your changes in a Blockly workspace.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your proposed changes. Be sure to:

* Follow existing code style and formatting.
* Increment the version and update the changelog if applicable.
* Provide clear descriptions for any new features or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
