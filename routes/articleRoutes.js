const { Article } = require(`../models`)
const axios = require(`axios`)
const cheerio = require(`cheerio`)

module.exports = app => {
  app.get(`/scrape`, (req, res) => {
    axios.get(`https://www.imdb.com/news/top`)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        $(`article.news-article`).each((i, elem) => {
          Article.find({ link: `https://www.imdb.com` + $(elem).children(`footer`).children(`ul`).children(`li.news-article__perma-link`).children(`a`).attr(`href`) })
            .then(article => {
              if (article.length === 0) {
                Article.create({
                  headline: $(elem).children('header').children('h2').text(),
                  summary: $(elem).children('section').children('div.news-article__content').text(),
                  url: `https://www.imdb.com` + $(elem).children(`footer`).children(`ul`).children(`li.news-article__perma-link`).children(`a`).attr(`href`),
                  comments: null
                })
              }
            })
        })
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  app.get(`/articles`, (req, res) => {
    Article.find({})
      .then(articles => res.json(articles))
      .catch(e => console.log(e))
  })
}