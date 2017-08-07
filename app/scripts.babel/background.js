'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let xhr = new XMLHttpRequest()
  xhr.open('post', 'http://127.0.0.1:8001/log')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.send(JSON.stringify(request))
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      sendResponse(JSON.parse(xhr.responseText));
    }
  }
  return true;
});