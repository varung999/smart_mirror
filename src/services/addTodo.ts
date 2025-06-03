export async function addTodo() {
    const response = await fetch('http://localhost:3000/api/todo/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Todo' }),
    });

    if (!response.ok) throw new Error('Failed to add todo');

    const todo = await response.json();
    return todo;
}