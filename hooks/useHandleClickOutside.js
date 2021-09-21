function useHandleClickOutside(refTarget, searchTarget, show, event) {
  if (
    refTarget.current &&
    !refTarget.current.contains(event.target) &&
    searchTarget.current &&
    !searchTarget.current.contains(event.target)
  ) {
    show(false)
  }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true)
  //   }
  // })
}

export default useHandleClickOutside
