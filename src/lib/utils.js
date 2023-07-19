
export const resolveActive = (paths, currentPath) => {
  for (let i = 0; i < paths.length; i++) {
    if (paths[i] == currentPath) {
      return "active"
    }
  }

  return ""
}