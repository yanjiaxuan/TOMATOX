export const convertBytes = (bytes: number): string => {
  if (bytes > 1024 * 1024) {
    return `${Math.floor(bytes / 1024 / 1024)}MB`
  }
  if (bytes > 1024) {
    return `${Math.floor(bytes / 1024)}KB`
  }
  return `${Math.floor(bytes)}B`
}
