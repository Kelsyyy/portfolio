/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import React, { Component } from 'react'
import './style/_todolist.scss'
import AddInput from './AddInput'
import FilterList from './FilterList'
import TodoContent from './TodoContent'
import Footer from './Footer'
import { Draggable, DragDropContext } from 'react-beautiful-dnd'

const tabList = ['全部', '待完成', '已完成']

function TodoList() {
  const [inputValue, setInputValue] = useState('')
  const [list, setList] = useState('全部')
  const [editValue, setEditValue] = useState('')
  const [remind, setRemind] = useState('')

  //代辦事項
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '瑜珈課',
      completed: false,
      edit: false,
    },
  ])
  // 篩選後
  const [filterTodoList, setFilterTodoList] = useState(todos)

  useEffect(() => {
    let filterTodo = ''
    switch (list) {
      case '待完成':
        filterTodo = todos.filter((todo) => {
          return todo.completed === false
        })
        break
      case '已完成':
        filterTodo = todos.filter((todo) => {
          return todo.completed === true
        })
        break
      default:
        filterTodo = todos
        break
    }
    setFilterTodoList(filterTodo)
  }, [list, todos])

  useEffect(() => {
    if (localStorage.getItem('todos') === null) return
    setTodos(JSON.parse(localStorage.getItem('todos')))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  let clearStorage = () => {
    localStorage.removeItem('todos')
    setTodos([])
  }

  const completeHandler = (id) => {
    const checkBoxCompleted = todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })
    setTodos(checkBoxCompleted)
  }

  const editHandler = (id) => {
    const newTodos = todos.map((v) => {
      return v.id === id ? { ...v, edit: true } : { ...v, edit: false }
    })
    setTodos(newTodos)
    setEditValue(todos.text)
  }

  const updateTodo = (id) => {
    if (!editValue || !editValue.trim()) {
      return setRemind('請輸入內容')
    } else {
      const newTodos = todos.map((v) => {
        return v.id === id ? { ...v, text: editValue, edit: false } : { ...v }
      })
      setRemind('')
      setTodos(newTodos)
    }
  }

  const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(newTodos)
  }

  return (
    <>
      <div className="bg">
        <div className="container">
          <h1>TODO LIST</h1>
          <AddInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            todos={todos}
            setTodos={setTodos}
          />
          <FilterList tabList={tabList} list={list} setList={setList} />
          <TodoContent
            setTodos={setTodos}
            filterTodoList={filterTodoList}
            editValue={editValue}
            setEditValue={setEditValue}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            tabList={tabList}
            list={list}
            setList={setList}
            editHandler={editHandler}
            updateTodo={updateTodo}
            remind={remind}
            setRemind={setRemind}
          />
          <Footer todos={todos} clearStorage={clearStorage} />
        </div>
      </div>
    </>
  )
}

export default TodoList
