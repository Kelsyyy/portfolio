import React from 'react'

function FilterList({ tabList, list, setList }) {
  return (
    <>
      <div className="card cardList">
        <ul className="tab">
          {tabList.map((tabList, i) => {
            return (
              <li
                key={i}
                className={`${list === tabList ? 'active' : ''}`}
                onClick={() => {
                  setList(tabList)
                }}
              >
                {tabList}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default FilterList
