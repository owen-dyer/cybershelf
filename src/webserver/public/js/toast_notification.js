// TODO: Style toast notifications and make them more robust
const createToastNotification = (status, content) => {
  const popover = document.createElement("div");
  popover.popover = "manual";
  popover.classList.add(
    "popover-open:absolute",
    "popover-open:inset-unset",
    "popover-open:bottom-0",
    "popover-open:right-0"
  );

  if (status === "success") {
    popover.classList.add("bg-green-500");
  } else if (status === "error") {
    popover.classList.add("bg-red-500");
  }

  popover.textContent = content;
  document.body.appendChild(popover);
  popover.showPopover();

  setTimeout(() => {
    popover.hidePopover();
    popover.remove();
  }, 4000);
};
