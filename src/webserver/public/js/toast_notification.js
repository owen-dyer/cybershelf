// TODO: Style toast notifications and make them more robust
const createToastNotification = (status, content) => {
  const toastNotification = document.createElement("div");
  toastNotification.popover = "manual";
  toastNotification.classList.add("w-full", "h-full", "bg-transparent");

  const toastNotificationContent = document.createElement("div");

  if (status === "success") {
    toastNotificationContent.classList.add("bg-green-500");
  } else if (status === "error") {
    toastNotificationContent.classList.add("bg-red-500");
  }

  toastNotificationContent.classList.add("absolute", "bottom-0", "right-0");
  toastNotificationContent.textContent = content;
  toastNotification.appendChild(toastNotificationContent);

  document.body.appendChild(toastNotification);

  toastNotification.showPopover();

  // 4 second timeout before notification is automatically removed
  setTimeout(() => {
    toastNotification.hidePopover();
    toastNotification.remove();
  }, 4000);
};
