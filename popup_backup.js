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
warningForURL.id = "warningForURL";
warningForURL.innerHTML = "Only works when Discord server tab is active!";
const messageForReload = document.createElement("span");
messageForReload.className = "messageElement";
messageForReload.innerHTML = "Reload the page to fully refresh. (Previously hidden names are kept hidden until next occurrence)";
const messageForResponse = document.createElement("span");
messageForResponse.className = "messageElement";
messageForResponse.innerHTML = "Applied.";
const nameList = document.createElement("span");
nameList.className = "messageElement";
const buttonToReloadSection = document.createElement("div");
buttonToReloadSection.id = "buttonToReloadSection";
buttonToReloadSection.innerHTML = "<button type='reset' id='buttonToReload'>Reset All</button><span class='notice'>(Reloads the page.)</span>";
const reloadedMessage = document.createElement("div");
reloadedMessage.className = "messageElement";
reloadedMessage.id = "reloadedMessage";
reloadedMessage.innerHTML = "<span>Reloaded.</span>";

function addTextInput() {
	const textList = document.getElementById('textList');
	const newTextInput = document.createElement('li');
	newTextInput.innerHTML = '<input type="text" name="textItem" placeholder="Enter Name">';
	textList.appendChild(newTextInput);
}

function removeTextInput() {
	const textList = document.getElementById('textList');
	const lastTextInput = textList.lastElementChild;
	if (lastTextInput) {
		textList.removeChild(lastTextInput);
	}
}

function reloadPage () {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "reload", function(response) {
			warningElement.innerHTML = '';
			messageElement.innerHTML = '';
			messageForReload.className = "messageElement";
			if (document.getElementById("buttonToReloadSection")) {
				document.getElementById("buttonToReloadSection").outerHTML = '';
			};
			if (response) {formElement.appendChild(reloadedMessage);};
		});
	});
	const textList = document.getElementById('textList');
	const newTextInput = document.createElement('li');
	newTextInput.innerHTML = '<input type="text" name="textItem" placeholder="Enter Name">';
	textList.innerHTML = newTextInput.outerHTML;
	setTimeout(() => {
		if(document.getElementById("reloadedMessage")){document.getElementById("reloadedMessage").outerHTML = '';};
	}, 5000);
};

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
				if (response){
					nameList.innerHTML = "</br>Displayed Name: " + response.message;
					messageElement.appendChild(messageForResponse);
					messageElement.appendChild(nameList);
				};
				if (response && response.count > 1){
					messageForReload.className = "warningElement";
				};
				warningElement.appendChild(messageForReload);
				/* Adds Reload Button */
				formElement.appendChild(buttonToReloadSection);
				document.getElementById("buttonToReload").addEventListener('click', function(){
					console.log("sending reload request");
					reloadPage();
				});
			});
		});
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
				} else if (warningElement.innerHTML.includes("warningForURL")) {
					const warningToRemove = document.getElementById("warningForURL");
					warningElement.removeChild(warningToRemove);
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