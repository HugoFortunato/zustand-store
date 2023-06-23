import axios from 'axios'
import { create } from 'zustand'

type UserTypes = {
  id: number
  name: string
}

type UserState = {
  users: UserTypes[]
  addUser: (user: UserTypes) => void
  fetchUserData: (baseUrl: string) => void
  sendUserToApi: (user: UserTypes) => void
  editUserName: (userId: number, newName: string) => void
  removeUserFromApi: (userId: number) => void
}

const baseUrl = 'https://649704c183d4c69925a353d4.mockapi.io/todo'

export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUserData: async (baseUrl: string) => {
    const response = await axios.get(baseUrl)
    set({ users: await response.data })
  },
  addUser: (user: UserTypes) =>
    set((state) => ({ users: [...state.users, user] })),
  editUserName: (userId: number, newName: string) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, name: newName } : user,
      ),
    })),

  sendUserToApi: async (user: UserTypes) => {
    const response = await axios.post(baseUrl, user)
    set((state) => ({ users: [...state.users, response.data] }))
  },
  removeUserFromApi: async (userId: number) => {
    await axios.delete(`${baseUrl}/${userId}`)

    set((state) => ({
      ...state.users,
      users: state.users.filter((existingUser) => existingUser.id !== userId),
    }))
  },
}))
