import React from 'react'

import DataTable from 'react-data-table'

const App = () => {
  return <DataTable data={
    [
      {a: 1, b: 2, c: 3},
      {a: 4, b: 5, c: 6},
    ]
  } />
}

export default App
