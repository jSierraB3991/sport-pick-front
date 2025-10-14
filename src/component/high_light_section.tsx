import React, { type JSX } from "react";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "./ui/scroll_area";

const matchHighlights = [
    {
        leftTeamLogo: "/image-5.png",
        rightTeamLogo: "/image-6.png",
        scoreLeft: "2",
        scoreRight: "0",
        time: "38",
        period: "1st Half",
    },
    {
        leftTeamLogo: "/image-1.png",
        rightTeamLogo: "/image-2.png",
        scoreLeft: "0",
        scoreRight: "1",
        time: "42",
        period: "1st Half",
    },
    {
        leftTeamLogo: "/image-3.png",
        rightTeamLogo: "/image-4.png",
        scoreLeft: "1",
        scoreRight: "1",
        time: "56",
        period: "2nd Half",
    },
    {
        leftTeamLogo: "/image-115.png",
        rightTeamLogo: "/image-116.png",
        scoreLeft: "3",
        scoreRight: "1",
        time: "86",
        period: "2nd Half",
    },
];

export const HighlightsSection = (): JSX.Element => {
    return (
        <ScrollArea className="w-full">
            <div className="flex gap-0">
                {matchHighlights.map((match, index) => (
                    <article
                        key={index}
                        className="relative min-w-[180px] h-[85px] rounded-2xl overflow-hidden"
                    >
                        <Card className="absolute top-0 left-2 w-[164px] h-[73px] rounded-2xl shadow-[0px_5px_12px_#c4c9d433] border-0">
                            <CardContent className="p-0 relative w-full h-full">
                                <div
                                    className="absolute top-[17px] left-5 w-9 h-9 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${match.leftTeamLogo})`,
                                    }}
                                />

                                <div
                                    className="absolute top-[17px] left-[124px] w-9 h-9 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${match.rightTeamLogo})`,
                                    }}
                                />

                                <div className="absolute top-[23px] left-[58px] w-[30px] [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                    {match.scoreLeft}
                                </div>

                                <div className="absolute top-[23px] left-[88px] text-black text-xl w-1 [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-center tracking-[0] leading-[normal]">
                                    :
                                </div>

                                <div className="absolute top-[23px] left-[92px] w-[30px] [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black text-xl text-center tracking-[0] leading-[normal]">
                                    {match.scoreRight}
                                </div>

                                <div className="absolute top-[52px] left-[58px] w-16 h-3.5 flex">
                                    <div className="w-[18px] flex">
                                        <div className="w-4 h-3.5 ml-px [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[#ed1c24] text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                            {match.time}
                                        </div>
                                    </div>

                                    <div className="w-1 flex">
                                        <div className="h-3.5 text-[#ed1c24] text-xs whitespace-nowrap w-1 [font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-center tracking-[0] leading-[normal]">
                                            &apos;
                                        </div>
                                    </div>

                                    <div className="w-[42px] flex">
                                        <div className="w-[38px] h-3.5 ml-1 [font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#ed1c24] text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                            {match.period}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </article>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
export default HighlightsSection;
