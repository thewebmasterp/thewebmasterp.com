const indexPage = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)

  // Welcome the user with a nice falling-from-the-sky message
  const welcomeUs = () => {
    const welcome = document.getElementById('welcome')
    const pgw = window.innerWidth
    welcome.style.bottom = pgw < 550 ? '5em' : '4em'
    welcome.style.opacity = '1'
    return welcomeUs //Returns itself (needed for addEventListener in this case)
  }

  // When the index page is reloaded, its scroll should always start from top. Else, there's a bug with the #mask.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
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

    let parallaxLayers = new Array(6).fill('').map(str => ({}))
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
        /*
		 * Deprecated!
		 * Changing element class every few milliseconds triggers a DOM re-render
		 * which is causing this choppiness.
		 * 
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
        } */
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
  } else if (sp.beforeunload) {
  }
}

export default indexPage
