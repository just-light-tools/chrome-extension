let contentSelected

let getLogData = () => {
  // let url = document.location.href;
  // if (!url || !url.match(/^http/)) return;

  let data = {
    title: document.title || '',
    domain: document.domain || '',
    url: document.location.href || '',
  }
  return data
}

let saveLog = (type) =>{
  let data = getLogData()
  data.type = type
  chrome.runtime.sendMessage( data, (e)=>{
    console.log(e)
  })
}

window.onload = () => {
  saveLog('onload')
}

document.addEventListener('mousedown', e => {
  // saveLog('mousedown')
})

document.addEventListener('mouseup', (e) => {
  saveLog('mouseup')
})

document.addEventListener('onscroll', (e) => {
  saveLog('onscroll')
})




let extractTags = () => {
  let url = document.location.href;
  if (!url || !url.match(/^http/)) return;

  let data = {
    title: '',
    description: '',
    url: document.location.href,
    content: document.getSelection().toString()
  }

  let ogTitle = document.querySelector('meta[property=\'og:title\']');
  if (ogTitle) {
    data.title = ogTitle.getAttribute('content')
  } else {
    data.title = document.title
  }

  let descriptionTag = document.querySelector('meta[property=\'og:description\']') || document.querySelector('meta[name=\'description\']')
  if (descriptionTag) {
    data.description = descriptionTag.getAttribute('content')
  }

  return data
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse(extractTags());
  return true;
});
