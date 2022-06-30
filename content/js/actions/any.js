import themeChangerBtn from '../components/themeChanger'

const any = sp => {
  sp.log(sp.entryName)

  // Initialize theme
  const attr = sp.config.themeAttribute
  let theme = localStorage.getItem(attr)
  if (!theme) {
    localStorage.setItem(attr, sp.config.defaultTheme)
    theme = sp.config.defaultTheme
  }
  document?.documentElement?.setAttribute?.(attr, theme)
  window?.REMARK42?.changeTheme?.(theme)
  setTimeout(() => {
    // Just to make sure
    window?.REMARK42?.changeTheme?.(theme)
  }, 1000)

  if (sp.DOMContentLoaded) {
    // Add a class of .preload to the body (and when the whole page is loaded - Remove it).
    document.body.classList.add('preload')

    // Apply the appropriate id to the current page's body
    const withIdOnly = sp.matchedRulesList.filter(entry => entry.id)
    if (!withIdOnly[0]) {
      sp.err('No matching rules for the current page!')
    }
    document.body.setAttribute('id', withIdOnly[0].id || 'undefined')

    // Every link pointing to an outside website should be opened in a new tab
    // Every link href should be formatted (I understand JS more than elisp... sry)
    const contentAnchors = document.getElementsByTagName('a')
    // NOTE: If you use any special characters like # or sth else in your filenames, list them here.
    const specChar = ['#']
    ;[...contentAnchors].forEach(a => {
      const href = a.getAttribute('href')
      if (href.startsWith('https://') || href.startsWith('http://')) {
        a.setAttribute('target', '_blank')
      } else if (
        href
          .substring(1)
          .split('')
          .some(str => specChar.includes(str)) ||
        decodeURIComponent(href.substring(1))
          .split('')
          .some(str => specChar.includes(str))
      ) {
        console.log(href)
        const newHref = encodeURIComponent(href)
        a.setAttribute('href', newHref)
      }
    })

    // Append a CSS class .clicked to a clicked anchor from #topnav
    const topNavLinks = sp.topnav.getElementsByTagName('a')
    ;[...topNavLinks].forEach(a => {
      a.addEventListener('click', e => {
        e.target.classList.add('clicked')
      })
    })

    //themeChanger('.theme-changer', 'Toggle between dark and light mode')

    // Create the theme switcher button
    /*
    const themeChangers = [...document.getElementsByClassName('theme-changer')]
    const btnText = 'Toggle between dark and light mode'

    const button = document.createElement('button')

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
      icon.setAttribute('title', btnText)
      icon.setAttribute('aria-hidden', true)
    })

    const btnTextEl = document.createElement('span')
    btnTextEl.classList.add('sr-only')
    btnTextEl.textContent = btnText

    button.append(moonIcon, sunIcon, btnTextEl)
    themeChangers.forEach(el => {
      //console.log(el.parentNode.getAttribute('class'))
      if (el.parentNode.getAttribute('class') === 'sparse') {
        el.classList.add('top-level')
      }
      el.appendChild(button.cloneNode(true))
    })

    // Change theme on button click
	*/

    const themSwrConstructionSites = [
      ...document.querySelectorAll('.theme-changer'),
    ]
    themSwrConstructionSites.forEach(site => {
      const btn = themeChangerBtn('Toggle between dark and light mode')
      if (site.parentNode.getAttribute('class') === 'sparse') {
        site.classList.add('top-level')
      }
      site.append(btn)
    })
    ;[...document.querySelectorAll('.theme-changer > button')].forEach(btn => {
      btn.addEventListener('click', () => {
        //Implement the local storage and DOM toggle
        sp.log('.theme-changer button clicked')
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
    })

    // Every image in #content, on click should be opened in a new tab.
    const imgs = sp.content?.getElementsByTagName('img')
    ;[...imgs].forEach(img => {
      img.addEventListener('click', sp.openImageOn)
    })
  } else if (sp.load) {
    // Remove the class of .preload of the body when the whole page's loaded.
    document.body.classList.remove('preload')

    // Remove the colon at the end of code line number
    ;[...document.getElementsByClassName('linenr')].forEach(line => {
      console.log('ha', line)
      line.innerHTML = line.innerHTML.slice(0, -2).concat(' ')
    })

    //Make the footer
  } else if (sp.unload) {
  }
}

export default any
