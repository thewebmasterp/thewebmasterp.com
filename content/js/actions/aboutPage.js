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
    // Overwrite .projects .card .thumbnail img "src" attribute to a better one
    // TODO: Remove this and merge it with the one in projects
    const cards = document.querySelectorAll('.projects .card:not(.others)')
    cards.forEach(card => {
      // console.log(card)
      const src = card.getElementsByClassName('title')[0].getAttribute('href')
      const img = card
        .getElementsByClassName('thumbnail')[0]
        .getElementsByTagName('img')[0]

      // Removes all event listeners
      img.replaceWith(img.cloneNode(true))

      //Defines the new event listener
      card
        .getElementsByClassName('thumbnail')[0]
        .getElementsByTagName('img')[0]
        .addEventListener('click', () => {
          window.open(src, '_self')
        })
    })
  } else if (sp.beforeunload) {
  }
}

export default aboutPage
