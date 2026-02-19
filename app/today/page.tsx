'use client'

import { useTodos } from '@/context/todo-context'
import { AddTodoForm } from '@/components/add-todo-form'
import { TodoList } from '@/components/todo-list'
import { Nav } from '@/components/nav'

export default function TodayPage() {
  const { todos } = useTodos()

  const today = new Date().toISOString().split('T')[0]
  const todayTodos = todos.filter(todo => todo.date === today)

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Today's Tasks</h2>
          <p className="text-gray-600">
            {todayTodos.length} {todayTodos.length === 1 ? 'task' : 'tasks'} for today
          </p>
        </div>

        <AddTodoForm defaultDate={today} />
        <TodoList todos={todayTodos} />
      </main>
    </div>
  )
}
