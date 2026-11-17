import { useEffect, useState } from "react"
import type { SubmitEvent } from "react"
import "./App.css"
import type { Card, Column, Priority } from "./types"
import CardView from "./CardView"
import EditCardPanel from "./EditCardPanel"
import { formatDate } from "./formatDate"
import { socket } from "./socket"

const sampleColumns: Column[] = [
  {id: "column 1", title: "To Do"},
  {id: "column 2", title: "In progress"},
  {id: "column 3", title: "Done"}
]

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newColumnId, setNewColumnId] = useState(sampleColumns[0].id)
  const [newPriority, setNewPriority] = useState<Priority | "">("")
  const [newDescription, setNewDescription] = useState("")
  const [newAssignee, setNewAssignee] = useState("")
  const [newDueDate, setNewDueDate] = useState("")
  const [editingCardId, setEditingCardId] = useState<string | null>(null)

  const editingCard = cards.find((card) => card.id === editingCardId)

  useEffect(() => {
    socket.on("cards", setCards)

    return () => {
      socket.off("cards", setCards)
    }
  }, [])

  function moveCard(cardId: string, toColumnId: string) {
    socket.emit("card:move", cardId, toColumnId)
  }

  function deleteCard(cardId: string) {
    socket.emit("card:delete", cardId)
  }

  function updateCard(updatedCard: Card) {
    socket.emit("card:update", updatedCard)
  }

  function addCard(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const title = newTitle.trim()
    if (!title) return

    const newCard: Card = {
      id: crypto.randomUUID(),
      columnId: newColumnId,
      title,
      priority: newPriority || undefined,
      description: newDescription.trim() || undefined,
      assignee: newAssignee.trim() || undefined,
      dueDate: newDueDate || undefined,
    }

    socket.emit("card:add", newCard)
    setNewTitle("")
    setNewPriority("")
    setNewDescription("")
    setNewAssignee("")
    setNewDueDate("")
  }

  return (
    <div className="app">
      <h1>Realtime Kanban</h1>

      <div className="workspace">
        {editingCard ? (
          <EditCardPanel
            key={editingCard.id}
            card={editingCard}
            onUpdate={updateCard}
            onClose={() => setEditingCardId(null)}
          />
        ) : (
          <form className="add-card-form" onSubmit={addCard}>
            <h2>New card</h2>
            <div className="card card-preview">
              {newPriority && (
                <span className={`tag tag-${newPriority}`}>{newPriority}</span>
              )}
              <div className="card-title">{newTitle.trim() || "Your card title"}</div>
              {newDescription.trim() && (
                <div className="card-description">{newDescription}</div>
              )}
              {(newAssignee.trim() || newDueDate) && (
                <div className="card-meta">
                  <span>{newAssignee}</span>
                  {newDueDate && <span>Due {formatDate(newDueDate)}</span>}
                </div>
              )}
            </div>

            <label>
              Title
              <input
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="New card title..."
              />
            </label>

            <label>
              Description
              <textarea
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
                rows={3}
              />
            </label>

            <label>
              Assignee
              <input
                value={newAssignee}
                onChange={(event) => setNewAssignee(event.target.value)}
              />
            </label>

            <label>
              Due date
              <input
                type="date"
                value={newDueDate}
                onChange={(event) => setNewDueDate(event.target.value)}
              />
            </label>

            <label>
              Column
              <select
                value={newColumnId}
                onChange={(event) => setNewColumnId(event.target.value)}
              >
                {sampleColumns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Priority
              <select
                value={newPriority}
                onChange={(event) => setNewPriority(event.target.value as Priority | "")}
              >
                <option value="">No priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <button type="submit">Add</button>
          </form>
        )}

        <div className="board">
          {sampleColumns.map((column) => (
            <div
              key={column.id}
              className="column"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => moveCard(event.dataTransfer.getData("text/plain"), column.id)}
            >
              <h2>{column.title}</h2>
              {cards
                .filter((card) => card.columnId === column.id)
                .map((card) => (
                  <CardView
                    key={card.id}
                    card={card}
                    isSelected={card.id === editingCardId}
                    onSelect={() => setEditingCardId(card.id)}
                    onDelete={() => deleteCard(card.id)}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
