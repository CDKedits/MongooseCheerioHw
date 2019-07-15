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
      .then(({ data }) => this.setState({ stacks: data }))
      .catch(e => console.log(e)) 
  }

  render() {
    return (
      <>
        <nav>
          <button onClick={this.handleScrapeArticles}>Update article list!</button>
        </nav>
        <div>
        {
          this.state.articles.map(article => (
            <div>
              <p>Title: {article.headline}</p>
              <p>Summary: {article.summary}</p>
              <p>Link: {article.url}</p>
            </div>
          ))
        }
        </div>
      </>
    );
  }
}

export default App;
