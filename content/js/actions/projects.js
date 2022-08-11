// Note: repeating function
/*
const iconGenerator = (label, innerHTML, tooltip) => {
  const icon = document.createElement('i')
  icon.classList.add(`${label}-icon`)
  icon.setAttribute('title', tooltip)
  icon.setAttribute('aria-hidden', true)
  // You can't properly generate svg element with document.createElement. You have to use createElementNS, as follows:
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  // For more on the topic, see https://stackoverflow.com/questions/28734628/how-can-i-set-an-attribute-with-case-sensitive-name-in-a-javascript-generated-el/28734954
  //svg.classList.add('feather', `feather-${label}`)
  //svg.setAttribute('fill', 'none')
  //svg.setAttribute('stroke', 'currentColor')
  //svg.setAttribute('stroke-linecap', 'round')
  //svg.setAttribute('stroke-linejoin', 'round')
  //svg.setAttribute('stroke-width', '2')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svg.innerHTML = innerHTML
  icon.append(svg)

  return icon
}*/

const projects = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)
  if (sp.DOMContentLoaded) {
    // Set the active navigation entry
    sp.setActiveNavEntr('aboutLink')

    const slideshow = document.getElementById('slideshow')
    if (slideshow) {
      // For each slide, add a number label
      const slideshowNodes = [...slideshow.childNodes].filter(child => {
        return child?.classList?.contains('mySlides')
      })
      slideshowNodes.forEach((child, i, arr) => {
        const numLabel = document.createElement('div')
        numLabel.className = 'numbertext'
        numLabel.append(`${i + 1} / ${arr.length}`)
        child.prepend(numLabel)
      })

      // Append next/prev buttons
      const createButton = (className, char, plus) => {
        const a = document.createElement('a')
        a.className = className
        a.innerText = char
        a.addEventListener('click', () => {
          plusSlides(plus)
        })
        return a
      }
      slideshow.appendChild(createButton('prev', '❮', -1))
      slideshow.appendChild(createButton('next', '❯', 1))

      // Append dots to the bottom
      const dots = document.createElement('div')
      dots.className = 'dots'
      slideshowNodes.forEach((n, i) => {
        const dot = document.createElement('span')
        dot.className = 'dot'
        dot.addEventListener('click', () => {
          currentSlide(i + 1)
        })
        dots.appendChild(dot)
      })

      slideshow.parentNode.insertBefore(dots, slideshow.nextSibling)

      let slideIndex = 1
      showSlides(slideIndex)

      function plusSlides(n) {
        showSlides((slideIndex += n))
      }

      function currentSlide(n) {
        showSlides((slideIndex = n))
      }

      function showSlides(n) {
        let i
        let slides = document.getElementsByClassName('mySlides')
        let dots = document.getElementsByClassName('dot')
        if (n > slides.length) {
          slideIndex = 1
        }
        if (n < 1) {
          slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none'
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(' active', '')
        }
        slides[slideIndex - 1].style.display = 'block'
        dots[slideIndex - 1].className += ' active'
      }
    }
  } else if (sp.load) {
    // Overwrite .projects .card .thumbnail img "src" attribute to a better one
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

    /*
    // Enqueue a special card that will link to "other projects"
    const otherProjectsLink = './all-projects.html'
    const projects = document.getElementsByClassName('projects')[0]
    if (!projects.classList.contains('noothers')) {
      const card = document.createElement('div')
      card.addEventListener('click', () => {
        window.open(otherProjectsLink, '_self')
      })
      card.classList.add('card', 'others')

      // Ofc not the best way to do it. I'll change it someday (TODO)
      const icon = iconGenerator(
        'bulb',
        `<g transform="matrix(1.1036 0 0 1.1036 25.226 -16.122)" stroke-width=".90613">
<path d="m-13.76 32.782v1.3755c0 1.0087 0.81772 1.8265 1.8265 1.8265 1.0087 0 1.8265-0.81772 1.8265-1.8265v-1.3755z" fill="#c7cfe2"/>
<path d="m-12.376 34.158v-1.3755h-1.3831v1.3755c0 1.0087 0.81772 1.8265 1.8265 1.8265 0.24481 0 0.47818-0.04849 0.69156-0.13593-0.66573-0.27263-1.1349-0.92663-1.1349-1.6905z" enable-background="new" opacity=".1"/>
<path d="m-11.854 18.274c-3.1466-0.0426-5.7808 2.5546-5.7808 5.7014 0 1.2542 0.4053 2.4136 1.0916 3.3551 1.1014 1.8338 1.6245 2.6882 1.7825 3.8077 0.06771 0.47996 0.4778 0.8372 0.9625 0.8372h3.7308c0.4847 0 0.89475-0.35728 0.9625-0.8372 0.15795-1.1194 0.6811-1.9738 1.7825-3.8077 0.68631-0.94145 1.0916-2.1009 1.0916-3.3551 0-3.1228-2.5104-5.6593-5.6231-5.7014z" fill="#ffd782"/>
<path d="m-12.917 31.138c-0.15795-1.1194-0.68106-1.9738-1.7825-3.8077-0.68631-0.94145-1.0916-2.1009-1.0916-3.3551 0-2.8092 2.0993-5.1802 4.7883-5.6264-0.27762-0.04561-0.56207-0.07114-0.85168-0.07512-3.1466-0.0426-5.7808 2.5546-5.7808 5.7014 0 1.2542 0.4053 2.4136 1.0916 3.3551 1.1014 1.8339 1.6245 2.6882 1.7825 3.8077 0.06771 0.47996 0.4778 0.83715 0.9625 0.83715h1.8442c-0.48474 8.5e-5 -0.89483-0.35715-0.96254-0.83711z" enable-background="new" opacity=".1"/>
<path d="m-9.3579 32.782-2.5752-0.8073-2.5752 0.8073c-0.44587 0-0.8073 0.36147-0.8073 0.8073 0 0.44587 0.36147 0.80734 0.8073 0.80734h5.1503c0.44587 0 0.8073-0.36147 0.8073-0.80734 4.2e-5 -0.44583-0.36143-0.8073-0.80726-0.8073z" fill="#b4bbcc"/>
<path d="m-13.471 33.59c0-0.44587 0.36147-0.8073 0.80734-0.8073l1.6531-0.5182-0.9221-0.28906-2.5752 0.8073c-0.44587 0-0.80734 0.36147-0.80734 0.8073 0 0.44587 0.36147 0.80734 0.80734 0.80734h1.8442c-0.44587-8.5e-5 -0.80734-0.36147-0.80734-0.80738z" enable-background="new" opacity=".1"/>
<path d="m-9.3579 31.168h-5.1504c-0.44587 0-0.8073 0.36147-0.8073 0.8073 0 0.44587 0.36147 0.8073 0.8073 0.8073h5.1503c0.44587 0 0.8073-0.36147 0.8073-0.8073 4.2e-5 -0.44583-0.36143-0.8073-0.80726-0.8073z" fill="#c7cfe2"/>
<path d="m-13.471 31.975c0-0.44587 0.36147-0.8073 0.80734-0.8073h-1.8442c-0.44587 0-0.80734 0.36147-0.80734 0.8073 0 0.44587 0.36147 0.8073 0.80734 0.8073h1.8442c-0.44587 0-0.80734-0.36139-0.80734-0.8073z" enable-background="new" opacity=".1"/>
<path d="m-12.279 14.994v1.8795c0 0.19098 0.15482 0.3458 0.3458 0.3458s0.3458-0.15482 0.3458-0.3458v-1.8795c0-0.19098-0.15482-0.3458-0.3458-0.3458s-0.3458 0.15482-0.3458 0.3458z"/>
<path d="m-17.38 16.469 0.89902 1.6505c0.06276 0.11522 0.18141 0.18044 0.30396 0.18044 0.0559 0 0.11256-0.01355 0.16511-0.04218 0.16774-0.09134 0.2296-0.30138 0.13826-0.46908l-0.89902-1.6505c-0.09134-0.16774-0.30138-0.22965-0.46908-0.13826-0.16765 0.09139-0.22956 0.30138-0.13826 0.46908z"/>
<path d="m-21.153 20.205 1.579 1.0194c0.05802 0.03748 0.12298 0.0553 0.18722 0.0553 0.11345 0 0.22465-0.05581 0.29084-0.15829 0.10358-0.16045 0.05751-0.37447-0.10294-0.47805l-1.579-1.0194c-0.16049-0.10362-0.37447-0.05755-0.47805 0.10294-0.10362 0.16045-0.05751 0.37452 0.10294 0.4781z"/>
<path d="m-6.625 16c-0.16782-0.09138-0.37778-0.02943-0.46908 0.13826l-0.89898 1.6505c-0.09134 0.16774-0.02947 0.37769 0.13822 0.46908 0.05255 0.02863 0.10921 0.04218 0.16511 0.04218 0.12255 0 0.24121-0.0653 0.30396-0.18044l0.89898-1.6505c0.09138-0.16774 0.02947-0.37769-0.13822-0.46908z"/>
<path d="m-3.0881 19.624-1.579 1.0194c-0.16045 0.10358-0.20657 0.3176-0.10294 0.47805 0.06615 0.10244 0.17731 0.15829 0.29084 0.15829 0.06428 0 0.12928-0.01787 0.18722-0.0553l1.579-1.0194c0.16045-0.10358 0.20657-0.3176 0.10294-0.47805-0.10358-0.16045-0.31777-0.20648-0.47805-0.10299z"/>
<path d="m-7.9966 28.458c0.0553 0.03282 0.11616 0.04844 0.17612 0.04844 0.11806 0 0.23312-0.06047 0.2977-0.16939 0.13877-0.23388 0.28969-0.48512 0.45413-0.75885l0.03447-0.05738c0.75161-1.0365 1.1487-2.2624 1.1487-3.5462 0-1.6009-0.61936-3.1099-1.744-4.2489-1.1236-1.138-2.6224-1.7767-4.2202-1.7983-1.6635-0.021-3.2851 0.66688-4.452 1.8912-0.13178 0.13826-0.12653 0.35711 0.01177 0.48889 0.13826 0.13174 0.35715 0.12653 0.48889-0.01177 1.0346-1.0856 2.4714-1.6976 3.9421-1.6769 1.4151 0.01918 2.7424 0.58481 3.7375 1.5927 0.99604 1.0088 1.5446 2.3452 1.5446 3.763 0 1.1416-0.35448 2.2313-1.0252 3.1514-0.0061 0.0083-0.01173 0.01681-0.01702 0.02562l-0.04226 0.07034c-0.16511 0.27487-0.31671 0.52722-0.45608 0.76207-0.09748 0.1643-0.04336 0.37642 0.12086 0.4739z"/>
<path d="m-8.3376 29.052c-0.16977-0.08723-0.37828-0.02037-0.4656 0.14953-0.3115 0.60619-0.49753 1.1061-0.59912 1.6205h-5.0615c-0.20593-1.044-0.73772-1.9292-1.7214-3.5667l-0.06187-0.10294c-0.0053-0.0088-0.01097-0.01732-0.01702-0.02566-0.67069-0.92011-1.0252-2.0099-1.0252-3.1514 0-0.92278 0.24642-1.837 0.7127-2.6438 0.09558-0.16532 0.03896-0.37684-0.12636-0.47238-0.16528-0.09558-0.3768-0.039-0.47238 0.12636-0.52692 0.91185-0.80544 1.9457-0.80544 2.9898 0 1.2838 0.39713 2.5096 1.1487 3.5462l0.05408 0.08999c0.9882 1.6451 1.4708 2.4487 1.6453 3.3952-0.31777 0.20555-0.52866 0.56279-0.52866 0.9686 0 0.31413 0.12636 0.59912 0.33081 0.8073-0.20441 0.20818-0.33081 0.49321-0.33081 0.8073 0 0.63584 0.51731 1.1531 1.1531 1.1531h0.48347c0.25789 0.9232 1.1089 1.5872 2.0917 1.5872s1.8338-0.664 2.0917-1.5873h0.48347c0.63584 0 1.1531-0.51731 1.1531-1.1531 0-0.31413-0.12636-0.59912-0.33081-0.8073 0.20441-0.20818 0.33081-0.49321 0.33081-0.8073 0-0.40581-0.21089-0.76309-0.52866-0.9686 0.08639-0.46971 0.25052-0.9152 0.54534-1.489 0.08732-0.16985 0.02032-0.37833-0.14948-0.4656zm-3.5955 6.5866c-0.60192 0-1.1313-0.36524-1.3601-0.89572h2.7201c-0.2288 0.53048-0.75822 0.89572-1.3601 0.89572zm1.6135-2.5104h0.96161c0.2545 0 0.4615 0.20708 0.4615 0.4615 0 0.2545-0.20708 0.46154-0.4615 0.46154h-5.1504c-0.2545 0-0.4615-0.20708-0.4615-0.46154 0-0.25446 0.20708-0.4615 0.4615-0.4615h2.8216c0.19098 0 0.3458-0.15482 0.3458-0.3458s-0.15482-0.3458-0.3458-0.3458h-2.8216c-0.2545 0-0.4615-0.20708-0.4615-0.4615 0-0.20839 0.13886-0.38476 0.32886-0.44193 0.01783-0.0053 0.03604-0.0094 0.05446-0.01249 0.0055-9.67e-4 0.01105-0.0018 0.01664-0.0025 0.02033-0.0027 0.04082-0.0046 0.06153-0.0046h5.1503c0.02075 0 0.0412 0.0019 0.06153 0.0046 0.0056 7.25e-4 0.01114 0.0016 0.01673 0.0026 0.01825 0.0031 0.03633 0.0071 0.05404 0.01241 0.19018 0.05704 0.32925 0.23346 0.32925 0.44202 0 0.2545-0.20708 0.4615-0.4615 0.4615h-0.96162c-0.19098 0-0.3458 0.15482-0.3458 0.3458 0 0.19098 0.15482 0.34576 0.3458 0.34576z"/>
</g>`,
        'See other projects'
      )

      const a = document.createElement('a')
      a.setAttribute('href', otherProjectsLink)
      const text = document.createElement('h4')
      text.innerText = 'Other projects'
      a.appendChild(text)

      card.append(icon, a)

      const cards = [...projects.getElementsByClassName('card')]
      const lastCard = cards[cards.length - 1]
      const lastCardHeight = lastCard.offsetHeight

      card.style.height = `${lastCardHeight}px`
      //console.log(lastCardHeight)

      projects.appendChild(card) 
    } */
  } else if (sp.beforeunload) {
  }
}

export default projects
