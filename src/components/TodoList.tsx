'use client'
import { useUserStore } from '@/zustand/store'
import React, { useEffect } from 'react'

export default function TodoList() {
  const { fetchUserData, users, sendUserToApi, removeUserFromApi } =
    useUserStore()

  const handleAddUser = () => {
    sendUserToApi({
      id: 5,
      name: 'name 5',
    })
  }

  useEffect(() => {
    fetchUserData('https://649704c183d4c69925a353d4.mockapi.io/todo')
  }, [fetchUserData])

  return (
    <div>
      <pre
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {users.map((item) => (
          <>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            >
              <span key={item.id}>{item.name}</span>

              <button onClick={() => removeUserFromApi(item.id)}>delete</button>
            </div>
          </>
        ))}

        <button onClick={() => handleAddUser()}>add user</button>
      </pre>
    </div>
  )
}
