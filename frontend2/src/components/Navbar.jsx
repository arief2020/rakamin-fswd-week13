import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../modules/fetch';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const [authToken, setAuthToken] = useLocalStorage('token', null)

  useEffect(() => {
    // const token = window.localStorage.getItem('token');
    if (authToken) {
      setIsLogin(true);
    }
  }, [authToken]);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Link to="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold">
            My Website
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => {
              setAuthToken(null)
              // window.localStorage.removeItem('token');
              setIsLogin(false);
              navigate('/');
            }}
          >
            Logout
          </Button>
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              setAuthToken(token.token)
              // window.localStorage.setItem('token', token.token);
              navigate('/');
              onClose();
            } catch (err) {
              toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button variant="ghost">
                  Doesn&apos;t Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
}
