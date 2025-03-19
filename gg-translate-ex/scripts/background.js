// ============ Context menu ============
// === Context menu create
chrome.contextMenus.removeAll(() => {

    // 1
    chrome.contextMenus.create({
        id: "1",
        title: "gg",
        contexts: ["image"],
    });
});

chrome.contextMenus.onClicked.addListener((id, tab) => {
    // 1. Decrease counter
    if (id.menuItemId == 1) {
        let url = id.srcUrl;
        // document.querySelectorAll('[aria-label="Clear image"]');
    }
})