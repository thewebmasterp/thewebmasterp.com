// Copy this template for any action you need.
const template = sp => {
  sp.log(`${sp.entryName} - ${sp.status}`)
  // Any code executed outside of the following if/else will be executed once, twice or even thrice.
  if (sp.DOMContentLoaded) {
    // When the skeleton of the page is loaded (without images, scripts, styles, pres, etc)
  } else if (sp.load) {
    // When the whole page is loaded. Warning! Unfound files or slowly loading ones will block this event.
  } else if (sp.beforeunload) {
    // Right before the page is closed I believe.
  }
}

export default template
