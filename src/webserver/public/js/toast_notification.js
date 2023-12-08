// TODO: Style toast notifications and make them more robust
const createToastNotification = (status, content) => {
  const popover = document.createElement("div");
  popover.popover = "manual";
  popover.classList.add(
    "popover-open:bg-gray-100",
    "popover-open:absolute",
    "popover-open:inset-unset",
    "popover-open:top-5",
    "popover-open:left-5",
    "popover-open:rounded-md",
    "popover-open:px-8",
    "popover-open:py-4",
    "popover-open:flex",
    "popover-open:items-center",
    "popover-open:justify-center",
    `popover-open:${status ? "text-blue-600" : "text-red-500"}`
  );

  popover.textContent = content;
  document.body.appendChild(popover);
  popover.showPopover();

  setTimeout(() => {
    popover.hidePopover();
    popover.remove();
  }, 4000);
};
