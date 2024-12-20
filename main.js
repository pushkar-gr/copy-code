let index = null;
let firstElement = null;

function keyDown(event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'J' || event.key === 'K')) {
    event.preventDefault();
    const elements = document.querySelectorAll('.p-4');
    if (elements.length === 0) {
      return;
    }
    if (firstElement === null) {
      firstElement = elements[0];
    } else if (firstElement !== elements[0]) {
      index = null;
      firstElement = null;
      keyDown(event);
      return;
    }
    if (index == null) {
      for (let i = 0; i < elements.length; i++) {
        if (isElementInViewport(elements[i])) {
          index = i;
        }
      }
      if (index === null) {
        index = elements.length - 1;
      }
    } else {
      let element = elements[index];
      if (element && element.classList.contains('green-border-copy-code')) {
        element.classList.remove('green-border-copy-code');
      }
      if (event.key === 'K') {
        index--;
        if (index < 0) {
          index = elements.length - 1;
        }
      } else {
        index++;
        index %= elements.length;
      }
    }
    element = elements[index];
    if (element) {
      element.classList.add('green-border-copy-code');
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      element.parentElement.querySelector('.py-1').focus();
    }
  }
}

document.addEventListener('keydown', keyDown);

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

