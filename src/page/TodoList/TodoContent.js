import React from 'react'

function TodoContent({
  filterTodoList,
  completeHandler,
  editValue,
  setEditValue,
  deleteHandler,
  editHandler,
  updateTodo,
  remind,
  setRemind,
}) {
  return (
    <>
      {filterTodoList.map((todos) => {
        if (todos.edit) {
          return (
            <div className="todoContent" key={todos.id}>
              <div className="todoContentText" key={todos.id}>
                <input
                  className="checkBox"
                  type="checkbox"
                  checked={todos.completed}
                  onChange={() => completeHandler(todos.id)}
                />
                <input
                  className={remind ? 'remindInput' : 'editInput'}
                  type="text"
                  required
                  value={editValue}
                  onChange={(e) => {
                    setEditValue(e.target.value)
                    setRemind('')
                  }}
                />
                {remind ? <div className="remindText">{remind}</div> : ''}
              </div>

              <div>
                <button
                  className="btn editBtn"
                  onClick={() => {
                    updateTodo(todos.id)
                  }}
                >
                  儲存
                </button>
                <button
                  className="btn deleteBtn"
                  onClick={() => deleteHandler(todos.id)}
                >
                  刪除
                </button>
              </div>
            </div>
          )
        }
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
                <i className="lineThtough">{todos.text} </i>
              ) : (
                todos.text
              )}
            </div>
            <div>
              <button
                className="btn editBtn"
                onClick={() => editHandler(todos.id)}
              >
                修改
              </button>
              <button
                className="btn deleteBtn"
                onClick={() => deleteHandler(todos.id)}
              >
                刪除
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TodoContent
