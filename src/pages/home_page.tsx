import { type JSX } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PromotionsSection } from "../component/promotion_section";
import { SportsSelectionSection } from "../component/sport_selection_section";
import { UpcomingEventsSection } from "../component/up_comming_event_section";
import { LiveScoresSection } from "../component/live_score_section";
import NavigationSection from "../component/navigation_selection";
import SearchSection from "../component/search_section";
import FeaturedBetsSection from "../component/feature_bet_section";
import HighlightsSection from "../component/high_light_section";
import BetSlipSection from "../component/bet_slip_section";

const casinoGames = [
    {
        src: "/1564046268324-fireflyfrenzy-png-300x300-1.png",
        alt: "Element",
    },
    {
        src: "/1560693489649-bonanza-mgm-300x300-1.png",
        alt: "Element",
    },
    {
        src: "/megamoolah-mgm-300x300-1.png",
        alt: "Megamoolah MGM",
    },
    {
        src: "/rectangle-34.svg",
        alt: "Rectangle",
    },
    {
        src: "/rectangle-35.svg",
        alt: "Rectangle",
    },
    {
        src: "/rectangle-33.svg",
        alt: "Rectangle",
    },
];

const liveCasinoGames = [
    {
        src: "/1564046268324-fireflyfrenzy-png-300x300-2.png",
        alt: "Element",
    },
    {
        src: "/1560693489649-bonanza-mgm-300x300-2.png",
        alt: "Element",
    },
    {
        src: "/megamoolah-mgm-300x300-2.png",
        alt: "Megamoolah MGM",
    },
    {
        src: "/rectangle-44.svg",
        alt: "Rectangle",
    },
    {
        src: "/rectangle-45.svg",
        alt: "Rectangle",
    },
    {
        src: "/rectangle-41.svg",
        alt: "Rectangle",
    },
];

export const HomePage = (): JSX.Element => {
    return (
        <div className="bg-white overflow-hidden w-full min-w-[414px] relative">
            <header className="fixed top-0 left-[calc(50.00%_-_207px)] w-[414px] h-[34px] z-50">
                <img
                    className="w-full h-full"
                    alt="Status bar"
                    src="/status-bar.svg"
                />
            </header>

            <main className="pt-[34px] w-full">
                <section className="relative w-full">
                    <PromotionsSection />
                </section>

                <section className="relative w-full px-4 pt-[73px]">
                    <div className="w-full h-[46px] flex items-center bg-[#f6f7f8] rounded-[90px] border border-solid border-[#e3e5e8]">
                        <img
                            className="h-[22px] w-[22px] ml-[18px]"
                            alt="Akar icons search"
                            src="/akar-icons-search.svg"
                        />
                        <div className="flex items-center justify-center mt-px h-[19px] w-[51px] ml-[7px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#727b8c] text-base tracking-[0.32px] leading-[normal] whitespace-nowrap">
                            Search
                        </div>
                        <img
                            className="h-[22px] w-[22px] ml-[243px]"
                            alt="Fluent mic on"
                            src="/fluent-mic-on-16-filled.svg"
                        />
                    </div>
                </section>

                <section className="relative w-full">
                    <SportsSelectionSection />
                </section>

                <section className="relative w-full">
                    <FeaturedBetsSection />
                </section>

                <section className="relative w-full">
                    <HighlightsSection />
                </section>

                <section className="relative w-full">
                    <BetSlipSection />
                </section>

                <section className="relative w-full">
                    <UpcomingEventsSection />
                </section>

                <section className="relative w-full px-4 pt-8">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[#16181c] text-lg tracking-[0] leading-[22px]">
                            Casino
                        </h2>
                        <span className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#aaafba] text-lg tracking-[0] leading-[22px]">
                            Popular Games
                        </span>
                    </div>
                    <ScrollArea className="w-full">
                        <div className="flex gap-3 pb-4">
                            {casinoGames.map((game, index) => (
                                <img
                                    key={`casino-game-${index}`}
                                    className="w-[76px] h-[76px] rounded-2xl object-cover flex-shrink-0"
                                    alt={game.alt}
                                    src={game.src}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </section>

                <section className="relative w-full px-4 pt-8">
                    <h2 className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[#16181c] text-lg tracking-[0] leading-[22px] mb-2">
                        Live Casino
                    </h2>
                    <ScrollArea className="w-full">
                        <div className="flex gap-3 pb-4">
                            {liveCasinoGames.map((game, index) => (
                                <img
                                    key={`live-casino-game-${index}`}
                                    className="w-[76px] h-[76px] rounded-2xl object-cover flex-shrink-0"
                                    alt={game.alt}
                                    src={game.src}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </section>

                <section className="relative w-full px-4 pt-8 pb-4 bg-[#e3e5e8]">
                    <div className="flex items-center justify-between py-2">
                        <h2 className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-[#16181c] text-lg tracking-[0] leading-[22px]">
                            Top League
                        </h2>
                    </div>
                    <img
                        className="w-full"
                        alt="Frame"
                        src="/frame-49180.svg"
                    />
                </section>

                <section className="relative w-full">
                    <LiveScoresSection />
                </section>

                <section className="relative w-full">
                    <NavigationSection />
                </section>

                <section className="relative w-full">
                    <SearchSection />
                </section>
            </main>
        </div>
    );
};

export default HomePage;
