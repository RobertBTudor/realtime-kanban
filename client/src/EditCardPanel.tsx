import { useState } from "react"
import type { Card, Priority } from "./types"

type EditCardPanelProps = {
    card: Card
    onUpdate: (updatedCard: Card) => void
    onClose: () => void
}

function EditCardPanel({ card, onUpdate, onClose }: EditCardPanelProps) {
    const [title, setTitle] = useState(card.title)
    const [description, setDescription] = useState(card.description ?? "")
    const [assignee, setAssignee] = useState(card.assignee ?? "")

    function saveTitle() {
        const trimmed = title.trim()
        if (!trimmed) {
            setTitle(card.title)
            return
        }
        if (trimmed !== card.title) onUpdate({ ...card, title: trimmed })
    }

    function saveDescription() {
        const trimmed = description.trim()
        if (trimmed !== (card.description ?? "")) {
            onUpdate({ ...card, description: trimmed || undefined })
        }
    }

    function saveAssignee() {
        const trimmed = assignee.trim()
        if (trimmed !== (card.assignee ?? "")) {
            onUpdate({ ...card, assignee: trimmed || undefined })
        }
    }

    return (
        <div className="add-card-form" onClick={(event) => event.stopPropagation()}>
            <h2>Edit card</h2>
            <div className="card card-preview">
                {card.priority && <span className={`tag tag-${card.priority}`}>{card.priority}</span>}
                <div className="card-title">{title.trim() || card.title}</div>
            </div>

            <label>
                Title
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    onBlur={saveTitle}
                />
            </label>

            <label>
                Description
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    onBlur={saveDescription}
                    rows={4}
                />
            </label>

            <label>
                Assignee
                <input
                    value={assignee}
                    onChange={(event) => setAssignee(event.target.value)}
                    onBlur={saveAssignee}
                />
            </label>

            <label>
                Due date
                <input
                    type="date"
                    value={card.dueDate ?? ""}
                    onChange={(event) => onUpdate({ ...card, dueDate: event.target.value || undefined })}
                />
            </label>

            <label>
                Priority
                <select
                    value={card.priority ?? ""}
                    onChange={(event) =>
                        onUpdate({ ...card, priority: (event.target.value as Priority) || undefined })
                    }
                >
                    <option value="">No priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>

            <button type="button" onClick={onClose}>Done</button>
        </div>
    )
}

export default EditCardPanel
