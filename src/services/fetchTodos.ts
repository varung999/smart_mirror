import { TodoType } from "@/types/todo";

export async function fetchTodos() {
    const response = await fetch('http://localhost:3000/api/todo')
    if (!response.ok) throw new Error('Failed to fetch todos');
    const todos = await response.json()
    const modifiedTodos = todos.map((todo: { completed: number; }) => ({
        ...todo,
        completed: todo.completed === 1
    })) as TodoType[]
    return modifiedTodos
}