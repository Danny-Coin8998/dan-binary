"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Copy } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

import MoneyIcon from "@/images/icons/money.png";

export default function ReferralPage() {
  const LeftLink = "https://danbinary.com/signup.php?ref=SQQFCV&side=left";
  const RightLink = "https://danbinary.com/signup.php?ref=SQQFCV&side=right";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(LeftLink);
  };

  return (
    <>
      <div className="mb-4 md:mb-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
          Referral Link
          <Image
            src={MoneyIcon}
            alt="Referral Link"
            width={18}
            height={18}
            className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
          />
        </h1>
      </div>

      <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

      <div className="dashboard-gradient rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
        <div className="mb-6 md:mb-8">
          <div className="rounded-lg p-3 sm:p-4 mb-4 relative bg-white/71 shadow-[3px_0px_4px_0px_rgba(70,70,70,0.25)]">
            <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-3 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden flex items-center justify-center" />

            <div className="px-4 sm:px-6 md:px-8 mb-4">
              <h2 className="text-black font-medium mb-3 md:mb-4 text-sm sm:text-base">
                Left Side
              </h2>
              <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

              <div className="relative">
                <Input
                  type="text"
                  value={LeftLink}
                  readOnly
                  className="bg-white border-none text-[#585858] font-mono text-xs sm:text-sm md:text-base focus-visible:ring-0 pr-16 sm:pr-20 md:pr-24 rounded-3xl"
                />
                <Button
                  onClick={handleCopyLink}
                  className="absolute right-0 top-0 bottom-0 bg-[#9058FE] text-white px-2 sm:px-3 md:px-4 font-medium text-xs sm:text-sm rounded-l-none rounded-r-3xl cursor-pointer"
                >
                  <span className="hidden sm:inline">Copy Link</span>
                  <Copy className="fill-white w-4 h-4 sm:ml-1" />
                </Button>
              </div>
            </div>
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-black font-medium mb-3 md:mb-4 text-sm sm:text-base">
                Right Side
              </h2>
              <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

              <div className="relative">
                <Input
                  type="text"
                  value={RightLink}
                  readOnly
                  className="bg-white border-none text-[#585858] font-mono text-xs sm:text-sm md:text-base focus-visible:ring-0 pr-16 sm:pr-20 md:pr-24 rounded-3xl"
                />
                <Button
                  onClick={handleCopyLink}
                  className="absolute right-0 top-0 bottom-0 bg-[#9058FE] text-white px-2 sm:px-3 md:px-4 font-medium text-xs sm:text-sm rounded-l-none rounded-r-3xl cursor-pointer"
                >
                  <span className="hidden sm:inline">Copy Link</span>
                  <Copy className="fill-white w-4 h-4 sm:ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
