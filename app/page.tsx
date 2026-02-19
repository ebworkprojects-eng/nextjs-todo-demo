'use client'

import { useTodos } from '@/context/todo-context'
import { AddTodoForm } from '@/components/add-todo-form'
import { TodoList } from '@/components/todo-list'
import { Nav } from '@/components/nav'

export default function Home() {
  const { todos } = useTodos()

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Tasks</h2>
          <p className="text-gray-600">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
          </p>
        </div>

        <AddTodoForm />
        <TodoList todos={todos} />
      </main>
    </div>
  )
}
