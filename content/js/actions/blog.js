const blog = sp => {
  sp.log(sp.entryName)
  if (sp.DOMContentLoaded) {
    // Set the active navigation entry
    sp.setActiveNavEntr('blogLink')
  } else if (sp.load) {
  } else if (sp.unload) {
  }
}

export default blog