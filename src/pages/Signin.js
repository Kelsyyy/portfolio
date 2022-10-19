/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Form, Container } from 'semantic-ui-react'
import 'firebase/compat/auth'
import firebase from '../utils/firebase'

const container = css`
  margin: 5rem auto;
  max-width: 600px;
  padding: 1rem;
  border: 10px;
`
const errorMeg = css`
  margin: 0.5rem;
  color: red;
`

function Signin() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('register')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setErrorMessage('')
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
  }
  const onSubmit = () => {
    setIsLoading(true)
    if (activeItem === 'register') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(loginUser.email, loginUser.password)
        .then(() => {
          navigate('/')
          setIsLoading(false)
          alert('註冊成功')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-aready-in-use':
              setErrorMessage('信箱已存在')
              break
            case 'auth/invalid-email':
              setErrorMessage('信箱格式不正確')
              break
            case 'auth/weak-password':
              setErrorMessage('請輸入最少6位數密碼')
              break
            default:
              break
          }
        })
    } else if (activeItem === 'singin') {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginUser.email, loginUser.password)
        .then(() => {
          navigate('/')
          setIsLoading(false)
          alert('登入成功')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              setErrorMessage('信箱格式不正確')
              break
            case 'auth/user-not-found':
              setErrorMessage('信箱不存在')
              break
            case 'auth/wrong-password':
              setErrorMessage('密碼錯誤')
              break
            default:
              break
          }
          setIsLoading(false)
        })
    }
  }

  return (
    <>
      <div css={container}>
        <Menu widths="2">
          <Menu.Item
            active={activeItem === 'register'}
            onClick={() => {
              setErrorMessage('')
              setActiveItem('register')
            }}
          >
            註冊
          </Menu.Item>
          <Menu.Item
            active={activeItem === 'singin'}
            onClick={() => {
              setErrorMessage('')
              setActiveItem('singin')
            }}
          >
            登入
          </Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
          <Form.Input
            label="信箱"
            type="email"
            name="email"
            placeholder="請輸入email"
            value={loginUser.email}
            onChange={handleChange}
          ></Form.Input>
          <Form.Input
            label="密碼"
            type="password"
            name="password"
            placeholder="請輸入密碼"
            value={loginUser.password}
            onChange={handleChange}
          ></Form.Input>
          {errorMessage && <div css={errorMeg}>{errorMessage}</div>}
          <Form.Button loading={isLoading}>
            {activeItem === 'register' && '註冊'}
            {activeItem === 'singin' && '登入'}
          </Form.Button>
        </Form>
      </div>
    </>
  )
}

export default Signin
