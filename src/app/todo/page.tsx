import { DetectSpeech } from "@/components/DetectSpeech"
import { fetchTodos } from "@/services/fetchTodos"
import { Fragment } from "react"

export default async function TodoPage() {
    const todos = await fetchTodos()

    return (
        <DetectSpeech>
            <div className="bg-black text-white min-h-screen p-4">
                <div className="text-4xl">Todos</div>
                <div className="grid grid-cols-2">
                    {todos && todos.map(todo => (
                        <Fragment key={todo.id}>
                            <div className="border border-white bg-gray-200 rounded-2xl p-4 m-2">
                                <h2 className="text-black text-xl font-semibold">{todo.title}</h2>
                                <p className="text-black text-sm">
                                    Completed: {todo.completed ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </DetectSpeech>
    )
}