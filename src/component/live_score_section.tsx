import { ScrollArea } from "@radix-ui/react-scroll-area";
import type { JSX } from "react";
import { Button } from "./ui/button";
import { ScrollBar } from "./ui/scroll_area";

const sportsCategories = [
    {
        id: "soccer",
        name: "Soccer",
        icon: "/icon-soccer.svg",
        isActive: true,
    },
    {
        id: "basketball",
        name: "Basketball",
        icon: "/icon-basketball.svg",
        isActive: false,
    },
    {
        id: "tennis",
        name: "Tennis",
        icon: "/icon-tennis.svg",
        isActive: false,
    },
    {
        id: "volleyball",
        name: "Volleyball",
        icon: "/icon-volleyball.svg",
        isActive: false,
    },
    {
        id: "cricket",
        name: "Cricket",
        icon: "/icon-cricket2.svg",
        isActive: false,
    },
    {
        id: "handball",
        name: "Handball",
        icon: "/icon-handball.svg",
        isActive: false,
    },
];

export const LiveScoresSection = (): JSX.Element => {
    return (
        <ScrollArea className="w-full">
            <div className="flex items-center gap-2 pb-2">
                {sportsCategories.map((sport) => (
                    <Button
                        key={sport.id}
                        variant={sport.isActive ? "default" : "outline"}
                        className={`h-auto flex-shrink-0 rounded-[90px] px-3 py-3 ${
                            sport.isActive
                                ? "bg-[#16181c] hover:bg-[#16181c]/90 border-0"
                                : "border-[#e2e4e8] hover:bg-accent"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <img
                                className="w-[18px] h-[18px]"
                                alt={`${sport.name} icon`}
                                src={sport.icon}
                            />
                            <span
                                className={`text-sm tracking-[0] leading-[22px] whitespace-nowrap ${
                                    sport.isActive
                                        ? "[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-white"
                                        : "[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#2d3138]"
                                }`}
                            >
                                {sport.name}
                            </span>
                        </div>
                    </Button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
