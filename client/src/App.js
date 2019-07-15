import React, { Component } from 'react';
import Article from './utils/Article.js'

class App extends Component {
  state = {
    articles: []
  }

  handleScrapeArticles = _ => {
    Article.scrape()
      .then(_ => this.handleGetArticles())
      .catch(e => console.error(e))
  }

  handleGetArticles = _ => {
    Article.getArticles()
      .then(({ data }) => this.setState({ articles: data }))
      .catch(e => console.log(e)) 
  }

  render() {
    return (
      <>
        <nav>
          <button onClick={this.handleScrapeArticles}>View articles!</button>
        </nav>
        <div>
        {
          this.state.articles.map(article => (
            <div>
              <a href={article.url}>Title: {article.headline}</a>
              <p>Summary: {article.summary}</p>
            </div>
          ))
        }
        </div>
      </>
    );
  }
}

export default App;
