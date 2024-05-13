console.log("Hide Names For Discord injected");
function encapsulateAll () {
const cjkRegex = /^[\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]+/;
let chatNames = '';
let audienceNames = '';
let memberListNames = '';
let replyNames = '';
let typingName = '';
let namesToDisplay = [''];
let uniqueNumbers = 0;
let firstLetter = '';
let firstTwoLetters = '';
let asterisks = '';
let verificationPattern = '';
let sourceContent = '';
let originalContent = '';
let notContainsString = '';
let numberOfElements = 0;
let sendTextContentToValidate = '';
let executedCount = 0;

let debugMode = false;
function consoleLogFunc(...args) {if (debugMode) {console.log(args)}};

async function waitForDOM() {
	return new Promise((resolve, reject) => {
		let retries = 0;
		const maxRetries = 30; // Specify the maximum number of retries
		function checkDOMNodes(){
			if (document.querySelector('.base_c0676e')){
				chatNames = document.querySelectorAll('.username__0b0e7');
				audienceNames = document.querySelectorAll('.overlayTitleText_b75a8a');
				memberListNames = document.querySelectorAll('.name_c3d448');
				replyNames = document.querySelectorAll('.mention');
				typingName = document.querySelectorAll('.text_eb454c');
				resolve();
			} else if (retries < maxRetries) {
				retries++;
				setTimeout(checkDOMNodes, 3000);
			} else {
				reject(new Error("Elements not properly loaded."));
			};
		};
		checkDOMNodes();
	});
};







function verification (originalContent){
	verificationPattern = /^(.|..?\*+)\(\d+\)$/.test(originalContent);
	return verificationPattern;
};
function convertToNumbers (sourceContent){
	uniqueNumbers = 0;
	for (let i = 0; i < sourceContent.length; i++) {
		uniqueNumbers += sourceContent.charCodeAt(i);
	};
};

function prepareHideNames(chatNames, audienceNames, memberListNames, replyNames, typingName) {

	function hideNames(element) {
		sourceContent = element.textContent;
		originalContent = sourceContent.replace(/\s/g, '');
		notContainsString = namesToDisplay.every(string => {
			const trimmedString = string.trim();
			const trimmedOriginalContent = originalContent.replace(/\s/g, '');
			return trimmedOriginalContent !== trimmedString;
		});
		


		if (notContainsString) {


			if (verification(originalContent)) {
				consoleLogFunc("Already Censored:", sourceContent);
			} else {
				convertToNumbers(sourceContent);
				consoleLogFunc('originalName: ' + sourceContent);
				consoleLogFunc('uniqueNumbers: ' + uniqueNumbers);
				
				if (cjkRegex.test(originalContent) && originalContent.length > 1) {
					firstLetter = originalContent.charAt(0);
					asterisks = '*'.repeat(originalContent.length - 1);
					element.textContent = firstLetter + asterisks + '(' + uniqueNumbers + ')';
				} else if (originalContent.length > 2) {
					firstTwoLetters = originalContent.substring(0, 2);
					asterisks = '*'.repeat(originalContent.length - 2);
					element.textContent = firstTwoLetters + asterisks + '(' + uniqueNumbers + ')';
				} else {
					firstLetter = originalContent.charAt(0);
					asterisks = '*'.repeat(originalContent.length - 1);
					element.textContent = firstLetter + asterisks + '(' + uniqueNumbers + ')';
				};
				
				consoleLogFunc("Newly Censored:", element.textContent);
			};
		};
		sendTextContentToValidate = element.textContent;
	};

	chatNames.forEach(element => {
		hideNames(element);
	});
	audienceNames.forEach(element => {
		hideNames(element);
	});
	memberListNames.forEach(element => {
		hideNames(element);
	});
	replyNames.forEach(element => {
		hideNames(element);
	});
	typingName.forEach(element => {
		hideNames(element);
	});
};

const handleMutations2 = (records, observer) => {
	consoleLogFunc('mutation ocurred:', records);
	chatNames = document.querySelectorAll('.username__0b0e7');
	audienceNames = document.querySelectorAll('.overlayTitleText_b75a8a');
	memberListNames = document.querySelectorAll('.name_c3d448');
	replyNames = document.querySelectorAll('.mention');
	typingName = document.querySelectorAll('.text_eb454c');
	numberOfElements = chatNames.length + audienceNames.length + memberListNames.length + replyNames.length;
	prepareHideNames(chatNames, audienceNames, memberListNames, replyNames, typingName);
	errorHandling(numberOfElements, observer);
};

const errorMessageQuickMutation = "Hide Names for Discord: (ERROR) NAMES NOT PROPERLY PROCESSED; Too many quick processes at a time.";
const errorMessageLongText = "Hide Names for Discord: (ERROR) NAMES NOT PROPERLY PROCESSED; Invalid length. May be errors in text content.";
const quickMutationLimit = 10000;
const quickMutationInterval = 40;
let quickMutationStart = null;
let quickMutationCount = 0;
function errorHandling (numberOfElements, observer) {
	if (sendTextContentToValidate.includes('*'.repeat(200))) {
		console.error(errorMessageLongText);
		window.alert(errorMessageLongText + ' Invalid Name: ' + sendTextContentToValidate);
		observer.disconnect();
	};

	const currentTime = Date.now();
	if (quickMutationStart && currentTime - quickMutationStart < quickMutationInterval) {
		quickMutationCount += Math.ceil(numberOfElements / 2);
		consoleLogFunc('quickMutationCount: ' + quickMutationCount);
	} else {
		quickMutationCount = 0;
		consoleLogFunc('quickMutationCount: ' + quickMutationCount);
	};
	if (quickMutationCount >= quickMutationLimit) {
		console.error(errorMessageQuickMutation);
		window.alert(errorMessageQuickMutation);
		observer.disconnect();
	};
	quickMutationStart = currentTime;
};

const observer = new MutationObserver(handleMutations2);
const observerConfig = { attributes: false, subtree: true, childList: true};
function executeMainCode() {
	prepareHideNames(chatNames, audienceNames, memberListNames, replyNames, typingName);
	observer.observe(document.querySelector('.base_c0676e'), observerConfig);
};


async function promiseFromWaitForDOM() {
	try {
		await	waitForDOM();
		//executeMainCode();

	} catch (error) {
		console.error("ERROR", error);
	};
};

promiseFromWaitForDOM();

function executeEventListener () {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.data) {
		    // Access the data sent from the popup
		    let formData = request.data;
		    console.log(formData);
		    // Assuming 'formData' contains an array, reassign the variable
		    let receivedNames = Array.from(formData.values());
		    let newNamesToDisplay = [];
		    receivedNames.forEach((processingName) => {
			processingName = processingName.trim();
			newNamesToDisplay.push(processingName);
		    });
		    namesToDisplay = newNamesToDisplay;
		    executeMainCode();
		    executedCount++;
		    console.log("Applied Name: ", namesToDisplay); // Log the new array
		    setTimeout(function(){sendResponse({ message: namesToDisplay, count: executedCount});}, 1000);
		    return true; // Indicate that you will respond asynchronously
		};
		if (request == "reload") {
			console.log("reload request received");
			sendResponse("reloading");
			location.reload();
		};
	});
};

executeEventListener();
};
encapsulateAll();