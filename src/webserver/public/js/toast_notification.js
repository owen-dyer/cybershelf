const createToastNotification = (status, content) => {
  const popover = document.createElement("div");
  popover.popover = "manual";
  console.log(status);

  popover.classList.add(
    "toast",
    "newest",
    "popover-open:bg-gray-100",
    "popover-open:fixed",
    "popover-open:inset-unset",
    "popover-open:top-5",
    "popover-open:left-5",
    "popover-open:rounded-md",
    "popover-open:px-8",
    "popover-open:py-4",
    "popover-open:flex",
    "popover-open:items-center",
    "popover-open:justify-center",
    // FIXME: This was working previously but now doesn't update the text color
    `popover-open:${status ? "text-blue-600" : "text-red-500"}`
  );
  // In place of the above FIXME
  if (status) {
    popover.classList.add("text-blue-600");
  } else {
    popover.classList.add("text-red-500");
  }

  popover.textContent = content;
  document.body.appendChild(popover);
  popover.showPopover();

  $(popover).on("toggle", (e) => {
    if (e.originalEvent.newState === "open") {
      stackToasts();
    }
  });

  setTimeout(() => {
    popover.hidePopover();
    popover.remove();
  }, 4000);
};

const stackToasts = () => {
  // Credit: https://www.mail-archive.com/discuss@jquery.com/msg04261.html
  $.fn.reverse = [].reverse;
  const toasts = $(".toast").reverse();
  toasts.each((idx, toast) => {
    const toastElement = $(toast);
    if (toastElement.hasClass("newest")) {
      toastElement.removeClass("newest");
    } else {
      const height = toastElement.outerHeight();
      const scrollOffset = window.scrollY;

      // +20 to account for top-5 and +scroll offset to account for scrolling on the page
      // ideally these values wouldn't be hardcoded
      const newOffset = idx * (20 + height) + scrollOffset + 20;

      toastElement.offset({
        top: newOffset,
        left: 20,
      });
    }
  });
};
