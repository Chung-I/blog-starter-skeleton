import 'isomorphic-fetch';
import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';


class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: []
    };
  }

  handleContentChange = event => {
    this.setState({
      content: event.target.value
    });
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  }

  handleTagsChange = tags => {
    this.setState({ tags });
  }

  clearState = () => {
    this.setState({
      title: '',
      tags: [],
      content: ''
    });
  }

  handleSubmitClick = () => {
    const confirm = window.confirm('確定要新增文章嗎？');
    if (confirm) {
      // fetch here
      fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then(this.clearState)
      .then(() => { document.location.href = '#/articles'; });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleSubmitClick}
            >送出</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add a title"
              value={this.state.title}
              onChange={this.handleTitleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <label htmlFor="tags">Tags</label>
            <TagsInput value={this.state.tags} onChange={this.handleTagsChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              rows="12"
              placeholder="Write here"
              value={this.state.content}
              onChange={this.handleContentChange}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;
