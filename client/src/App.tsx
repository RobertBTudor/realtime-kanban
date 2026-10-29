import './App.css'
import type { Column } from './types'

const sampleColumns: Column[] = [
  {id: "column 1", title: "To Do"},
  {id: "column 2", title: "In progress"},
  {id: "column 3", title: "Done"}
]

function App() {
  return (
    <div className="app">
      <h1>Realtime Kanban</h1>
      {sampleColumns.map((column) => (<h2 key={column.id}>{column.title}</h2>))}
    </div>
  )
}

export default App
