import React from 'react'

function Footer({ todos, clearStorage }) {
  const todosLength = todos.filter((todo) => {
    return todo.completed === false
  })
  return (
    <>
      <div className="footer">
        <div>{todosLength.length}個待完成事項</div>
        <button className=" btn clearBtn" onClick={clearStorage}>
          清除所有事項
        </button>
      </div>
    </>
  )
}

export default Footer
