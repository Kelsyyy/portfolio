import React from 'react'
import { useState, useEffect } from 'react'
import { Menu, Search } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'
import 'firebase/compat/auth'
import firebase from '../utils/firebase'

function Header() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    // 監聽目前使用者登入登出狀態
    firebase.auth().onAuthStateChanged((currenUser) => {
      setUser(currenUser)
    })
  }, [user])
  return (
    <>
      <Menu>
        <Menu.Item as={Link} to="/">
          Portfolio
        </Menu.Item>
        <Menu.Item>
          <Search />
        </Menu.Item>
        <Menu.Menu />
        <Menu.Item as={Link} to="/">
          About Me
        </Menu.Item>
        <Menu.Item as={Link} to="/todolist">
          Todo List
        </Menu.Item>
        <Menu.Item as={Link} to="/weather">
          Weather
        </Menu.Item>
        <Menu.Menu />
        <Menu.Menu position="right" />
        {user ? (
          <>
            <Menu.Item as={Link} to="/new-post">
              持續增加作品中
            </Menu.Item>
            <Menu.Item as={Link} to="/member">
              會員
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/signin"
              onClick={() => {
                firebase.auth().signOut()
              }}
            >
              登出
            </Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/signin">
            註冊/登入
          </Menu.Item>
        )}

        <Menu.Menu />
      </Menu>
      {/* <header></header> */}
    </>
  )
}

export default Header
