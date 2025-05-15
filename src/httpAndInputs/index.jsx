import { useState } from "react";

const HttpAndInputs = () => {
    const [author, setAuthor] = useState("");
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        isbn: '',
        description: '',
        price: '',
    });
    const [bookCreated, setBookCreated] = useState(false);

    const onInputChange = (e) => {
        setAuthor(e.target.value);
    }

    const changeNewBook = (keyToChange) => (e) => {
        console.log(keyToChange);

        setNewBook({
            ...newBook,
            [keyToChange]: e.target.value,
        })
    }

    const searchBooks = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/books/book?author=${author}`,)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setBooks(response.books);
            });
    };

    const createBook = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/books/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        })
            .then(result => result.json())
            .then(result => setBookCreated(result.responseCode === 'created'));
    }

    return (
        <div>
            <h1>Books</h1>
            <h2>Search Books</h2>
            <input type='text' value={author} onChange={ onInputChange } />
            <button onClick={searchBooks}>Search Books by Author</button>
            { books.length !== 0 &&
                <ul>
                    {
                        books.map(book => (
                            <li key={book.id}>
                                title: {book.title}
                                author: {book.author}
                            </li>
                        ))
                    }
                </ul>
            }
            <h2>Creat a book</h2>
            <div>
                <label>Title</label>
                <input type='text' value={ newBook.title } onChange={ changeNewBook('title') }/><br/>
                <label>Author</label>
                <input type='text' value={ newBook.author } onChange={ changeNewBook('author') }/><br/>
                <label>isbn</label>
                <input type='text' value={ newBook.isbn } onChange={ changeNewBook('isbn') }/><br/>
                <label>description</label>
                <input type='text' value={ newBook.description } onChange={ changeNewBook('description') }/><br/>
                <label>price</label>
                <input type='text' value={ newBook.price } onChange={ changeNewBook('price') }/> <br />
                <button onClick={createBook}>Create book</button>
                { bookCreated &&
                    <p>Book created!</p>
                }
            </div>
        </div>
    )
}

export default HttpAndInputs;