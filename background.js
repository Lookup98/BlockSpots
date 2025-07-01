chrome.commands.onCommand.addListener(command => {
  if (command === "open-extension") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
        chrome.windows.create({
          url: chrome.runtime.getURL("popup.html"),
          type: "popup",
          width: 400,
          height: 300
        }, () => {
          chrome.storage.local.set({ lastTabId: tab.id });
        });
      } else {
        console.warn("Invalid tab context for popup");
      }
    });
  }
});
