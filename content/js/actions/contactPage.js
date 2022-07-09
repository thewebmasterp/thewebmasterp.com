const contactPage = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)
  if (sp.DOMContentLoaded) {
    const contactme = document.getElementById('contactme')
    if (!contactme) console.error('No #contactme!')
    contactme.addEventListener('submit', () => {
      const subject = document.getElementById('subject')
      const action = contactme.getAttribute('action')
      const subjectPrefix = '?subject='
      const i = action.indexOf(subjectPrefix) + subjectPrefix.length
      contactme.setAttribute('action', action.slice(0, i) + subject.value)
      console.log(subject.value)
    })

    const greeting = 'Hey thewebmasterp, hear this joke. '
    const jokes = [
      "What are a shark's two most favorite words?", // Man overboard!
      'Why are ghosts such bad liars?', // Because they are easy to see through.
      'What do you call a singing laptop?', // A Dell!
      'What did the buffalo say when his son left for college?', // Bison!
      'Why did the web developer drown?', // He had too many anchors.
      'Why was the JavaScript reality show cancelled after only one episode?', // People thought it seemed scripted.
      'How can you tell that a web developer is working?', // You can hear him Grunting!
      'Why does no one like jokes about descriptions, keywords, or character encodings?', // They’re too ‘meta’.
      'Why did the IP cross the subnet?', // Because the NAT said to!
      'Why was the class upset that its parent died?', // Because it wouldn’t be getting the inheritance!
      'How do you comfort a JavaScript bug?', // You console it.
      'Why was the web developer fired from her job?', // She did Less every day.
      'How does a web developer like his coffee?', // #000000
      'Why did the web developer send a few extra bucks to her hosting provider?', // Because she heard that she should always tip her server.
      'Why couldn’t the programmer work late into the night?', // She didn’t have a LAMP.
    ].map(joke => `${greeting}${joke}`)

    const prop = 'alreadySeenJokes'
    let alreadySeen = JSON.parse(localStorage.getItem(prop)) || []
    if (alreadySeen.length === jokes.length) {
      // If all jokes seen, reset the tracker
      localStorage.setItem(prop, JSON.stringify([]))
      alreadySeen = JSON.parse(localStorage.getItem(prop))
    }
    // Remove the already seen jokes
    alreadySeen.forEach(n => {
      jokes.splice(n, 1)
    })
    const randomJokeIndex = Math.floor(Math.random() * jokes.length)
    const newAlreadySeen = JSON.parse(localStorage.getItem(prop)) || []
    newAlreadySeen.push(randomJokeIndex)
    localStorage.setItem(prop, JSON.stringify(newAlreadySeen))

    // Apply the chosen joke as a placeholder for the message
    document
      .getElementById('message')
      .setAttribute('placeholder', jokes[randomJokeIndex])
  } else if (sp.load) {
  } else if (sp.beforeunload) {
  }
}

export default contactPage
