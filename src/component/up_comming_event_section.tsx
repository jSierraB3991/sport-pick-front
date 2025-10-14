import type { JSX } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const eventsData = [
    {
        league: "Champions League, Group B",
        leagueIcon: "/united-nations-1-1.png",
        date: "08.10",
        time: "11:45",
        team1: "Porto",
        team2: "Liverpool FC",
        odds: ["3.74", "2.10", "4.75"],
    },
    {
        league: "Super Lig",
        leagueIcon: "/turkey-1.png",
        date: "08.10",
        time: "16:45",
        team1: "Galatasaray",
        team2: "Besiktas",
        odds: ["1.35", "2.80", "6.25"],
    },
    {
        league: "Premier Lig",
        leagueIcon: "/england-1.svg",
        date: "08.10",
        time: "19:45",
        team1: "Chelsea FC",
        team2: "Manchester United",
        odds: ["1.60", "2.05", "1.75"],
    },
    {
        league: "Premier League 19/20",
        leagueIcon: "/england-1.svg",
        date: "09.10",
        time: "16:30",
        team1: "Crystal Palace",
        team2: "Manchester City",
        odds: ["3.35", "2.80", "2.15"],
    },
    {
        league: "Club Friendly Games",
        leagueIcon: "/united-nations-1-1.png",
        date: "09.10",
        time: "22:00",
        team1: "Torpedo Belaz Zhodino",
        team2: "Slutsksakhar Slutsk",
        odds: ["2.25", "4.80", "3.40"],
    },
];

export const UpcomingEventsSection = (): JSX.Element => {
    return (
        <section className="flex flex-col gap-1.5 w-full bg-[#e2e4e8] border border-solid border-[#d5d7dc]">
            {eventsData.map((event, index) => (
                <Card
                    key={index}
                    className="w-full border-0 rounded-none shadow-none"
                >
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <img
                                    src={event.leagueIcon}
                                    alt={event.league}
                                    className="w-4 h-4 object-cover"
                                />
                                <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#797d85] text-sm tracking-[0] leading-5">
                                    {event.league}
                                </span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#0fab60] text-sm text-right tracking-[0] leading-[19px]">
                                    {event.date} /
                                </span>
                                <span className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[#0fab60] text-sm text-right leading-[19px] tracking-[0]">
                                    {event.time}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-[4px]">
                                <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#16181c] text-base tracking-[0.32px] leading-[19px]">
                                    {event.team1}
                                </span>
                                <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#16181c] text-base tracking-[0.32px] leading-[19px]">
                                    {event.team2}
                                </span>
                            </div>

                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    className="h-auto flex-1 min-w-[54px] bg-[#e8e9ec] rounded-[10px] px-3 py-2 hover:bg-[#d8d9dc] flex flex-col items-center justify-center gap-0"
                                >
                                    <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#797d85] text-[10px] text-center tracking-[0] leading-[18px]">
                                        1
                                    </span>
                                    <span className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#16181c] text-[15px] text-center tracking-[0] leading-5">
                                        {event.odds[0]}
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="h-auto flex-1 min-w-[54px] bg-[#e8e9ec] rounded-[10px] px-3 py-2 hover:bg-[#d8d9dc] flex flex-col items-center justify-center gap-0"
                                >
                                    <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#797d85] text-[10px] text-center tracking-[0] leading-[18px]">
                                        X
                                    </span>
                                    <span className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#16181c] text-[15px] text-center tracking-[0] leading-5">
                                        {event.odds[1]}
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="h-auto flex-1 min-w-[54px] bg-[#e8e9ec] rounded-[10px] px-3 py-2 hover:bg-[#d8d9dc] flex flex-col items-center justify-center gap-0"
                                >
                                    <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#797d85] text-[10px] text-center tracking-[0] leading-[18px]">
                                        2
                                    </span>
                                    <span className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#16181c] text-[15px] text-center tracking-[0] leading-5">
                                        {event.odds[2]}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
};
