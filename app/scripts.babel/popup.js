let currentData = ''
let template = (data) => {
  const json = JSON.stringify(data);
  return (`
  <div class="content-save">
    <hr>
    <h4 class="title"><a href="${data.url}" target="_blank" class="url">${data.title}</a></h4>
    <hr>
    <p class="description"><small>${data.description}</small></p>
    <blockquote class="selection">${data.content}</blockquote>
  </div>
  `);
}

let render = (msg) => {
  let displayContainer = document.getElementById('display-container');
  if (!msg) {
    displayContainer.innerHTML = 'error'
    return
  }
  displayContainer.innerHTML = template(msg);
}

let showMsg = (msg) => {
  let displayContainer = document.getElementById('display-container');
  if (!msg) {
    displayContainer.innerHTML = '😄🍎'
    return
  }
  displayContainer.innerHTML = `<p>${msg}</p>`;
}

function sendMessage(action = 'selection') {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: action
    }, res => {
      render(res)
      currentData = res
    })
  })
}

chrome.browserAction.onClicked.addListener(sendMessage());

document.getElementById('saveSelection').onclick = () => {

  let xhr = new XMLHttpRequest()
  xhr.open('post', 'http://127.0.0.1:8001/note')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.send(JSON.stringify(currentData))
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      showMsg();
    }
  }
}
