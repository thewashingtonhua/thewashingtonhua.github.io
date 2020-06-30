const setScrollLock = (elem: HTMLElement | null, lock: boolean) => {
  if (!elem) {
    return false
  }

  if (lock) {
    elem.classList.add('scroll-lock')
  } else {
    elem.classList.remove('scroll-lock')
  }
}

export const lockBodyScroll = () => {
  const body = document.querySelector('body')
  setScrollLock(body, true)
}

export const unlockBodyScroll = () => {
  const body = document.querySelector('body')
  setScrollLock(body, false)
}

export const hasWindow = () => {
  return typeof window !== 'undefined'
}
