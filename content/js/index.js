import matomoInit from './matomoInit'

import any from './actions/any'
import indexPage from './actions/indexPage'
import aboutPage from './actions/aboutPage'
import contactPage from './actions/contactPage'
import blog from './actions/blog'
import blogPage from './actions/blogPage'
import blogArticle from './actions/blogArticle'

const CONFIG = {
  defaultTheme: 'dark',
  themeAttribute: 'data-theme',
  iconsBasePath: '/css/icons',
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
  new Rule(
    'contactPage',
    Rule.genCondit(['/contact.html', '/contact', 'contact']),
    contactPage,
    'contact'
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

const main = (event, config) => {
  const status = event.type
  const pathname = window.location.pathname
  const matching = rules.filter(entry => {
    // console.log(entry.condition)
    return entry.condition(pathname)
  })
  const starterPack = {
    config: config,
    status: status,
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

  // Initialize matomo
  matomoInit()
}

const mainCaller = event => {
  main(event, CONFIG)
}
window.addEventListener('DOMContentLoaded', mainCaller) // DOM loaded
window.addEventListener('load', mainCaller) // DOM + static loaded
window.addEventListener('unload', mainCaller) // unloaded (pressing back, visiting link ...)
