'use client'
import { useUserStore } from '@/zustand/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function TodoList() {
  const router = useRouter()

  const {
    fetchUserData,
    users,
    sendUserToApi,
    removeUserFromApi,
    editUserNameInObject,
    editUserNameInArray,
    // addUserLocal,
  } = useUserStore()

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
              <span key={item.id} onClick={() => sendUserToApi(item)}>
                {item.name}
              </span>
              <span key={item.id}>{item.id}</span>

              <button onClick={() => editUserNameInObject(item.id, item.name)}>
                add in object
              </button>
              <button onClick={() => editUserNameInArray(item.id, 'Hugo')}>
                add in object in array
              </button>
              <button onClick={() => removeUserFromApi(item.id)}>delete</button>
            </div>
          </>
        ))}

        <button onClick={() => handleAddUser()}>add user</button>
        <button onClick={() => router.push('/name-page')}>next page</button>
      </pre>
    </div>
  )
}
