// popup.js

document.getElementById('activate').addEventListener('click', () => {
    chrome.storage.local.set({ active: true }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: activateStyles
        });
      });
      chrome.action.setIcon({
        path: {
          "16": "images/icon16-active.png",
          "48": "images/icon48-active.png",
          "128": "images/icon128-active.png"
        }
      });
    });
  });
  
  document.getElementById('deactivate').addEventListener('click', () => {
    chrome.storage.local.set({ active: false }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: deactivateStyles
        });
      });
      chrome.action.setIcon({
        path: {
          "16": "images/icon16-inactive.png",
          "48": "images/icon48-inactive.png",
          "128": "images/icon128-inactive.png"
        }
      });
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
  