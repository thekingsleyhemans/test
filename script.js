const footer = document.querySelector("footer");
const progressInner = document.querySelector(".progress-inner");
let overScroll = 0;
let isTriggered = false;
let scrollTimeout;

function handleScroll(e) {
  const footerRect = footer.getBoundingClientRect();
  const inView = footerRect.top < window.innerHeight && footerRect.bottom > 0;

  if (!inView) {
    overScroll = 0;
    progressInner.style.transform = `scaleX(${overScroll})`;
    return;
  }

  if (e.deltaY > 0) {
    overScroll = Math.min(1, overScroll + 0.15);
  } else {
    overScroll = Math.max(0, overScroll - 0.03);
  }

  progressInner.style.transform = `scaleX(${overScroll})`;

  if (overScroll >= 1 && !isTriggered) {
    isTriggered = true;
    setTimeout(() => {
      window.location.href = "/next-page";
    }, 300);
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (inView) {
      overScroll = 0;
      progressInner.style.transform = `scaleX(${overScroll})`;
    }
  }, 200);
}

window.addEventListener("wheel", handleScroll);
