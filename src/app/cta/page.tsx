import { DetectSpeech } from "@/components/DetectSpeech";
import { fetchCta } from "@/services/fetchCta";
import { Fragment } from "react";

export default async function CtaPage() {
    const cta = await fetchCta()

    return (
        <DetectSpeech>
            <div className="bg-black text-white min-h-screen w-full p-4">
                <div className="text-4xl pb-8">CTA Jackson Schedule</div>
                <div className="grid grid-cols-3 gap-4">
                    <div>Destination</div>
                    <div>Next Station</div>
                    <div>Arrival Time</div>
                    {cta.ctatt.eta.map((eta, i) => (
                        <Fragment key={i}>
                            <div>{eta.destNm}</div>
                            <div>{eta.staNm}</div>
                            <div>{eta.arrT}</div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </DetectSpeech>
    )
}