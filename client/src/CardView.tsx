import type {Card} from "./types"

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
            onClick={onSelect}
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
            {card.assignee && <div className="card-assignee">{card.assignee}</div>}
        </div>
    )
}

export default CardView