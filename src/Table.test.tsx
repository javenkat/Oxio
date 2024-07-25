import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DataProvider } from './DataContext'
import Table from './Table'

describe('Table', () => {

  test('sorts data by id', () => {
    const { getByText } = render(
      <DataProvider>
        <Table />
      </DataProvider>
    )

    fireEvent.click(getByText('id'))

    expect(getByText('id')).toBeInTheDocument()
  })
})
