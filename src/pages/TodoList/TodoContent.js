/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'

const editDelBtn = css`
  display: flex;
  align-items: center;
  color: #333;
`
function TodoContent({
  filterTodoList,
  setTodos,
  completeHandler,
  editValue,
  setEditValue,
  deleteHandler,
  editHandler,
  updateTodo,
  remind,
  setRemind,
}) {
  const onDragEnd = (result) => {
    // console.log(result)
    const { source, destination } = result
    // 如果目的地都沒變就跳出
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    // 製作新的 items
    const newItems = [...filterTodoList]

    // 把兩個索引的值對調，相當於 [a, b] = [b, a]
    ;[newItems[source.index], newItems[destination.index]] = [
      newItems[destination.index],
      newItems[source.index],
    ]

    // 設定新的 items
    setTodos(newItems)
  }
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="drop-id">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {filterTodoList.map((todos, i) => (
                <Draggable key={todos.id} draggableId={`${todos.id}`} index={i}>
                  {(provided) => (
                    <div
                      className="todoContent"
                      key={todos.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div className="todoContentText">
                        <input
                          className="checkBox"
                          type="checkbox"
                          checked={todos.completed}
                          onChange={() => completeHandler(todos.id)}
                        />
                        {todos.edit ? (
                          <input
                            className={remind ? 'remindInput' : 'editInput'}
                            type="text"
                            required
                            value={editValue}
                            onChange={(e) => {
                              setEditValue(e.target.value)
                              setRemind('')
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') updateTodo(todos.id)
                            }}
                          />
                        ) : todos.completed ? (
                          <i className="lineThtough">{todos.text} </i>
                        ) : (
                          todos.text
                        )}
                        {todos.edit ? (
                          remind ? (
                            <div className="remindText">{remind}</div>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                      </div>
                      <div css={editDelBtn}>
                        {todos.edit ? (
                          <button
                            className="btn saveBtn"
                            onClick={() => {
                              updateTodo(todos.id)
                            }}
                          >
                            儲存
                          </button>
                        ) : (
                          <button
                            className="btn editBtn"
                            onClick={() => editHandler(todos.id)}
                          >
                            修改
                          </button>
                        )}
                        <button
                          className="btn deleteBtn"
                          onClick={() => deleteHandler(todos.id)}
                        >
                          刪除
                        </button>
                        <FaEllipsisV />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default TodoContent
