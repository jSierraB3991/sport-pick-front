import type { JSX } from "react";
import { Button } from "./ui/button";

export const SearchSection = (): JSX.Element => {
    const paymentLogos = [
        {
            src: "/image-112.png",
            alt: "Payment method 1",
            className: "w-28 h-7 object-cover",
        },
        {
            src: "/image-113.png",
            alt: "Payment method 2",
            className: "w-[164px] h-[21px]",
        },
        {
            src: "/image-114.png",
            alt: "Payment method 3",
            className: "w-7 h-7",
        },
    ];

    return (
        <footer className="relative w-full bg-[#16181c] py-6 px-4">
            <div className="flex flex-col items-center gap-6 max-w-[414px] mx-auto">
                <div className="w-full bg-[#2d3138] rounded-xl overflow-hidden h-[50px] flex items-center justify-between px-[13px]">
                    <div className="flex items-center gap-3">
                        <img
                            className="w-[26px] h-[26px] object-cover"
                            alt="Language flag"
                            src="/image-111.png"
                        />
                        <span className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-white text-base tracking-[0.32px] leading-[19px]">
                            English
                        </span>
                    </div>
                    <img
                        className="w-4 h-4"
                        alt="Sports icon"
                        src="/sports-icon.svg"
                    />
                </div>

                <p className="[font-family:'Roboto',Helvetica] font-normal text-[#93979e] text-sm text-center tracking-[0] leading-5 px-4">
                    We use cookies and third party cookies to improve our
                    services, analyse and personalise your preferences and to
                    show you advertisements. If you continue the navigation, we
                    consider that you are accepting its use.
                    <br />
                    <span className="leading-[30px]">Y</span>
                    ou can modify the settings and obtain further information in
                    our Cookie Policy.
                </p>

                <div className="[font-family:'Roboto',Helvetica] font-normal text-white text-base text-center tracking-[0] leading-[22px] flex gap-8">
                    <Button
                        variant="link"
                        className="h-auto p-0 text-white text-base font-normal [font-family:'Roboto',Helvetica]"
                    >
                        Payment methods
                    </Button>
                    <Button
                        variant="link"
                        className="h-auto p-0 text-white text-base font-normal [font-family:'Roboto',Helvetica]"
                    >
                        Terms &amp; conditions
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-6 w-full">
                    {paymentLogos.map((logo, index) => (
                        <img
                            key={index}
                            className={logo.className}
                            alt={logo.alt}
                            src={logo.src}
                        />
                    ))}
                </div>

                <div className="[-webkit-text-stroke:1px_#17191c] [font-family:'Sarina',Helvetica] font-normal text-[31px] text-center tracking-[0] leading-[normal]">
                    <span className="text-[#bcbcbc]">bet</span>
                    <span className="text-[#0c49be]">co.</span>
                </div>

                <img
                    className="w-[43px] h-12 object-cover"
                    alt="License"
                    src="/lisance-1.png"
                />

                <p className="font-body-regular-14px-22 font-[number:var(--body-regular-14px-22-font-weight)] text-white text-[length:var(--body-regular-14px-22-font-size)] text-center tracking-[var(--body-regular-14px-22-letter-spacing)] leading-[var(--body-regular-14px-22-line-height)] [font-style:var(--body-regular-14px-22-font-style)]">
                    Betco. © 2021 All rights reserved.
                </p>
            </div>
        </footer>
    );
};
export default SearchSection;
