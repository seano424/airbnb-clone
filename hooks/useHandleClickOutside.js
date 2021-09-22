function useHandleClickOutside(refTarget, searchTarget, show, event) {
  if (
    refTarget.current &&
    !refTarget.current.contains(event.target) &&
    searchTarget.current &&
    !searchTarget.current.contains(event.target)
  ) {
    show(false)
  }
}

export default useHandleClickOutside
