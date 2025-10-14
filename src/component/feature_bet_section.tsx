import { ArrowRightIcon } from "lucide-react";
import type { JSX } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export const FeaturedBetsSection = (): JSX.Element => {
    return (
        <section className="w-full px-0 py-0">
            <Card className="relative overflow-hidden border-0 rounded-none bg-[#0c49be] shadow-none">
                <CardContent className="relative p-0 h-[180px]">
                    <div className="absolute inset-0 flex">
                        <div className="flex-1 flex flex-col justify-center pl-4 pr-4 z-10">
                            <div className="space-y-1">
                                <div className="text-white text-xl leading-[30px] [font-family:'SF_Pro_Display-Regular',Helvetica] font-normal">
                                    Up To $50
                                </div>
                                <div className="text-white text-[22px] leading-[30px] [font-family:'SF_Pro_Display-Regular',Helvetica] font-normal">
                                    Free Matched Bet
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                className="mt-4 w-fit h-auto p-0 text-[#ffffff80] hover:bg-transparent hover:text-white [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[15px] leading-7"
                            >
                                <ArrowRightIcon className="w-4 h-4 mr-2" />
                                Bet Now
                            </Button>
                        </div>

                        <div className="relative flex-1 flex items-center justify-end">
                            <img
                                className="absolute right-0 top-0 h-full w-auto object-contain"
                                alt="American football player"
                                src="/american-football-sport-png-images-free-download-cool-nfl-player.png"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default FeaturedBetsSection;
