/**
   File reader class

   @author Jonah Rubin
   03/10/2020
*/
let DataType = {
	TEXT: 1,
	BINARY: 2
};

// for text or binary files
function get(type, url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	if (type === DataType.BINARY) {
		xhr.responseType = 'blob';
	}
	xhr.onreadystatechange = function () {
		// defensive check
		if (xhr.readyState === 4) {
			if (typeof callback === "function") {
				//apply callback to response
				callback.apply(xhr);
			}
		}
	};
	xhr.send();
}

async function fetchAndDecodeFloatData(url, type) {
	let response = await fetch(url);
	let content;

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	} else {
		if(type === 'blob') {
			content = await response.blob();
		} else if(type === 'text') {
			content = await response.text();
		}
	}

	return content;

}
