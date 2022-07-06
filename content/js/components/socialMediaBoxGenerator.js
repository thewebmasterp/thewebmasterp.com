const socialMediaBoxGenerator = (arr, iconsBasePath) => {
  // input format: [{label: github, href: 'https://www.github.com', icon: './icons/icon.png' }, {...}]

  const box = document.createElement('div')
  box.className = 'socMediaBox'

  arr = arr.map(entry => {
    const profile = document.createElement('a')
    profile.className = 'profile'
    profile.href = entry['HREF']

    const icon = document.createElement('i')
    icon.title = entry['LABEL']

    const request = new XMLHttpRequest()
    request.open('GET', `${iconsBasePath}/${entry['ICON']}`, false) // `false` makes the request synchronous
    request.send(null)
    if (request.status === 200) {
      icon.innerHTML = request.responseText
    } else {
      console.error(`Error ${request.status} fetching icons.`)
    }

    profile.appendChild(icon)
    return profile
  })

  box.append(...arr)
  return box
}

export default socialMediaBoxGenerator
