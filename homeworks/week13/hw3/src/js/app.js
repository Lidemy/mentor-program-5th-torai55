// eslint-disable-next-line no-unused-vars
import css from '../style.css'
import { getTopGames, getStreams } from './api'
import { renderContent, renderLinks, scrollHandler, loadMore } from './utils'
import { GAMELIMIT } from './variables'

document.addEventListener('DOMContentLoaded', () => {
  getTopGames(GAMELIMIT, (topGames) => {
    renderLinks(topGames)
    getStreams(topGames[0], renderContent)
  })
  loadMore()

  const links = document.querySelector('nav .links')
  links.addEventListener('click', (e) => {
    getStreams(e.target.textContent, renderContent)
    loadMore()
  })
})

document.addEventListener('scroll', scrollHandler)
