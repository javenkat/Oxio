import React, {useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useData } from './DataContext'

const COLORS = ['#00fe76', '#fe0009']

const Chart = () => {

  const { todos } = useData()

  //todos.map(todo => console.log(JSON.stringify(todo)))

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value ? Number(event.target.value) : null;
    setSelectedUserId(userId);
  };

  const filteredTodos = selectedUserId !== null
    ? todos.filter(todo => todo.userId === selectedUserId)
    : []

  const data = [
    { name: 'Done', value: filteredTodos.filter(todo => todo.completed).length },
    { name: 'Not Done', value: filteredTodos.filter(todo => !todo.completed).length },
  ]

  const uniqueUserIds = Array.from(new Set(todos.map(todo => todo.userId)))

  return (
    <div>
      <label htmlFor="userId">User ID: </label>
      <select id="userId" onChange={handleChange}>
        <option value=""></option>
        {uniqueUserIds.map(userId => (
          <option key={userId} value={userId}>{userId}</option>
        ))}
      </select>
      
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}

export default Chart
