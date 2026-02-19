'use client'

import { useTodos } from '@/context/todo-context'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface TodoListProps {
  todos: Array<{
    id: string
    title: string
    completed: boolean
    date: string
  }>
}

export function TodoList({ todos }: TodoListProps) {
  const { removeTodo, toggleTodo } = useTodos()

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-5 h-5 cursor-pointer rounded border-gray-300"
          />
          <span
            className={`flex-1 text-lg ${
              todo.completed
              
                ? 'line-through text-gray-400'
                : 'text-gray-900'
            }`}
          >
            {todo.title}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(todo.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeTodo(todo.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
