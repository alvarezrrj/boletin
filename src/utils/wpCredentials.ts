export function handleWpCredentials(): string | undefined {
  const credentials = new URLSearchParams(window.location.search)
  const username = credentials.get('user_login')
  const password = credentials.get('password')?.split('#')[0]

  if (!username || !password) return

  return btoa(`${username}:${password}`)
}

export const initWpCredentials = () => {
  let basicAuth = ''

  return () => {
    if (basicAuth) return basicAuth
    const credentials = new URLSearchParams(window.location.search)
    const username = credentials.get('user_login')
    const password = credentials.get('password')

    if (!username || !password) return

    basicAuth = btoa(`${username}:${password}`)
    const origin = window.location.origin
    const path = window.location.hash
    history.pushState(null, '', origin + path)
    return basicAuth
  }
}
