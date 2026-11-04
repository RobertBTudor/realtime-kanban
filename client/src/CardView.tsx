import type {Card} from "./types"

type CardViewProps = {
    card: Card
}

function CardView({card}: CardViewProps) {
    return (
        <div className = "card">    
            <div className="card-title">{card.title}</div>
        </div>
    )
}

export default CardView