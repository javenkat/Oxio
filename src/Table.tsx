import { useEffect, useState } from "react"
import { useData } from "./DataContext"
import "./Table.css"
import { Todo } from './Todo'

const Table = () => {

    const { todos, columns } = useData()

    const [sortConfig, setSortConfig] = useState<{ key: keyof Todo; direction: 'ascending' | 'descending' } | null>(null)
    const [sortedData, setSortedData] = useState<Todo[]>([])

    useEffect(() => {
        setSortedData(todos)
    }, [todos])

    const sortHandler = (col: keyof Todo) => {
        //alert("did")
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === col && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
    
        setSortConfig({ key: col, direction });
    
        const sortedArray = [...todos].sort((a, b) => {
          if (a[col] < b[col]) {
            return direction === 'ascending' ? -1 : 1;
          }
          if (a[col] > b[col]) {
            return direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
    
        setSortedData(sortedArray);
      }

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} onClick = {() => sortHandler(col as keyof Todo)}>
                            {col}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {columns.map((col, colIdx) => (
                                <td key={colIdx}>
                                    {typeof row[col as keyof Todo] === 'boolean' ? (row[col as keyof Todo] ? 'True' : 'False') : row[col as keyof Todo]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table