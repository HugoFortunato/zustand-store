'use client'
import { useUserStore } from '@/zustand/store'
import React from 'react'

export default function NamePage() {
  const { user } = useUserStore()

  console.log(user)

  return <div>{user.name}</div>
}
