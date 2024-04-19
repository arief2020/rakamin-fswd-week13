import React from 'react';
import './App.css';
import {
  VStack,
} from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Homepage from "./pages/HomePage";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import NewBookPage from './pages/NewBookPage';
import BooksDetails from './pages/BooksDetailPage';
import EditBookPage from './pages/EditBookPage';

function App() {
  return (
    <VStack minH='100vh' minW='100vw'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/newbook' element={<NewBookPage />}/>
          <Route path='/books/:id' element={<BooksDetails />}/>
          <Route path='/editbook/:id' element={<EditBookPage />}/>
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
