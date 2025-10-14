import { MenuIcon } from "lucide-react";
import type { JSX } from "react";
import { Button } from "./ui/button";

export const PromotionsSection = (): JSX.Element => {
    return (
        <header className="w-full h-[50px] flex items-center justify-between px-4 py-[5px]">
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                <MenuIcon className="h-9 w-9" />
            </Button>

            <div className="[-webkit-text-stroke:1px_#ffffff] [font-family:'Sarina',Helvetica] font-normal text-transparent text-3xl tracking-[0] leading-[30px] whitespace-nowrap">
                <span className="text-[#16181c] leading-[0.1px]">bet</span>
                <span className="text-[#0c49be] leading-[0.1px]">co.</span>
            </div>

            <div className="flex items-start gap-1 h-10">
                <Button className="h-auto px-4 py-2.5 bg-[#17191c] hover:bg-[#17191c]/90 rounded-[90px] [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-white text-sm">
                    Register
                </Button>

                <Button className="h-auto px-4 py-2.5 bg-[#f7f7f8] hover:bg-[#f7f7f8]/90 text-[#17191c] rounded-[90px] [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-sm">
                    Login
                </Button>
            </div>
        </header>
    );
};
