import React from 'react'
import PropTypes from 'prop-types'

class BookShelfSelector extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { updateShelf, book } = this.props
    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={(event) => updateShelf(event.target.value, book)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfSelector