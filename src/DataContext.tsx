import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Todo } from './Todo';

interface DataContextType {
  todos: Todo[]
  columns: string[]
  addTodo: (todo: Todo) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [columns, setColumns] = useState<string[]>([])

  useEffect(() => {

    const fetch = async () => {
      try {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        setTodos(response.data)
        setColumns(Object.keys(response.data[0]))
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetch()
  }, [])

  const addTodo = (newTodo: Todo) => {
    setTodos(prev => [...prev, newTodo])
  }

  return (
    <DataContext.Provider value={{ todos, columns, addTodo }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error("")
  return context
};

export default DataContext
