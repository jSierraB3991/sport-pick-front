import type { JSX } from "react";
import { Button } from "./ui/button";

export const SportsSelectionSection = (): JSX.Element => {
    return (
        <section className="relative w-full flex backdrop-blur-[35px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(35px)_brightness(100%)]">
            <div className="w-full pb-[23px] pt-[3px] px-0 relative">
                <div className="absolute bottom-[13px] left-[calc(50.00%_-_67px)] w-[133px] h-1.5 bg-light-ink rounded-[3px]" />

                <img
                    className="absolute top-16 right-[18px] w-[42px] h-[42px]"
                    alt="Mic"
                    src="/mic.svg"
                />

                <img
                    className="absolute top-16 left-[18px] w-[42px] h-[42px]"
                    alt="Emojis"
                    src="/emojis.svg"
                />

                <div className="flex gap-[3px] px-[3px]">
                    <Button
                        variant="secondary"
                        className="w-[87px] h-[43px] bg-light-secondary rounded-[5px] shadow-[0px_1px_0px_#0000004c] hover:bg-light-secondary/90"
                    >
                        <span className="mt-px h-5 [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-light-ink text-base text-center tracking-[-0.32px] leading-[normal]">
                            123
                        </span>
                    </Button>

                    <Button
                        variant="secondary"
                        className="flex-1 h-[43px] bg-light-primary rounded-[5px] shadow-[0px_1px_0px_#0000004c] hover:bg-light-primary/90"
                    >
                        <span className="mt-px h-5 [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-light-ink text-base text-center tracking-[-0.32px] leading-[normal]">
                            space
                        </span>
                    </Button>

                    <Button
                        variant="default"
                        className="w-[87px] h-[43px] bg-light-action rounded-[5px] shadow-[0px_1px_0px_#0000004c] hover:bg-light-action/90"
                    >
                        <span className="mt-px h-5 [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-dark-ink text-base text-center tracking-[-0.32px] leading-[normal]">
                            return
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
};
