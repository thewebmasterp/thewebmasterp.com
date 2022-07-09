const blogPage = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)
  if (sp.DOMContentLoaded) {
    // Replace default section headings (arch/ js/ for example) with custom ones
    const mapTo = {
      'Desktop Setup/': {
        title: 'Optimizing your Linux desktop setup for programming',
        description:
          'Let the articles under this section be a compendium - An essence of my hard-learned lessons regarding Linux and its configuration as a maximum productivity, programming desktop OS.',
      },
      'webmaster_project/': {
        title: 'Master JavaScript',
        description:
          "Every JavaScript thing that got my interest and inspired me, I'll write a post about it and it will be listed here.",
      },
    }
    // Do it
    const entries = document.querySelectorAll('#entries > ul > li')
    entries.forEach(li => {
      const target = li.getElementsByTagName('b')[0]
      const inTarget = target.textContent
      Object.keys(mapTo).forEach(key => {
        if (inTarget === key) {
          const toReplaceTarget = document.createElement('div')
          const title = document.createElement('h3')
          title.textContent = mapTo[key].title
          const description = document.createElement('p')
          description.textContent = mapTo[key].description
          const descriptionWrapper = document.createElement('ul')
          descriptionWrapper.appendChild(description)
          toReplaceTarget.append(title, descriptionWrapper)
          target.parentNode.replaceChild(toReplaceTarget, target)
        }
      })
    })
  } else if (sp.load) {
  } else if (sp.beforeunload) {
  }
}

export default blogPage
