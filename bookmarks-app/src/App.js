import React, { Component } from 'react';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    bookmarks: [],
    error: null
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { page, bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav clickPage={this.changePage} />
        <div className='content' aria-live='polite'>
          {page === 'add' && (
            <AddBookmark
              onAddBookmark={this.addBookmark}
              onClickCancel={() => this.changePage('list')}
            />
          )}
          {page === 'list' && (
            <BookmarkList
              bookmarks={bookmarks}
            />
          )}
        </div>
      </main>
    );
  }
}

export default App;
