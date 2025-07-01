chrome.storage.local.get("lastTabId", ({ lastTabId }) => {
  if (!lastTabId) {
    alert("Target tab not found. Please activate the Kodular tab first.");
    return;
  }

  // Replace all injectAndSendMessage() logic inside here
  const keywordInput = document.getElementById("keyword");
  const highlightBtn = document.getElementById("highlightBtn");
  const clearBtn = document.getElementById("clearBtn");
  const closeBtn = document.getElementById("closeBtn");

  window.onload = () => {
    keywordInput.focus();
  };

  window.onunload = () => {
    chrome.storage.local.get("lastTabId", ({ lastTabId }) => {
      if (lastTabId) {
        chrome.tabs.sendMessage(lastTabId, { action: "clear" });
      }
    });
  };

  let injected = false;

  function injectAndSendMessage(action, payload = {}) {
    if (!injected) {
      chrome.scripting.executeScript(
        {
          target: { tabId: lastTabId },
          files: ["content.js"],
        },
        () => {
          if (chrome.runtime.lastError) {
            alert(`Injection Error: ${chrome.runtime.lastError.message}`);
          } else {
            injected = true;
            sendMessage(action, payload);
          }
        }
      );
    } else {
      sendMessage(action, payload);
    }
  }

  function sendMessage(action, payload = {}) {
    chrome.tabs.sendMessage(lastTabId, { action, ...payload }, (response) => {
      if (chrome.runtime.lastError) {
        alert(`Message Error: ${chrome.runtime.lastError.message}`);
      } else if (response?.status === "error") {
        alert(`Error: ${response.message}`);
      }
    });
  }

  highlightBtn.addEventListener("click", () => {
    const keyword = keywordInput.value.trim();
    if (keyword) injectAndSendMessage("highlight", { keyword });
  });

  clearBtn.addEventListener("click", () => {
    injectAndSendMessage("clear");
    keywordInput.value = "";
  });

  keywordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      highlightBtn.click();
    }
  });

  closeBtn.addEventListener("click", () => window.close());
});
