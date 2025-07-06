// popup.js - GitHub Copilot Persian RTL Extension

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  // Get current state and update UI
  chrome.storage.local.get(['active'], (result) => {
    const isActive = result.active !== false; // Default to true
    updateButtonStates(isActive);
  });
});

document.getElementById('activate').addEventListener('click', () => {
  chrome.storage.local.set({ active: true }, () => {
    // Update button states
    updateButtonStates(true);
    
    // Update icon
    chrome.action.setIcon({
      path: {
        "16": "images/icon16-active.png",
        "48": "images/icon48-active.png",
        "128": "images/icon128-active.png"
      }
    });

    // Apply to current tab if it's a GitHub Copilot page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('github.com/copilot')) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: activateRTLDetection
        }).catch(() => {
          // Ignore errors (tab might not be ready)
        });
      }
    });
  });
});

document.getElementById('deactivate').addEventListener('click', () => {
  chrome.storage.local.set({ active: false }, () => {
    // Update button states
    updateButtonStates(false);
    
    // Update icon
    chrome.action.setIcon({
      path: {
        "16": "images/icon16-inactive.png",
        "48": "images/icon48-inactive.png",
        "128": "images/icon128-inactive.png"
      }
    });

    // Deactivate in current tab if it's a GitHub Copilot page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('github.com/copilot')) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: deactivateRTLDetection
        }).catch(() => {
          // Ignore errors (tab might not be ready)
        });
      }
    });
  });
});

function updateButtonStates(isActive) {
  const activateBtn = document.getElementById('activate');
  const deactivateBtn = document.getElementById('deactivate');
  
  if (isActive) {
    activateBtn.style.opacity = '0.6';
    activateBtn.disabled = true;
    deactivateBtn.style.opacity = '1';
    deactivateBtn.disabled = false;
  } else {
    activateBtn.style.opacity = '1';
    activateBtn.disabled = false;
    deactivateBtn.style.opacity = '0.6';
    deactivateBtn.disabled = true;
  }
}

// Functions to be injected into content script context
function activateRTLDetection() {
  // Signal content script to activate
  window.postMessage({ type: 'RTL_EXTENSION_ACTIVATE' }, '*');
}

function deactivateRTLDetection() {
  // Signal content script to deactivate
  window.postMessage({ type: 'RTL_EXTENSION_DEACTIVATE' }, '*');
}
  