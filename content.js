// content.js - GitHub Copilot Persian RTL Extension

// Persian text detection regex (Persian/Farsi Unicode range)
const PERSIAN_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;

// Minimum percentage of Persian characters required to apply RTL
const PERSIAN_THRESHOLD = 0.3;

// Debounce timeout for performance optimization
let debounceTimeout = null;
const DEBOUNCE_DELAY = 300;

// Extension state
let isExtensionActive = true;

// Initialize extension when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeExtension);

// Also run immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

function initializeExtension() {
  // Get extension state from storage
  chrome.storage.local.get(['active'], (result) => {
    isExtensionActive = result.active !== false; // Default to true if not set
    
    if (isExtensionActive) {
      processExistingContent();
      startObserving();
    }
  });

  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.active) {
      isExtensionActive = changes.active.newValue;
      if (isExtensionActive) {
        processExistingContent();
        startObserving();
      } else {
        deactivateAllRTL();
        stopObserving();
      }
    }
  });

  // Listen for messages from popup
  window.addEventListener('message', (event) => {
    if (event.data.type === 'RTL_EXTENSION_ACTIVATE') {
      isExtensionActive = true;
      processExistingContent();
      startObserving();
    } else if (event.data.type === 'RTL_EXTENSION_DEACTIVATE') {
      isExtensionActive = false;
      deactivateAllRTL();
      stopObserving();
    }
  });
}

// MutationObserver instance
let observer = null;

function startObserving() {
  if (observer) return; // Already observing

  observer = new MutationObserver((mutations) => {
    if (!isExtensionActive) return;

    // Debounce to avoid excessive processing
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      let hasNewTextNodes = false;
      
      mutations.forEach((mutation) => {
        // Check for added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            hasNewTextNodes = true;
          }
        });
        
        // Check for modified text content
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          hasNewTextNodes = true;
        }
      });
      
      if (hasNewTextNodes) {
        processExistingContent();
      }
    }, DEBOUNCE_DELAY);
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

function stopObserving() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  clearTimeout(debounceTimeout);
}

function detectPersianText(text) {
  if (!text || text.trim().length === 0) return false;
  
  const persianMatches = text.match(PERSIAN_REGEX);
  if (!persianMatches) return false;
  
  const persianCharCount = persianMatches.length;
  const totalCharCount = text.replace(/\s/g, '').length; // Exclude whitespace
  
  if (totalCharCount === 0) return false;
  
  const persianRatio = persianCharCount / totalCharCount;
  return persianRatio >= PERSIAN_THRESHOLD;
}

function processExistingContent() {
  if (!isExtensionActive) return;

  // Target various text-containing elements commonly found in web applications
  const textSelectors = [
    'p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'textarea', 'input[type="text"]', 'input[type="search"]',
    '[contenteditable="true"]', '[contenteditable=""]',
    '.message', '.content', '.text', '.chat', '.conversation',
    '[role="textbox"]', '[aria-label*="text"]', '[aria-label*="message"]'
  ];

  textSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      processElement(element);
    });
  });
}

function processElement(element) {
  if (!isExtensionActive || !element) return;

  // Skip if already processed or marked
  if (element.hasAttribute('data-rtl-processed')) return;

  // Get text content
  let textContent = '';
  
  // For input elements, check value
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    textContent = element.value;
  } else {
    textContent = element.textContent || element.innerText || '';
  }

  // Detect Persian text and apply RTL if needed
  if (detectPersianText(textContent)) {
    applyRTL(element);
  } else {
    // Remove RTL if previously applied but no longer needed
    removeRTL(element);
  }

  // Mark as processed
  element.setAttribute('data-rtl-processed', 'true');
}

function applyRTL(element) {
  if (!element) return;
  
  element.style.direction = 'rtl';
  element.style.textAlign = 'right';
  element.setAttribute('data-rtl-applied', 'true');
  
  // For input elements, also set dir attribute
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    element.setAttribute('dir', 'rtl');
  }
}

function removeRTL(element) {
  if (!element) return;
  
  element.style.direction = '';
  element.style.textAlign = '';
  element.removeAttribute('data-rtl-applied');
  
  // For input elements, remove dir attribute
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    element.removeAttribute('dir');
  }
}

function deactivateAllRTL() {
  // Remove RTL from all elements that have it applied
  document.querySelectorAll('[data-rtl-applied="true"]').forEach(element => {
    removeRTL(element);
  });
  
  // Remove all processing markers
  document.querySelectorAll('[data-rtl-processed]').forEach(element => {
    element.removeAttribute('data-rtl-processed');
  });
}

// Listen for input events on dynamic content
document.addEventListener('input', (event) => {
  if (!isExtensionActive) return;
  
  const target = event.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
    // Remove processed marker to force reprocessing
    target.removeAttribute('data-rtl-processed');
    processElement(target);
  }
}, true);

// Listen for focus events to handle dynamic inputs
document.addEventListener('focus', (event) => {
  if (!isExtensionActive) return;
  
  const target = event.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
    processElement(target);
  }
}, true);

// Expose functions globally for background script access
window.processExistingContent = processExistingContent;
window.startObserving = startObserving;
window.stopObserving = stopObserving;
window.deactivateAllRTL = deactivateAllRTL;
window.rtlExtensionActive = isExtensionActive;
