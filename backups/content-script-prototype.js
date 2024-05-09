const cjkRegex = /^[\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]+/;
let chatNames = document.querySelectorAll('.username__0b0e7');
let audienceNames = document.querySelectorAll('.overlayTitleText_b75a8a');
let memberListNames = document.querySelectorAll('.name_c3d448');
let replyNames = document.querySelectorAll('.mention');
let typingName = document.querySelectorAll('.text_eb454c');
let namesToDisplay = ['Tom-M'];
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
		notContainsString = namesToDisplay.every(string => !originalContent.includes(string));
		


		if (notContainsString) {


			if (verification(originalContent)) {
				console.log("Already Censored:", sourceContent);
			} else {
				convertToNumbers(sourceContent);
				console.log('originalName: ' + sourceContent);
				console.log('uniqueNumbers: ' + uniqueNumbers);
				
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
				
				console.log("Newly Censored:", element.textContent);
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
	console.log('mutation ocurred:', records);
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
		console.log('quickMutationCount: ' + quickMutationCount);
	} else {
		quickMutationCount = 0;
		console.log('quickMutationCount: ' + quickMutationCount);
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


prepareHideNames(chatNames, audienceNames, memberListNames, replyNames, typingName);
observer.observe(document.querySelector('.base_c0676e'), observerConfig);















/* Unused
const handleMutations1 = records => {
	records.forEach(record => {
		if (record.length > 0) {
			console.log('mutation occurred:', record.addedNodes);
			prepareHideNames(chatNames);
		}
	});
};




base_c0676e
mention wrapper__53064
text_eb454c
typing__6fd1d
*/

/*
uniqueNumbers474202648
originalContent要**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************470551071
R A B
*/


/*let typingName = document.querySelectorAll('.text_eb454c');*/