import { Card, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export default function Books({id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card key={id} my={4} p={4} cursor="pointer">
		<VStack>
        <Heading size="md">
          {title} ({year})
        </Heading>
        <Text>{author}</Text>
        <Image w={24} h={24} src={`http://localhost:8000/${image}`} />
        <Text>
          <span>Publisher: </span>
          {publisher}
        </Text>
      </VStack>
	  </Card>
    </Link>
  );
}
Books.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};