const themeChanger1 = (selector, tooltip) => {
  const constructionSites = [...document.querySelectorAll(selector)]

  const button = document.createElement('button')

  button.addEventListener('click', () => {
    //Implement the local storage and DOM toggle
    const currentTheme = document.documentElement.getAttribute(attr)
    if (currentTheme === 'light') {
      // Switch to dark
      localStorage.setItem(attr, 'dark')
      document.documentElement.setAttribute(attr, 'dark')
      window?.REMARK42?.changeTheme?.('dark')
    } else if (currentTheme === 'dark') {
      // Switch to light
      localStorage.setItem(attr, 'light')
      document.documentElement.setAttribute(attr, 'light')
      window?.REMARK42?.changeTheme?.('light')
    }

    // Add some cool styling to the button itself to indicate theme
  })

  // TODO: Shorten sunIcon/moonIcon generation
  const moonIcon = document.createElement('i')
  moonIcon.classList.add('sun-icon')
  moonIcon.innerHTML = `
<svg class="feather feather-moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`
  const sunIcon = document.createElement('i')
  sunIcon.classList.add('moon-icon')
  sunIcon.innerHTML = `
<svg class="feather feather-sun" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="5"/>
<line x1="12" x2="12" y1="1" y2="3"/>
<line x1="12" x2="12" y1="21" y2="23"/>
<line x1="4.22" x2="5.64" y1="4.22" y2="5.64"/>
<line x1="18.36" x2="19.78" y1="18.36" y2="19.78"/>
<line x1="1" x2="3" y1="12" y2="12"/>
<line x1="21" x2="23" y1="12" y2="12"/>
<line x1="4.22" x2="5.64" y1="19.78" y2="18.36"/>
<line x1="18.36" x2="19.78" y1="5.64" y2="4.22"/>
</svg>
`
  ;[moonIcon, sunIcon].forEach(icon => {
    icon.setAttribute('title', tooltip)
    icon.setAttribute('aria-hidden', true)
  })

  const btnTextEl = document.createElement('span')
  btnTextEl.classList.add('sr-only')
  btnTextEl.textContent = tooltip

  button.append(moonIcon, sunIcon, btnTextEl)
  constructionSites.forEach(el => {
    //console.log(el.parentNode.getAttribute('class'))
    if (el.parentNode.getAttribute('class') === 'sparse') {
      el.classList.add('top-level')
    }
    el.appendChild(button.cloneNode(true))
  })
}

/*
<svg class="feather feather-sun" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
*/

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

const themeChangerBtn = tooltip => {
  //const constructionSites = [...document.querySelectorAll(selector)]

  const button = document.createElement('button')

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
