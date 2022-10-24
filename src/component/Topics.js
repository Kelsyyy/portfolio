import React from 'react'
import { useState, useEffect } from 'react'
import firebase from '../utils/firebase'
import 'firebase/compat/firestore'
import { List, ListItem } from 'semantic-ui-react'

function Topics() {
  const [topics, setTopics] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection('topics')
      .get()
      .then((collectionSnapshot) => {
        // 取的docs為陣列
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data()
        })
        setTopics(data)
      })
  }, [])

  return (
    <>
      <List animated selection>
        {topics.map((topic) => {
          return <ListItem key={topic.name}>{topic.name}</ListItem>
        })}
      </List>
    </>
  )
}

export default Topics
