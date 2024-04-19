import { Flex, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getAllBooks } from '../modules/fetch'
import Books from '../components/Books'

export default function HomePage() {
	const [books, setBooks] = useState([])
	useEffect(() => {
		const fetchBooks = async () => {
			const allBooks = await getAllBooks();
			setBooks(allBooks)
		}
		fetchBooks()
	}, [])
	return (
	<VStack w='100vw'>
		<Flex gap={5}>
		{books?.books?.map((book) => (
			<Books key={`${book.id} ${book.title}`} id={book.id} title={book.title} author={book.author} image={book.image} publisher={book.publisher} year={book.year} />)
		)}		
		</Flex>
	</VStack>
  )
}
