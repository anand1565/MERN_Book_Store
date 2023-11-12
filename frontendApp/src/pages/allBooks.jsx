import React from 'react';
import { useEffect } from 'react'

const allBooks = () => {
    useEffect(() => {
        axios.get('http://localhost:5000/book/all').then(
            response => console.log(response)
        )
    }, [])
    return (
        <div>
            <h1>Welcome to the MERN book store</h1>
        </div>
    )
}

export default allBooks;
