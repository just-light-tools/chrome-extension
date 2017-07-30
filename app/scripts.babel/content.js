document.addEventListener('mousedown', e => {
  console.log(e)
})

let contentSelected

document.addEventListener('mouseup', (e) => {
  console.log(e)
  contentSelected = (document.selection == undefined ) ? (document.getSelection().toString() ) : document.selection.createRange().text;
  // console.log(contentSelected);
  console.log(extractTags())
});


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
