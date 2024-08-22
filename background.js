// background.js
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.active) {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: changes.active.newValue ? activateStyles : deactivateStyles
          });
        });
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('https://chat.mistral.ai/chat')) {
      chrome.storage.local.get(['active'], (result) => {
        if (result.active) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: activateStyles
          });
        } else {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: deactivateStyles
          });
        }
      });
    }
  });
  
  chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.local.get(['active'], (result) => {
      if (result.active) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: activateStyles
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: deactivateStyles
        });
      }
    });
  });
  

  function activateStyles() {
    document.querySelectorAll('.flex.w-full.max-w-screen-md.flex-1.flex-col.items-stretch.gap-5.pl-5.pr-4').forEach(element => {
      element.style.direction = 'rtl';
    });
    document.querySelectorAll('textarea').forEach(element => {
      element.style.direction = 'rtl';
    });
  }
  
  function deactivateStyles() {
    document.querySelectorAll('.flex.w-full.max-w-screen-md.flex-1.flex-col.items-stretch.gap-5.pl-5.pr-4').forEach(element => {
      element.style.direction = 'ltr';
    });
    document.querySelectorAll('textarea').forEach(element => {
      element.style.direction = 'ltr';
    });
  }