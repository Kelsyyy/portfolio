import React, { useState } from 'react'

function EditTodoContent({
  filterTodoList,
  completeHandler,
  edit,
  setEdit,
  deleteHandler,
  todos,
}) {
  const [editInputValue, setEditInputValue] = useState()
  return (
    <>
      {filterTodoList.map((todos) => {
        return (
          <div className="todoContent" key={todos.id}>
            <div className="todoContentText">
              <input
                className="checkBox"
                type="checkbox"
                checked={todos.completed}
                onChange={() => completeHandler(todos.id)}
              />
              {todos.completed ? (
                <i className="lineThtough">{todos.text}</i>
              ) : (
                todos.text
              )}
            </div>
            <div>
              {edit ? (
                <button className="btn edit" onClick={() => setEdit(false)}>
                  儲存
                </button>
              ) : (
                <button className="btn edit" onClick={() => setEdit(true)}>
                  修改
                </button>
              )}
              <button
                className="btn deleteBtn"
                onClick={() => deleteHandler(todos.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default EditTodoContent
