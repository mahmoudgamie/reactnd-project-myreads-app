import React from 'react'
import BookShelfSelector from './bookShelfSelector'
import PropTypes from 'prop-types'

class Books extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired
  }
  render() {
    const { books, shelf } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => book.shelf === shelf && (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <BookShelfSelector />
                </div>
                <div className="book-title">{book.title}</div>
                <ul>
                  {book.authors.map((author, index) =>
                    <li key={index} className="book-authors-list">
                      <div className="book-authors">{author}</div>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Books