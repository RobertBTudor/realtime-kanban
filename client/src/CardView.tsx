import type {Card} from "./types"

type CardViewProps = {
    card: Card
}

function CardView({card}: CardViewProps) {
    return (
        <div className="card">
            {card.priority && <span className={`tag tag-${card.priority}`}>{card.priority}</span>}
            <div className="card-title">{card.title}</div>
            {card.assignee && <div className="card-assignee">{card.assignee}</div>}
        </div>
    )
}

export default CardView