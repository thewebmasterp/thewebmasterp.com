// Note: repeating function
const iconGenerator = (label, innerHTML, tooltip) => {
  const icon = document.createElement('i')
  icon.classList.add(`${label}-icon`)
  icon.setAttribute('title', tooltip)
  icon.setAttribute('aria-hidden', true)
  // You can't properly generate svg element with document.createElement. You have to use createElementNS, as follows:
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  // For more on the topic, see https://stackoverflow.com/questions/28734628/how-can-i-set-an-attribute-with-case-sensitive-name-in-a-javascript-generated-el/28734954
  svg.classList.add('feather', `feather-${label}`)
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  svg.setAttribute('stroke-width', '2')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svg.innerHTML = innerHTML
  icon.append(svg)

  return icon
}

const themeChangerBtn = (tooltip, onClick) => {
  //const constructionSites = [...document.querySelectorAll(selector)]

  const button = document.createElement('button')

  button.addEventListener('click', onClick)

  const moonInHTML =
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
  const sunInHTML =
    '<circle cx="12" cy="12" r="5"></circle><line x1="12" x2="12" y1="1" y2="3"></line><line x1="12" x2="12" y1="21" y2="23"></line><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line><line x1="1" x2="3" y1="12" y2="12"></line><line x1="21" x2="23" y1="12" y2="12"></line><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>'
  const [moonIcon, sunIcon] = [
    iconGenerator('moon', moonInHTML, tooltip),
    iconGenerator('sun', sunInHTML, tooltip),
  ]

  const btnTextEl = document.createElement('span')
  btnTextEl.classList.add('sr-only')
  btnTextEl.textContent = tooltip

  button.append(moonIcon, sunIcon, btnTextEl)

  return button
}

export default themeChangerBtn
