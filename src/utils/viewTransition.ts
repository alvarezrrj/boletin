export function viewTransition(callback: () => void) {
  if (!('startViewTransition' in document)) {
    callback()
    return
  }

  // @ts-ignore
  document.startViewTransition(() => {
    callback()
  })
}
