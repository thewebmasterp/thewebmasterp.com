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

export default blogArticle
