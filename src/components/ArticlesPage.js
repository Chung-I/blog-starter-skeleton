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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* implement */}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
