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
  } = useUserStore()

  const handleAddUser = () => {
    sendUserToApi({
      id: 5,
      name: 'name 5',
    })

    router.push('/name-page')
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
              <span
                key={item.id}
                onClick={() => editUserNameInObject(item.id, 'emanuel')}
              >
                {item.name}
              </span>
              <span
                key={item.id}
                onClick={() => editUserNameInArray(item.id, 'Hugo')}
              >
                {item.id}
              </span>

              <button onClick={() => removeUserFromApi(item.id)}>delete</button>
            </div>
          </>
        ))}

        <button onClick={() => handleAddUser()}>add user</button>
      </pre>
    </div>
  )
}
