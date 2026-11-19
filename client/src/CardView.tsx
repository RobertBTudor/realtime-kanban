import type {Card} from "./types"
import { formatDate } from "./formatDate"

type CardViewProps = {
    card: Card
    isSelected: boolean
    onSelect: () => void
    onDelete: () => void
}

function CardView({card, isSelected, onSelect, onDelete}: CardViewProps) {
    return (
        <div
            className={isSelected ? "card card-selected" : "card"}
            draggable
            onDragStart={(event) => event.dataTransfer.setData("text/plain", card.id)}
            onClick={(event) => {
                event.stopPropagation()
                onSelect()
            }}
        >
            <button
                className="card-delete"
                onClick={(event) => {
                    event.stopPropagation()
                    onDelete()
                }}
                aria-label="Delete card"
            >
                ✕
            </button>
            {card.priority && <span className={`tag tag-${card.priority}`}>{card.priority}</span>}
            <div className="card-title">{card.title}</div>
            {card.description && <div className="card-description">{card.description}</div>}
            {(card.assignee || card.dueDate) && (
                <div className="card-meta">
                    <span>{card.assignee}</span>
                    {card.dueDate && <span>Due {formatDate(card.dueDate)}</span>}
                </div>
            )}
        </div>
    )
}

export default CardView