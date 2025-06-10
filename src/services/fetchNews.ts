export async function fetchNews() {
    const response = await fetch('http://localhost:3000/api/news')
    if (!response.ok) throw new Error('Failed to fetch news');
    const news = await response.json() as NewsResponse
    return news
}