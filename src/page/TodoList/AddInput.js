import React from 'react'

function AddInput({ inputValue, setInputValue, todos, setTodos }) {
  return (
    <>
      <div className="card addTodoInput">
        <input
          className="todoInput"
          type="text"
          placeholder="請輸入代辦事項"
          value={inputValue}
          onChange={(e) => {
            // console.log(e.target.value)
            setInputValue(e.target.value)
          }}
          onKeyDown={(e) => {
            // console.log(e, e.key)
            if (e.key === 'Enter') {
              if (inputValue === '') {
                return
              }
              const newObj = {
                id: +new Date(),
                text: inputValue,
                completed: false,
                edit: false,
              }
              const newTodos = [newObj, ...todos]
              setTodos(newTodos)
              setInputValue('')
            }
          }}
        />
        <button
          className="addTodoBtn"
          onClick={() => {
            if (inputValue === '') return
            const newObj = {
              id: +new Date(),
              text: inputValue,
              completed: false,
              edit: false,
            }
            const newTodos = [newObj, ...todos]
            setTodos(newTodos)
            setInputValue('')
          }}
        >
          +
        </button>
      </div>
    </>
  )
}

export default AddInput
