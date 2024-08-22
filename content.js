// content.js
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['active'], (result) => {
    if (result.active) {
      activateStyles();
    } else {
      deactivateStyles();
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
