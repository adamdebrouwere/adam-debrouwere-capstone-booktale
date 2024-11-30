import React from 'react'
import { useAuthentication } from '../AuthenticationContext/AuthenticationContext'

function BookInfoDisplay({bookInfo}) {
  const { loading } = useAuthentication();

  if(loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>{bookInfo && (
        <div>
          <h2>{bookInfo.title}</h2>
          <p><strong>Author(s):</strong> {bookInfo.author}</p>
          {bookInfo.first_sentence && (<p><strong>First Sentence:</strong> {bookInfo.first_sentence}</p>)}
          
          <p><strong>Published Year:</strong> {bookInfo.publish_date}</p>
          {bookInfo.cover_url && (
            <img height="200" src={bookInfo.cover_url} alt={bookInfo.title} />
          )}
        </div>
      )}</div>
  )
}

export default BookInfoDisplay