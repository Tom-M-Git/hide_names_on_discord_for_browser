// Popup JavaScript code here
console.log('Popup script loaded.');
const addButton = document.getElementById('addInput');
const removeButton = document.getElementById('removeInput');
const submitButton = document.getElementById('submitInputs');
const formElement = document.getElementById('textForm');
const warningElement = document.getElementById('warningSection');
const messageElement = document.getElementById('messageSection');
const warningForURL = document.createElement("span");
warningForURL.className = "warningElement";
warningForURL.innerHTML = "Only works when Discord server tab is active!";
const messageForReload = document.createElement("span");
messageForReload.className = "messageElement";
messageForReload.innerHTML = "Reload the page to fully refresh.";
const messageForResponse = document.createElement("span");
messageForResponse.className = "messageElement";
messageForResponse.innerHTML = "Applied.";
const nameList = document.createElement("span");
nameList.className = "messageElement";

function addTextInput() {
	const textList = document.getElementById('textList');
	const newTextInput = document.createElement('li');
	newTextInput.innerHTML = '<input type="text" name="textItem" placeholder="Enter text">';
	textList.appendChild(newTextInput);
}

function removeTextInput() {
	const textList = document.getElementById('textList');
	const lastTextInput = textList.lastElementChild;
	if (lastTextInput) {
		textList.removeChild(lastTextInput);
	}
}

addButton.addEventListener('click', function() {
	// Handle add input logic here
	addTextInput();
	console.log('Add input button clicked');
});
removeButton.addEventListener('click', function() {
	// Handle remove input logic here
	removeTextInput();
	console.log('Remove input button clicked');
});
function executeEventListener() {
	document.getElementById('textForm').addEventListener('submit', function(event) {
		event.preventDefault();
		const formData = new FormData(this);
		const textItems = [];
		for (const value of formData.values()) {
			textItems.push(value);
		}
		const textItemsFiltered = textItems.filter(value => value !== "");
		console.log('Submitted Text Items:', textItemsFiltered);
		// Add your code to handle the submitted text items here
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { data: textItemsFiltered }, function(response) {
				console.log('Message sent. Response: ', response);
				nameList.innerHTML = "</br>Displayed Name: " + response.message;
				messageElement.appendChild(messageForResponse);
				messageElement.appendChild(nameList);
			});
		})
	});
	formElement.addEventListener('click', function(event) {
		const clickedElement = event.target;
	  
		// Check if the clicked element is a child or grandchild of the <ul>
		if (formElement.contains(clickedElement)) {
		    // Your code here to handle the click event on the child/grandchild element
		    console.log('Clicked on a child/grandchild element of the <ul>');
		}
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			const activeTab = tabs[0];
			if (activeTab) {
				const tabUrl = activeTab.url;
				console.log('Current Tab URL:', tabUrl);
				if (!tabUrl.includes("://discord.com/")) {
					warningElement.appendChild(warningForURL);
				} else {
					warningElement.innerHTML = '';
				};
			} else {
				console.error('Error: No active tab found.');
			};
		});
	});
};
executeEventListener();
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.active && changeInfo.url) {
	    	// The URL of the active tab has changed
	    	console.log('URL changed:', changeInfo.url);
	    	if (changeInfo.url.includes("://discord.com/")) {
			executeEventListener();
	    	};
	    	// Add your code here to handle the URL change
	}
});