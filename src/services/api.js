import fetch from "isomorphic-fetch"
import XMLParser from "./parser"

const CAT_IMAGES_URL = "http://mapd-cats.azurewebsites.net/catpics"
const CAT_FACTS_URL = "http://mapd-cats.azurewebsites.net/catfacts"

function fetchImages () {
  return fetch(CAT_IMAGES_URL)
    .then(response => response.text())
    .then(text => {
      const xml = XMLParser.parseFromString(text, "text/xml")
      const urls = [...xml.getElementsByTagName('url')]
      return urls.map(element => element.innerHTML)
    })
}

function fetchFacts () {
  return fetch(CAT_FACTS_URL)
    .then(response => response.json())
}

function fetchCats () {
  return Promise.all([fetchImages(), fetchFacts()])
    .then(data => {
      const [images, {facts}] = data
      return images.map((url, index) => ({
        fact: facts[index],
        url
      }))
    })
}

export default {
  fetchCats
}
