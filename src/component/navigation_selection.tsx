import type { JSX } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const navigationTabs = [
    { value: "highlights", label: "Highlights" },
    { value: "upcoming", label: "Upcoming" },
];

export const NavigationSection = (): JSX.Element => {
    return (
        <nav className="w-full">
            <Tabs defaultValue="highlights" className="w-full">
                <TabsList className="w-full h-auto p-0 bg-transparent grid grid-cols-2 gap-0 rounded-none">
                    {navigationTabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="relative flex flex-col items-center justify-center flex-1 h-auto p-0 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            <div className="flex h-[50px] items-center justify-center px-2 w-full">
                                <span className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-xl text-center tracking-[0] leading-[22px] data-[state=active]:text-[#0c49be] text-[#7f8084]">
                                    {tab.label}
                                </span>
                            </div>
                            <div className="w-full h-[3px] data-[state=active]:bg-[#0c49be] bg-[#e3e5e8] data-[state=active]:rounded-[0px_90px_90px_0px]" />
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </nav>
    );
};
export default NavigationSection;
