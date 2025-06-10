export async function fetchCta() {
    const response = await fetch('http://localhost:3000/api/cta')
    if (!response.ok) throw new Error('Failed to fetch CTA data');
    const cta = await response.json() as TrainArrivalData
    return cta
}