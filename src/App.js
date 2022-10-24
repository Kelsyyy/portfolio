import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import About from './pages/About/About'
import Signin from './pages/Signin'
import TodoList from './pages/TodoList/TodoList'
import Weather from './pages/Weather/Weather'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/todolist" element={<TodoList />}></Route>
          <Route path="/weather" element={<Weather />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
