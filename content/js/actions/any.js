import themeChangerBtn from '../components/themeChanger'
import footerGenerator from '../components/footerGenerator'
import socialMediaBoxGenerator from '../components/socialMediaBoxGenerator'

import xml2json from '../scripts/xml2json'

const any = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)

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
    document.body.setAttribute('id', withIdOnly[0]?.id || 'undefined')

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

    // Theme changer controls
    const themSwrConstructionSites = [
      ...document.querySelectorAll('.theme-changer'),
    ]
    themSwrConstructionSites.forEach(site => {
      const btn = themeChangerBtn('Toggle between dark and light mode', () => {
        //btn onclick callback
        const attr = sp.config.themeAttribute
        const currThemeFromAttr = document.documentElement.getAttribute(attr)
        const currThemeFromLStorage = localStorage.getItem(attr)
        if (currThemeFromAttr !== currThemeFromLStorage)
          console.warn('Theme attribute - Local storage dismatch!')
        const currentTheme = currThemeFromAttr
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
        if (site.parentNode.getAttribute('class') === 'sparse') {
          site.classList.add('top-level')
        }
      })
      if (site.parentNode.getAttribute('class') === 'sparse') {
        site.classList.add('top-level')
      }
      site.append(btn)
    })

    /*
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
    })*/

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
      line.innerHTML = line.innerHTML.slice(0, -2).concat(' ')
    })

    //Make the footer
    const footer = footerGenerator(
      document.getElementById('postamble').getElementsByTagName('xml')[0]
    )
    //postamble.innerHTML += footer.outerHTML
    postamble.appendChild(footer)

    // Process .socMediaBox
    const socMediaBoxes = document.getElementsByClassName('socMediaBox')
    ;[...socMediaBoxes].forEach(socMediaBox => {
      const xml = socMediaBox.getElementsByTagName('xml')[0]
      if (xml) {
        const json = xml2json(xml)
        socMediaBox.innerHTML = socialMediaBoxGenerator(
          json['SOCMEDIA']['ENTRY'],
          sp.config.iconsBasePath
        ).outerHTML
      } else {
        console.error('missing xml in .socMediaBox!')
      }
    })
  } else if (sp.beforeunload) {
  }
}

export default any
