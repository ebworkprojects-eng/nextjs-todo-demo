'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface Todo {
  id: string
  title: string
  completed: boolean
  date: string // ISO date string (YYYY-MM-DD)
  createdAt: number
}

interface TodoContextType {
  todos: Todo[]
  addTodo: (title: string, date: string) => void
  removeTodo: (id: string) => void
  toggleTodo: (id: string) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
      } catch {
        setTodos([])
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isHydrated])

  const addTodo = (title: string, date: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      date,
      createdAt: Date.now(),
    }
    setTodos([...todos, newTodo])
  }

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider')
  }
  return context
}
