import "./App.css"
import type { Card, Column } from "./types"

const sampleColumns: Column[] = [
  {id: "column 1", title: "To Do"},
  {id: "column 2", title: "In progress"},
  {id: "column 3", title: "Done"}
]

const sampleCards: Card[] = [
  { id: "card-1", columnId: "column 1", title: "Design the board layout" },
  { id: "card-2", columnId: "column 1", title: "Set up the server", priority: "high" },
  { id: "card-3", columnId: "column 2", title: "Build the Card component", assignee: "Robert" },
  { id: "card-4", columnId: "column 3", title: "Create the React project" },
]

function App() {
  return (
    <div className="app">
      <h1>Realtime Kanban</h1>
      <div className="board">
        {sampleColumns.map((column) => (
          <div key={column.id} className="column">
            <h2>{column.title}</h2>
            {sampleCards
              .filter((card) => card.columnId === column.id)
              .map((card) => (
                <div key={card.id} className="card">
                  {card.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
