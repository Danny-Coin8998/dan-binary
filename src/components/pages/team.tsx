"use client";

import { useState } from "react";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";

import Team from "@/images/icons/team.png";

export default function TeamPage() {
  return (
    <>
      <div className="mb-4 md:mb-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
          My Team
          <Image
            src={Team}
            alt="Team"
            width={18}
            height={18}
            className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
          />
        </h1>
      </div>

      <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />
    </>
  );
}
