import { Server } from "socket.io"
import { MongoClient } from "mongodb"
import type { Card } from "./types"

process.loadEnvFile()

const uri = process.env.MONGODB_URI
if (!uri) throw new Error("MONGODB_URI is missing from server/.env")

const client = new MongoClient(uri)
await client.connect()
console.log("Connected to MongoDB")

const cardsCollection = client.db("kanban").collection<Card>("cards")

const io = new Server(3001, {
  cors: { origin: "http://localhost:5173" },
})

const sampleCards: Card[] = [
  { id: "card-1", columnId: "column 1", title: "Design the board layout", priority: "low" },
  { id: "card-2", columnId: "column 1", title: "Set up the server", priority: "high" },
  { id: "card-3", columnId: "column 2", title: "Build the Card component", priority: "medium" },
  { id: "card-4", columnId: "column 3", title: "Create the React project" },
]

if ((await cardsCollection.countDocuments()) === 0) {
  await cardsCollection.insertMany(sampleCards)
  console.log("Database was empty, added sample cards")
}

let cards: Card[] = await cardsCollection
  .find({}, { projection: { _id: 0 } })
  .toArray()

io.on("connection", (socket) => {
  console.log("Browser connected:", socket.id)
  socket.emit("cards", cards)

  socket.on("card:move", async (cardId: string, toColumnId: string) => {
    await cardsCollection.updateOne({ id: cardId }, { $set: { columnId: toColumnId } })
    cards = cards.map((card) =>
      card.id === cardId ? { ...card, columnId: toColumnId } : card
    )
    io.emit("cards", cards)
  })

  socket.on("card:add", async (newCard: Card) => {
    await cardsCollection.insertOne({ ...newCard })
    cards = [...cards, newCard]
    io.emit("cards", cards)
  })

  socket.on("card:delete", async (cardId: string) => {
    await cardsCollection.deleteOne({ id: cardId })
    cards = cards.filter((card) => card.id !== cardId)
    io.emit("cards", cards)
  })

  socket.on("card:update", async (updatedCard: Card) => {
    await cardsCollection.replaceOne({ id: updatedCard.id }, updatedCard)
    cards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    )
    io.emit("cards", cards)
  })
})


console.log("Server running on port 3001")
