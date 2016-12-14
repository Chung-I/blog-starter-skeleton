import 'isomorphic-fetch';
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';


class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      editorState: EditorState.createEmpty()
    };
    this.onChange = editorState => this.setState({ editorState: editorState });
  }

  onEditorChange = editorContent => {
    this.setState({
      content: editorContent
    });
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }


  handleSubmitClick = () => {
    const confirm = window.confirm('確定要新增文章嗎？');
    if (confirm) {
      // fetch here
      const body = this.state;
      fetch('/api/articles', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
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
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* tags */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button onClick={this._onBoldClick}>Bold</button>
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;
