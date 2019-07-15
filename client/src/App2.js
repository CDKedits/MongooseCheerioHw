import React, { Component } from 'react';
import Article from './utils/Article.js'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {<a href={article.url}>{article.headline}</a>}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {article.summary}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href={article.url}>Link to full article</a>
                    </Button>
                  </CardActions>
                </Card>
              ))
            }
        </div>
      </>
    );
  }
}

export default App;