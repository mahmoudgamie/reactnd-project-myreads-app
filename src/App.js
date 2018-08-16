import React from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.setState({ allBooks })
    })
  }

  updateShelf = (shelf, book) => {
    let modifiedBooks = []
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      modifiedBooks = this.state.allBooks.filter(bookRemoved => bookRemoved.id !== book.id)
      this.setState({ allBooks: modifiedBooks.concat(book) })
    })
  }

  render() {
    const { allBooks } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Books shelf="currentlyReading" books={allBooks} updateShelf={this.updateShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Books shelf="wantToRead" books={allBooks} updateShelf={this.updateShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Books shelf="read" books={allBooks} updateShelf={this.updateShelf} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' />
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <SearchBooks books={allBooks} updateShelf={this.updateShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
