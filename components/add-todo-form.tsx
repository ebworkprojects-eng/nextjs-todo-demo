'use client'

import { useState } from 'react'
import { useTodos } from '@/context/todo-context'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface AddTodoFormProps {
  defaultDate?: string
}

export function AddTodoForm({ defaultDate }: AddTodoFormProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(defaultDate || getToday())
  const { addTodo } = useTodos()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTodo(title.trim(), date)
      setTitle('')
      setDate(getToday())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
    </form>
  )
}

function getToday(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}
