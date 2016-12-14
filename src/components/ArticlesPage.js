import 'isomorphic-fetch';
import React, { Component } from 'react';


class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // fetch here
    fetch('api/articles')
      .then(res => res.json())
      .then(json => {
        this.setState({
          articles: json
        });
      });
  }

  renderArticleList = () => {
    const articles = this.state.articles;
    return (articles ? articles.map(article => {
      return (
        <tr>
          <td><a href={`#/articles/${article._id}`}>{article.title}</a></td>
          <td>{article.tags.map(tag => (
            <span className=" react-tagsinput-tag">{tag}</span>))}
          </td>
          <td>{article.content}</td>
        </tr>);
    }): null );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {this.renderArticleList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
