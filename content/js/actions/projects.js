const projects = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)
  if (sp.DOMContentLoaded) {
    // Set the active navigation entry
    sp.setActiveNavEntr('aboutLink')

    const slideshow = document.getElementById('slideshow')

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
  } else if (sp.load) {
  } else if (sp.beforeunload) {
  }
}

export default projects
