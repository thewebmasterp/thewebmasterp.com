const CONFIG = {
  defaultTheme: 'dark',
  themeAttribute: 'data-theme',
}

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

    // Create the theme switcher button
    const themeChangers = [...document.getElementsByClassName('theme-changer')]
    console.log(themeChangers)
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
  } else if (sp.unload) {
  }
}

const indexPage = sp => {
  sp.log(sp.entryName)

  // Welcome the user with a nice falling-from-the-sky message
  const welcomeUs = () => {
    const welcome = document.getElementById('welcome')
    const pgw = window.innerWidth
    welcome.style.bottom = pgw < 550 ? '5em' : '4em'
    welcome.style.opacity = '1'
    return welcomeUs //Returns itself (needed for addEventListener in this case)
  }

  if (sp.DOMContentLoaded) {
    // Set the active navigation entry
    sp.setActiveNavEntr('homeLink')

    // Parralax

    // Unite #preamble, #content and #postamble "under the flag" of #preConPosWrapper
    const preamble = document.getElementById('preamble').cloneNode(true)
    const content = document.getElementById('content').cloneNode(true)
    const postamble = document.getElementById('postamble').cloneNode(true)
    const preConPosWrapper = document.createElement('div')
    preConPosWrapper.setAttribute('id', 'preConPosWrapper')
    // Some insignificant boxes with gradient / fill.
    const boxes = new Array(4).fill('').map((box, i) => {
      box = document.createElement('div')
      box.className = 'fakeBg'
      box.id = `fakeBg-${i + 1}`
      const fills = new Array(2).fill('').map((fill, i) => {
        fill = document.createElement('div')
        fill.className = `fill-${i + 1}`
        return fill
      })
      box.append(...fills)
      return box
    })
    preConPosWrapper.append(preamble, content, postamble, ...boxes)

    let parallaxLayers = [
      {},
      {
        toggleClasses: ['hands1', 'hands2', 'hands3'],
      },
      {
        toggleClasses: ['eyes1', 'eyes2'],
      },
      {},
      {},
      {},
      {}, // Content layer
    ]
    parallaxLayers.forEach((proto, i) => {
      proto.classList = []
      proto.classList.push('layer', `layer-${i}`)
    })
    parallaxLayers = parallaxLayers.map((proto, i, arr) => {
      const el = document.createElement('div')
      el.classList.add(...proto.classList)

      let content = ''
      if (i === arr.length - 1) {
        // If it is the last element add main content to it
        content = preConPosWrapper
      } else {
        // Else, it is a frame of the parallax
        // Create a sub-element which holds parallax frame background
        const img = document.createElement('div')
        img.classList.add('img')
        content = img
        if (proto.toggleClasses?.length >= 2) {
          // Pick a random string from the arr and apply it to the .img in random intervals
          const randClassOnRandInterval = (
            el,
            arr,
            min = 200,
            max = 600,
            prev
          ) => {
            let randClass
            //Make sure the randClass is not the same as the old one.
            do {
              randClass = arr[Math.floor(Math.random() * arr.length)]
            } while (randClass === prev)

            const randInterval = Math.floor(
              Math.random() * (max - min + 1) + min
            )
            if (prev) {
              // Clean up
              el.classList.remove(prev)
            }
            el.classList.add(randClass)
            setTimeout(
              randClassOnRandInterval,
              randInterval,
              img,
              arr,
              min,
              max,
              randClass
            )
          }
          // All that needs multiple frames, set up individual settings here
          if (proto.toggleClasses.includes('hands1')) {
            // Toggle the hands
            randClassOnRandInterval(img, proto.toggleClasses, 150, 200)
          } else if (proto.toggleClasses.includes('eyes1')) {
            // Toggle the eyes
            randClassOnRandInterval(img, proto.toggleClasses, 50, 1000)
          }
        }
      }
      el.append(content)

      return el
    })

    // Create the #parallax
    const parallax = document.createElement('div')
    parallax.setAttribute('id', 'parallax')
    parallax.append(...parallaxLayers)

    // Devastate and recreate the <body>
    document.body.innerHTML = ''
    document.body.appendChild(parallax)

    // 2. Greeting
    setTimeout(() => {
      window.addEventListener('resize', welcomeUs(), true) //Not a typo: Call welcomeUs initially and then on resize. (Notice that welcomeUs returns itself)
    }, 150)
  } else if (sp.load) {
  } else if (sp.unload) {
  }
}

const aboutPage = sp => {
  sp.log(sp.entryName)
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
  } else if (sp.unload) {
  }
}

const blog = sp => {
  sp.log(sp.entryName)
  if (sp.DOMContentLoaded) {
    // Set the active navigation entry
    sp.setActiveNavEntr('blogLink')
  } else if (sp.load) {
  } else if (sp.unload) {
  }
}

const blogPage = sp => {
  sp.log(sp.entryName)
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
  } else if (sp.unload) {
  }
}

