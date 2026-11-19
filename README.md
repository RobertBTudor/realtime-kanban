# Realtime Kanban

A kanban board that syncs live across every open browser. Add, move, edit, or delete a card and everyone sees it instantly. Cards are saved in MongoDB.

## Features

- Live sync with Socket.io
- Drag-and-drop cards between columns
- Cards with title, description, assignee, due date, and priority
- Click a card to edit it; changes auto-save
- Connection and save-error banners

## Tech stack

React, TypeScript, Vite, Node.js, Socket.io, MongoDB Atlas

## Setup

Requires Node.js 22+ and a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster.

```bash
# Server
cd server
cp .env.example .env   # add your MongoDB connection string
npm install
npm run dev

# Client (in a second terminal)
cd client
npm install
npm run dev
```

Open http://localhost:5173.

## Structure

```
client/   React frontend
server/   Socket.io + MongoDB backend
```
