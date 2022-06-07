export const triggerWindowResizeEvent = () =>
  window.dispatchEvent(new Event('resize'));
