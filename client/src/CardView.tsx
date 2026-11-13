import type {Card} from "./types"

type CardViewProps = {
    card: Card
    onDelete: () => void
}

function CardView({card, onDelete}: CardViewProps) {
    return (
        <div
            className="card"
            draggable
            onDragStart={(event) => event.dataTransfer.setData("text/plain", card.id)}
        >
            <button className="card-delete" onClick={onDelete} aria-label="Delete card">
                ✕
            </button>
            {card.priority && <span className={`tag tag-${card.priority}`}>{card.priority}</span>}
            <div className="card-title">{card.title}</div>
            {card.assignee && <div className="card-assignee">{card.assignee}</div>}
        </div>
    )
}

export default CardView