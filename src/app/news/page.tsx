import { DetectSpeech } from "@/components/DetectSpeech";
import { fetchNews } from "@/services/fetchNews";
import Image from "next/image"

export default async function NewsPage() {
    const news = await fetchNews()

    return (
        <DetectSpeech>
            <div className="bg-black text-white h-screen w-full p-4">
                <label className="text-white font-thin text-5xl">News</label>
                <div className="grid grid-cols-4 gap-4 mt-8">
                    {news.articles.slice(5).map(article => (
                        <div key={article.url} className="relative border border-white rounded-xl">
                            {article.urlToImage ? (
                                <Image
                                    src={article.urlToImage}
                                    alt={article.title}
                                    width={600}
                                    height={600}
                                    className="rounded-t-xl rounded-b-2xl"
                                />
                            ) : null}
                            <div className="absolute bottom-0 inset-x-0 bg-black rounded-b-xl p-1 text-center">
                                <div>{article.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DetectSpeech>
    )
}