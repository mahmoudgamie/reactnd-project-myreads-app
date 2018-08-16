import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookShelfSelector from './BookShelfSelector';

class SearchBooks extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {
    searchResultsBooks: []
  }

  searchBooks(query) {
    if (query) {
      BooksAPI.search(query).then(res => {
        if (!res || res.error) {
          this.setState({ searchResultsBooks: [] })
        } else {
          res.map(resultBook => {
            this.props.books.forEach(book => {
              if (resultBook.id === book.id) {
                resultBook.shelf = book.shelf
              } else {
                resultBook.shelf = 'none';
              }
            })
            return resultBook;
          })
          this.setState({ searchResultsBooks: res })
        }
      })
    }
  }



  render() {
    const { searchResultsBooks } = this.state
    const { updateShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='./' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.searchBooks(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResultsBooks.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: book.imageLinks === undefined ? `url(https://s7.postimg.cc/shls4dbcb/persons.png)` : `url(${book.imageLinks.thumbnail})` }}></div>
                    <BookShelfSelector book={book} updateShelf={updateShelf} />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks