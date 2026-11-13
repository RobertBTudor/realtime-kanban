import { Server } from "socket.io"
import type { Card } from "./types"

const io = new Server(3001, {
  cors: { origin: "http://localhost:5173" },
})

let cards: Card[] = [
  { id: "card-1", columnId: "column 1", title: "Design the board layout", priority: "low" },
  { id: "card-2", columnId: "column 1", title: "Set up the server", priority: "high" },
  { id: "card-3", columnId: "column 2", title: "Build the Card component", priority: "medium" },
  { id: "card-4", columnId: "column 3", title: "Create the React project" },
]

io.on("connection", (socket) => {
  console.log("Browser connected:", socket.id)
  socket.emit("cards", cards)
})


console.log("Server running on port 3001")
