export type Priority = 'low' | 'medium' | 'high'

export type Card = {
    id: string
    columnId: string
    title: string
    description?: string
    assignee?: string
    dueDate?: string
    priority?: Priority
}

export type Column = {
    id: string
    title: string
}