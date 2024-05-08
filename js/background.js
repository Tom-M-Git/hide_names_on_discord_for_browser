// Listen for tab activation changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
	// Check if the activated tab matches your target URL
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		console.log(tab.url);
	    	if (tab.url.includes("://discord.com/")) {
			// Execute content script in the active tab
			chrome.scripting.executeScript({ target: {tabId: tab.id}, files: ["content-script.js"] }).then(()=> console.log("Content script injected in the active tab.")
			);
		}
	});
});