const blogArticle = sp => {
  sp.log(sp.entryName)
  if (sp.DOMContentLoaded) {
    // Get date passed through an html comment inside <head>
    const date = document.head.innerHTML
      .split('\n')[1]
      .replace(/<!-- | -->/g, '')

    // Get author and description from some <meta>s in <head>
    const author = document.querySelector('meta[name="author"]').content
    const description = document.querySelector('meta[name="description"]')
      .content

    // Structure the fetched metadata to be inserted on the right place
    const meta = ` <div id="ArticleMetaData">
Last change: ${date}<br>
Author: <a href="/about.html">${author}</a>
</div>`
    const descriptionHTML = `<p id="description">${description}</p>`

    // Insert the metadata
    const header = document
      .getElementById('content')
      .getElementsByTagName('header')[0]
    header.innerHTML = header.innerHTML + meta + descriptionHTML
  } else if (sp.load) {
  } else if (sp.unload) {
  }
}

class Rule {
  constructor(name, condition, action, id) {
    this.name = name
    this.condition = condition
    this.action = action
    this.id = id
  }
  static genCondit(arr) {
    return path => {
      // NOTE: Sometimes, if the link has a doubleshlash, it fails these tests and the
      // site breaks! I didn't resolve this in the front-end because even if i did so,
      // it wouldn't solve the problem in its root: Why this whole thing depends on the url?
      return arr.some(str => {
        /*
        console.log(`Comparing: '${str}' with '${path}'`)
        console.log(
          `=> ${str === path} ||
            ${str === decodeURIComponent(path)} ||
            ${str === encodeURIComponent(path)}`
        )*/
        return (
          str === path ||
          str === decodeURIComponent(path) ||
          str === encodeURIComponent(path)
        )
      })
    }
  }
}

const rules = [
  new Rule('any', () => true, any),
  new Rule(
    'indexPage',
    Rule.genCondit(['/', '/index', '/index.html', 'index']),
    indexPage,
    'index'
  ),
  new Rule(
    'aboutPage',
    Rule.genCondit(['/about.html', '/about', 'about']),
    aboutPage,
    'about'
  ),
  new Rule('blog', path => path.includes('blog'), blog),
  new Rule(
    'blogPage',
    Rule.genCondit(['/blog.html', '/blog', 'blog']),
    blogPage,
    'blog'
  ),
  new Rule(
    'article',
    path => {
      return (
        path.includes('blog') &&
        !Rule.genCondit(['/blog.html', '/blog', 'blog'])(path)
      )
    },
    blogArticle,
    'article'
  ),
]

/*
const rules = [
  {
    name: 'any',
    condition: () => true,
    action: any,
  },
  {
    name: 'indexPage',
    id: 'index',
    condition: path => {},
    action: indexPage,
  },
  {
    name: 'aboutPage',
    id: 'about',
    condition: path => path === '/about.html' || path === '/about',
    action: aboutPage,
  },
  {
    name: 'blog',
    condition: path => path.includes('blog'),
    action: blog,
  },
  {
    name: 'blogPage',
    id: 'blog',
    condition: path => path === '/blog.html' || path === '/blog',
    action: blogPage,
  },
  {
    name: 'article',
    id: 'article',
    condition: path =>
      path.includes('blog') && !(path === '/blog.html' || path === '/blog'),
    action: blogArticle,
  },
]*/

const main = (event, config) => {
  const status = event.type
  const pathname = window.location.pathname
  const matching = rules.filter(entry => {
    // console.log(entry.condition)
    return entry.condition(pathname)
  })
  const starterPack = {
    config: config,
    DOMContentLoaded: status === 'DOMContentLoaded',
    load: status === 'load',
    unload: status === 'unload',
    html: document.documentElement,
    head: document.head,
    body: document.body,
    preamble: document.getElementById('preamble'),
    topnav: document.getElementById('topnav'),
    content: document.getElementById('content'),
    postamble: document.getElementById('postamble'),
    footer: document.getElementsByTagName('footer')[0],
    log: console.log,
    err: console.error,
    matchedRulesList: matching,
    setActiveNavEntr: className => {
      const target = document.getElementsByClassName(className)[0]
      target.setAttribute('data-current', '')
    },
    openImageOn: event => {
      const url = event.target.getAttribute('src')
      window.open(url, '_blank').focus()
    },
  }
  matching.forEach(entry => {
    if (entry.name === 'any') return
    starterPack.entryName = entry.name || null
    entry.action(starterPack)
  })
  // 'any' should be called last
  matching.forEach(entry => {
    if (entry.name === 'any') {
      starterPack.entryName = 'any'
      entry.action(starterPack)
    }
  })
}

const mainCaller = event => {
  main(event, CONFIG)
}
window.addEventListener('DOMContentLoaded', mainCaller) // DOM loaded
window.addEventListener('load', mainCaller) // DOM + static loaded
window.addEventListener('unload', mainCaller) // unloaded (pressing back, visiting link ...)
