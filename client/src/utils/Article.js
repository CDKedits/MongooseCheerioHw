import axios from 'axios'

const Article = {
  scrape: _ => axios.get(`/scrape`),
  getArticles: _ => axios.get(`/articles`)
}

export default Article