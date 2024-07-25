import React, { useEffect, useState } from 'react'
import { useData } from './DataContext'
import { Todo } from './Todo'

const Form = () => {

  const { todos, addTodo } = useData()

  const getNextId = () => {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1
  }

  const [todo, setTodo] = useState<Todo>({
    userId: 1,
    id: getNextId(),
    title: '',
    completed: false,
  })

  useEffect(() => {
    setTodo(prevTodo => ({
      ...prevTodo,
      id: getNextId(),
    }));
  }, [todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: type === 'checkbox' ? 
        (e.target as HTMLInputElement).checked : 
            type === 'number' ? 
                parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTodo(todo)
    alert(`Successfully added`)
    setTodo({ userId: 1, id: getNextId(), title: '', completed: false })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">User ID: </label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={todo.userId}
          onChange={handleChange}
          required
          min={1}
        />
      </div>
      <div>
        <label htmlFor="id">Todo ID: </label>
        <input
          type="number"
          id="id"
          name="id"
          value={todo.id}
          onChange={handleChange}
          required
          disabled
        />
      </div>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={todo.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="completed">Completed: </label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={todo.completed}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default Form
