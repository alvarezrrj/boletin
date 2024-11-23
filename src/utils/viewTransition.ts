export function viewTransition(callback: () => void) {
  if (!document.startViewTransition) {
    callback()
    return
  }

  document.startViewTransition(() => {
    callback()
  })
}
