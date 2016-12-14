import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

class SingleArticlePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      isEditing: false,
    };
  }

  componentDidMount() {
    const id = this.props.id;
    fetch(`/api/articles/${id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          title: json.title,
          content: json.content,
          tags: json.tags
        });
      });
    // fetch with id
  }

  /*componentDidUpdate() {
    // fetch with id
    const id = this.props.id;
    fetch(`/api/articles/${id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          title: json.title,
          content: json.content,
          tags: json.tags
        });
      });
  }*/


  handleTagsChange = tags => {
    this.setState({ tags });
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  }

  handleContentChange = event => {
    this.setState({
      content: event.target.value
    });
  }

  handleDelClick = () => {
    const confirm = window.confirm('確定要刪除文章嗎？');
    if (confirm) {
      fetch(`/api/articles/${this.props.id}`, {
        method: 'DELETE'
      })
      .then(() => { document.location.href = '#/articles'; });
    }
  };

  handleEditClick = () => {
    const isEditing = this.state.isEditing;
    this.setState({ isEditing: !isEditing });
    if (isEditing) {
      fetch(`/api/articles/${this.props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
    }
  };
  renderContent = () => (this.state.isEditing ?
    (<textarea
      className="form-control"
      rows="12"
      value={this.state.content}
      onChange={this.handleContentChange}
    />) :
    (<p>{this.state.content}</p>));

  renderTags = () => {
    let handleChange = () => {};
    if (this.state.isEditing) handleChange = this.handleTagsChange;
    return (<TagsInput
      value={this.state.tags}
      onChange={handleChange}
    />);
  };

  renderTitle = () => (this.state.isEditing ?
    (<input
      type="text"
      className="form-control"
      value={this.state.title}
      onChange={this.handleTitleChange}
      required
    />) :
    (<p className="h1">{this.state.title}</p>));

  render() {
    const { isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              {this.renderTitle()}
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderContent()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-info"
              role="button"
              onClick={this.handleEditClick}
            >{isEditing ? '確認' : '編輯'}</button>
            {isEditing ? null :
            <button
              className="btn btn-warning"
              role="button"
              onClick={this.handleDelClick}
            >刪除</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticlePage;
