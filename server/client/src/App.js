import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './componenets/Navbar';
import TrendingForum from './pages/TrendingForum';
import CreateQuestion from './pages/CreateQuestion';
import Question from './pages/Question';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
            <Routes>
              <Route path='/' element={<Home/> }/>  
              <Route path='login' element={<Login/> }/>  
              <Route path='signup' element={<Signup/> }/>   
              <Route path='dashboard' element={<Dashboard/> } />
              <Route path='ask-a-question' element={<CreateQuestion/> } />
              <Route path='trending-questions' element={<TrendingForum/> } />
              <Route path='addAnswer/:id' element={<Question/> } />
              <Route exact path="*" element={<Error />}/>
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
