import { DetectSpeech } from "@/components/DetectSpeech"
import { fetchTodos } from "@/services/fetchTodos"
import { Span } from "next/dist/trace"
import { Fragment } from "react"

export default async function TodoPage() {
    const todos = await fetchTodos()

    return (
        <DetectSpeech>
            <div className="bg-black text-white min-h-screen p-4">
                <div className="text-4xl">Todos</div>
                <div className="grid grid-cols-3 mt-8">
                    {todos && todos.slice(0, 24).map(todo => (
                        <Fragment key={todo.id}>
                            <div className="border border-white rounded-2xl p-4 m-2">
                                <h2 className="text-xl font-semibold">{todo.title}</h2>
                                <p className="text-sm">
                                    Completed: {todo.completed ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}
                                </p>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </DetectSpeech>
    )
}