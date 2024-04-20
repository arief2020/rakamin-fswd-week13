import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createBook, editBook } from '../modules/fetch';

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedImage) {
      toast({
        title: 'Error',
        description: 'Please select image',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(e.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get('title'),
          formData.get('author'),
          formData.get('publisher'),
          parseInt(formData.get('year'), 10),
          parseInt(formData.get('pages'), 10)
        );
        toast({
          title: 'Success',
          description: 'Book updated successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      } catch (error) {
        toast({
          title: 'Error',
          description: error.response.data.message || 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      e.target.reset();
      toast({
        title: 'Success',
        description: 'Book created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage('');
	  navigate('/')
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
	if (bookData?.image) {
		setSelectedImage(`http://localhost:8000/${bookData?.image}`);
	}
  }, [bookData])
  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input name="title" required defaultValue={bookData?.title} />
        </FormControl>
        <FormControl>
          <FormLabel>Author</FormLabel>
          <Input name="author" required defaultValue={bookData?.author} />
        </FormControl>
        <FormControl>
          <FormLabel>Publisher</FormLabel>
          <Input name="publisher" required defaultValue={bookData?.publisher} />
        </FormControl>
        <FormControl>
          <FormLabel>Year</FormLabel>
          <Input
            name="year"
            type="number"
            required
            defaultValue={bookData?.year}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Pages</FormLabel>
          <Input
            name="pages"
            type="number"
            required
            defaultValue={bookData?.pages}
          />
        </FormControl>
        {selectedImage && (
          <Image w={64} src={selectedImage} alt="Selected Image" />
        )}
        {!bookData?.image && (
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
            />
          </FormControl>
        )}

        <Button type="submit">{bookData ? 'Edit Book' : 'Create Book'}</Button>
      </VStack>
    </form>
  );
}

BookForm.propTypes = {
  bookData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    publisher: PropTypes.string,
    year: PropTypes.number,
    pages: PropTypes.number,
  }),
};

BookForm.defaultProps = {
  bookData: null,
};