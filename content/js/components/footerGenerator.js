import xml2json from '../scripts/xml2json'

const footerGenerator = xml => {
  const json = xml2json(xml)

  // SocialMedia
  const socmedia = document.createElement('div')
  socmedia.id = 'socmedia'
  const socialMediaBox = document.createElement('div')
  socialMediaBox.className = 'socMediaBox'
  socialMediaBox.innerHTML = `<xml>${
    xml.getElementsByTagName('socmedia')[0].outerHTML
  }</xml>` // The xml will later be replaced. Look at action any.js
  socmedia.append(socialMediaBox)

  // Subscribe
  const subscribe = document.createElement('div')
  subscribe.id = 'subscribe'
  const cta = document.createElement('h5')
  cta.id = 'cta'
  cta.innerHTML = json['SUBSCRIBE']['CTA']
  const subTwitter = document.createElement('div')
  subTwitter.id = 'subTwitter'
  const subEmail = document.createElement('div')
  subEmail.id = 'subEmail'
  const subRss = document.createElement('div')
  subRss.id = 'subRss'
  subscribe.append(cta, subTwitter, subEmail, subRss)

  // Info
  const info = document.createElement('div')
  info.id = 'info'

  // Bottom
  const bottom = document.createElement('div')
  bottom.id = 'bottom'

  // Assemble and 'spit' the footer
  const footer = document.createElement('footer')
  footer.append(socmedia, subscribe, info, bottom)
  return footer
}

export default footerGenerator
