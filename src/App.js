import React from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
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
