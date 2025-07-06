// background.js - GitHub Copilot Persian RTL Extension

// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  // Set default state to active
  chrome.storage.local.set({ active: true });
  
  // Set initial icon
  chrome.action.setIcon({
    path: {
      "16": "images/icon16-active.png",
      "48": "images/icon48-active.png",
      "128": "images/icon128-active.png"
    }
  });
});

// Listen for storage changes and update all GitHub Copilot tabs
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.active) {
    const isActive = changes.active.newValue;
    
    // Update icon based on state
    chrome.action.setIcon({
      path: {
        "16": `images/icon16-${isActive ? 'active' : 'inactive'}.png`,
        "48": `images/icon48-${isActive ? 'active' : 'inactive'}.png`,
        "128": `images/icon128-${isActive ? 'active' : 'inactive'}.png`
      }
    });

    // Apply changes to all GitHub Copilot tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url && tab.url.includes('github.com/copilot')) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: isActive ? activateRTLDetection : deactivateRTLDetection
          }).catch(() => {
            // Ignore errors (tab might not be ready or accessible)
          });
        }
      });
    });
  }
});

// Listen for tab updates to apply extension to newly loaded GitHub Copilot pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && 
      tab.url && 
      tab.url.includes('github.com/copilot')) {
    
    chrome.storage.local.get(['active'], (result) => {
      const isActive = result.active !== false; // Default to true
      
      if (isActive) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: activateRTLDetection
        }).catch(() => {
          // Ignore errors (tab might not be ready or accessible)
        });
      }
    });
  }
});

// Listen for new tabs
chrome.tabs.onCreated.addListener((tab) => {
  // We'll handle this in onUpdated when the tab actually loads content
});

// Functions to be injected into the content script context
function activateRTLDetection() {
  // This function will be executed in the content script context
  if (typeof window.rtlExtensionActive !== 'undefined') {
    window.rtlExtensionActive = true;
    
    // Trigger reprocessing if the extension functions exist
    if (typeof window.processExistingContent === 'function') {
      window.processExistingContent();
    }
    if (typeof window.startObserving === 'function') {
      window.startObserving();
    }
  }
}

function deactivateRTLDetection() {
  // This function will be executed in the content script context
  if (typeof window.rtlExtensionActive !== 'undefined') {
    window.rtlExtensionActive = false;
    
    // Trigger deactivation if the extension functions exist
    if (typeof window.deactivateAllRTL === 'function') {
      window.deactivateAllRTL();
    }
    if (typeof window.stopObserving === 'function') {
      window.stopObserving();
    }
  }
}