import { type JSX } from "react";

import { Button } from "./ui/button";
import { ScrollBar } from "./ui/scroll_area";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const navigationItems = [
    {
        label: "Live",
        icon: "/image-14.png",
        isImage: true,
    },
    {
        label: "Sports",
        icon: "/carbon-trophy.svg",
        isImage: false,
    },
    {
        label: "Casino",
        icon: "/image-9.png",
        isImage: false,
    },
    {
        label: "Live Casino",
        icon: "/image-11.png",
        isImage: true,
    },
    {
        label: "Promotions",
        icon: "/fluent-gift-24-regular.svg",
        isImage: false,
    },
];

export const BetSlipSection = (): JSX.Element => {
    return (
        <ScrollArea className="w-full">
            <nav className="flex items-start gap-3 px-4 py-0">
                {navigationItems.map((item, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="flex-shrink-0 w-[76px] h-[70px] p-0 bg-white rounded-2xl border border-solid shadow-DD hover:bg-gray-50 transition-colors"
                    >
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                            <img
                                className={`${
                                    item.isImage
                                        ? "w-8 h-8 object-cover"
                                        : "w-8 h-8"
                                } mb-1`}
                                alt={item.label}
                                src={item.icon}
                            />
                            <span className="h-3.5 flex items-center justify-center [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#16181c] text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                {item.label}
                            </span>
                        </div>
                    </Button>
                ))}
            </nav>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
export default BetSlipSection;
