const express = require(`express`)
const app = express()
const { join } = require(`path`)

app.use(express.static(join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


require(`./routes`)(app)

require(`mongoose`).connect(`mongodb://localhost/news_db`)
  .then(_ => app.listen(3001))
  .catch(e => console.log(e))