export function detectMobileDevice() {
  return (
    (window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches) ||
    'ontouchstart' in window
  )
}
