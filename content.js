(() => {
  if (window.__blocklyHighlighterLoaded__) return;
  window.__blocklyHighlighterLoaded__ = true;

  let originalFills = new Map();
  let initialized = false;

  function initOriginalStyles() {
    if (initialized) return;
    document.querySelectorAll("path.blocklyPath").forEach((path) => {
      originalFills.set(path, {
        fill: path.getAttribute("fill"),
        stroke: path.getAttribute("stroke"),
      });
    });
    initialized = true;
  }

  function refreshOriginalFills() {
    originalFills.clear();
    document.querySelectorAll("path.blocklyPath").forEach((path) => {
      originalFills.set(path, {
        fill: path.getAttribute("fill"),
        stroke: path.getAttribute("stroke"),
      });
    });
  }

  function clearHighlights() {
    document.querySelectorAll("path.blocklyPath").forEach((path) => {
      const original = originalFills.get(path);

      if (original) {
        // Restore saved color
        if (original.fill !== null) path.setAttribute("fill", original.fill);
        else path.setAttribute("fill", "#fff"); // fallback if null

        if (original.stroke !== null)
          path.setAttribute("stroke", original.stroke);
        else path.setAttribute("stroke", "#000"); // fallback if null
      } else {
        // Not tracked before, just reset yellow highlights safely
        if (path.getAttribute("fill") === "#fff176") {
          path.setAttribute("fill", "#fff"); // Blockly default fill
        }
        if (!path.hasAttribute("stroke")) {
          path.setAttribute("stroke", "#000"); // Blockly default stroke
        }
      }
    });

    return { status: "ok" };
  }

  function highlightBlocks(keyword) {
    initOriginalStyles();
    clearHighlights();

    const blocks = document.querySelectorAll("g.blocklyDraggable");
    let found = false;

    blocks.forEach((block) => {
      const combined = Array.from(block.querySelectorAll("text.blocklyText"))
        .map((t) => t.textContent)
        .join(" ");

      if (combined.toLowerCase().includes(keyword.toLowerCase())) {
        block.querySelectorAll("path.blocklyPath").forEach((path) => {
          path.setAttribute("fill", "#fff176");
        });

        const rect = block.getBoundingClientRect();
        window.scrollBy({
          top: rect.top - window.innerHeight / 2,
          behavior: "smooth",
        });

        found = true;
      }
    });

    return found
      ? { status: "ok" }
      : { status: "error", message: `No blocks found matching "${keyword}"` };
  }

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === "highlight") {
      sendResponse(highlightBlocks(req.keyword));
    } else if (req.action === "clear") {
      sendResponse(clearHighlights());
    } else {
      sendResponse({ status: "error", message: "Unknown action" });
    }
  });
})();
