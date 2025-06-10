type TrainArrivalData = {
    ctatt: {
        tmst: string;
        errCd: string;
        errNm: string | null;
        eta: CTA[];
    };
};

type CTA = {
    staId: string;
    stpId: string;
    staNm: string;
    stpDe: string;
    rn: string;
    rt: string;
    destSt: string;
    destNm: string;
    trDr: string;
    prdt: string;
    arrT: string;
    isApp: string;
    isSch: string;
    isDly: string;
    isFlt: string;
    flags: string | null;
    lat: string | null;
    lon: string | null;
    heading: string | null;
}