import { useState } from "react"
import "./App.css"
import type { Card, Column } from "./types"
import CardView from "./CardView"

const sampleColumns: Column[] = [
  {id: "column 1", title: "To Do"},
  {id: "column 2", title: "In progress"},
  {id: "column 3", title: "Done"}
]

const sampleCards: Card[] = [
  { id: "card-1", columnId: "column 1", title: "Design the board layout", priority: "low" },
  { id: "card-2", columnId: "column 1", title: "Set up the server", priority: "high" },
  { id: "card-3", columnId: "column 2", title: "Build the Card component", assignee: "Robert", priority: "medium" },
  { id: "card-4", columnId: "column 3", title: "Create the React project" },
]

function App() {
  const [cards, setCards] = useState(sampleCards)
  const [newTitle, setNewTitle] = useState("")

  return (
    <div className="app">
      <h1>Realtime Kanban</h1>
      
      <form className="add-card-form">
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="New card title..."
        />
      </form>

      <div className="board">
        {sampleColumns.map((column) => (
          <div key={column.id} className="column">
            <h2>{column.title}</h2>
            {cards
              .filter((card) => card.columnId === column.id)
              .map((card) => (
                <CardView key = {card.id} card = {card} />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
