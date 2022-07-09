const aboutPage = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)
  if (sp.DOMContentLoaded) {
    // Set the active navigation entry
    sp.setActiveNavEntr('aboutLink')

    // Give some custom structure to aboutme
    const me = document.getElementById('me')
    me.addEventListener('load', () => {
      const textAboutme = document.getElementById('text-aboutme')
      const figure = me.parentElement
      const figureHTML = figure.cloneNode(true).outerHTML
      figure.remove()
      textAboutme.innerHTML = `${figureHTML}<div>${textAboutme.innerHTML}</div>`
      document.getElementById('me').addEventListener('click', sp.openImageOn)
    })
  } else if (sp.load) {
  } else if (sp.beforeunload) {
  }
}

export default aboutPage
