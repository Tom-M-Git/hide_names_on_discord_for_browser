const cjkRegex = /^[\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]+/;
let chatNames = document.querySelectorAll('.username__0b0e7');
let audienceNames = document.querySelectorAll('.overlayTitleText_b75a8a');
let memberListNames = document.querySelectorAll('.name_c3d448');
let namesToHide = ['R A B'];
let uniqueNumbers = 0;
let firstLetter = '';
let firstTwoLetters = '';
let asterisks = '';
let verificationPattern = '';
let sourceContent = '';
let originalContent = '';
let ContainsString = '';

function verification (sourceContent){
	sourceContent = sourceContent.replace(/\s/g, '');
	verificationPattern = /^(.|..?\*+)\(\d+\)$/.test(sourceContent);
	return verificationPattern;
};
function convertToNumbers (sourceContent){
	uniqueNumbers = 0;
	for (let i = 0; i < sourceContent.length; i++) {
		uniqueNumbers += sourceContent.charCodeAt(i);
	};
};

function prepareHideNames(chatNames, audienceNames, memberListNames) {

	function hideNames(element) {
		sourceContent = element.textContent;
		originalContent = sourceContent.trim();
		ContainsString = namesToHide.some(string => originalContent.includes(string));
		


		if (ContainsString) {


			if (verification(sourceContent)) {
				console.log("Already Censored:", sourceContent);
			} else {
				convertToNumbers(sourceContent);
				console.log('originalName: ' + sourceContent + '(' + originalContent + ')');
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
};

const handleMutations2 = (records, observer) => {
	records.forEach(record => {
			console.log('mutation ocurred:', record.addedNodes);
			chatNames = document.querySelectorAll('.username__0b0e7');
			audienceNames = document.querySelectorAll('.overlayTitleText_b75a8a');
			memberListNames = document.querySelectorAll('.name_c3d448');
			prepareHideNames(chatNames, audienceNames, memberListNames);

			errorHandling(observer);
	});
};

function errorHandling (observer) {
	const quickMutationLimit = 30;
	const quickMutationInterval = 100;
	const currentTime = Date.now();
	let quickMutationStart = null;
	let quickMutationCount = 0;
	if (quickMutationStart && currentTime - quickMutationStart < quickMutationInterval) {
		quickMutationCount++;
		quickMutationStart = currentTime;
	} else {
		quickMutationCount = 0;
		quickMutationStart = null;
	};
	if (quickMutationCount >= quickMutationLimit) {
		console.error("ERROR: NAMES NOT PROPERLY PROCESSED; Too many mutations at a time.");
		observer.disconnect();
	};
};

const observer = new MutationObserver(handleMutations2);
const observerConfig = { attributes: false, subtree: true, childList: true};


prepareHideNames(chatNames, audienceNames, memberListNames);
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


*/
<div class="typing__6fd1d base__06abc stop-animation">
	<div class="typingDots__0448d">
		<svg width="24.5" height="7" class="ellipsis_bc2e27 dots_a97068 themed__4f364"><g style="opacity: 1;"><circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle><circle cx="12.25" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle><circle cx="21" cy="3.5" r="3.5" fill="currentColor" style="opacity: 1;"></circle></g>
		</svg>
		<span class="text_eb454c" aria-live="polite" aria-atomic="true">
			<strong>トナカイチーム フロイトニキ</strong>が入力中...
		</span>
	</div>
</div>

/*
uniqueNumbers474202648
originalContent要**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************470551071
R A B
*/




let uniqueNumbers = 0;
let sourceContent = 'username__0b0e7(001)';
let originalContent = '';
let firstLetter = '';
let asterisks = '';
let verificationPattern = '';

function verification(sourceContent){
	verificationPattern = /^([^\s]|[^\s][^\s]?\*+)\(\d+\)$/.test(sourceContent);
	return verificationPattern;
};
function convertToNumbers (inputContent){
	uniqueNumbers = 0;
	for (let i = 0; i < inputContent.length; i++) {
		uniqueNumbers += inputContent.charCodeAt(i);
	};
};

if (verification(sourceContent)) {
	console.log("Already Censored:", sourceContent);
} else {
	originalContent = sourceContent.trim();
	convertToNumbers(originalContent);
	firstLetter = originalContent.charAt(0);
	asterisks = '*'.repeat(originalContent.length - 1);
	sourceContent = firstLetter + asterisks + '(' + uniqueNumbers + ')';
	console.log("Newly Censored:", sourceContent);
};



console.log(sourceContent);
/* username__0b0e7(001): u*******************(1630) */
/* username__0b0e7: u**************(1404) */
/* ------------------------------------------------------------------------------------------------- */


if (verification(sourceContent)) {
	console.log("Already Censored:", sourceContent);
} else {
	console.log("Newly Censored:", sourceContent);
};







if (hasUniqueNumbers) {
	sourceContent = sourceContent;
} else {
	uniqueNumbers = 0;
	for (let i = 0; i < originalContent.length; i++) {
	uniqueNumbers += originalContent.charCodeAt(i) - 48;
  	};
	firstLetter = originalContent.charAt(0);
	asterisks = '*'.repeat(originalContent.length - 1);
	sourceContent = firstLetter + asterisks + '(' + uniqueNumbers + ')';
}




let asciicode = '*';
console.log(asciicode.charCodeAt(0));


for (let i = 0; i <= 5; i++) {
	console.log(i == 0 ? "Code run" : "Looped-----------------------------------");
	console.log("Number of times code ran:", i + 1);
	console.log("Current value of i:", i);
	console.log("Code running");
	console.log("Current value is still:", i);
}

























verificationPattern = /^([^\s]|[^\s][^\s]?\*+)\(\d+\)$/.test(sourceContent);









/* ------------------------------------------------------------------------------------------------------------------------------------------- */
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

const quickMutationLimit = 10000;
const quickMutationInterval = 30;
let quickMutationStart = null;
let quickMutationCount = 0;
function errorHandling (numberOfElements, observer) {
	if (sendTextContentToValidate.includes('*'.repeat(200))) {
		console.error("ERROR: NAMES NOT PROPERLY PROCESSED; Invalid length. May be errors in text content");
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
		console.error("ERROR: NAMES NOT PROPERLY PROCESSED; Too many quick mutations at a time.");
		observer.disconnect();
	};
	quickMutationStart = currentTime;
};

const observer = new MutationObserver(handleMutations2);
const observerConfig = { attributes: false, subtree: true, childList: true};


prepareHideNames(chatNames, audienceNames, memberListNames, replyNames, typingName);
observer.observe(document.querySelector('.base_c0676e'), observerConfig);






/* --------------------------------------------------------------------------------------------------------- */
verificationPattern = /^([^\s]|[^\s][^\s]?\*+)\(\d+\)$/.test(sourceContent);






function crashPrediction () {
	const memoryInfo = performance.memory;
	const memorySizeLimit = memoryInfo.jsHeapSizeLimit;
	const memorySizeUsed = memoryInfo.usedJSHeapSize;

	if (memorySizeUsed >= memorySizeLimit * 0.8) {
		console.error('ERROR: Too much memory use; May be issues with text content to hide; Memory Size Used/Limit: ' + memorySizeUsed + '/' + memorySizeLimit);
		observer.disconnect();
	};


};