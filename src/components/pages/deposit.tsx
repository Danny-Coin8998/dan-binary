"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Copy } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

import MoneyIcon from "@/images/icons/money.png";
import Bitcoin from "@/images/bitcoin.png";
import QR from "@/images/qr.png";
import { QRCode } from "@/components/ui/shadcn-io/qr-code";

export default function DepositPage() {
  const [transactionHash, setTransactionHash] = useState("");
  const walletAddress = "0x27D5C0d55e0c96e875a7f5a7A364f7805283D046";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const handlePasteHash = () => {
    navigator.clipboard.readText().then((text) => {
      setTransactionHash(text);
    });
  };

  const handleConfirmDeposit = () => {
    if (!transactionHash) {
      alert("Please enter your transaction hash");
      return;
    }
    console.log("Transaction Hash:", transactionHash);
    alert("Deposit confirmed!");
  };

  return (
    <>
      <div className="mb-4 md:mb-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
          Deposit
          <Image
            src={MoneyIcon}
            alt="Deposit"
            width={18}
            height={18}
            className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
          />
        </h1>
      </div>

      <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
        Coming Soon
      </h1>

      {/* <div className="dashboard-gradient rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
        <div className="mb-6 md:mb-8">
          <div className="rounded-lg p-3 sm:p-4 mb-4 relative bg-white/71 shadow-[3px_0px_4px_0px_rgba(70,70,70,0.25)]">
            <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-3 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden flex items-center justify-center">
              <Image
                src={Bitcoin}
                alt="Bitcoin Logo"
                width={45}
                height={45}
                className="object-contain sm:w-[55px] sm:h-[55px]"
              />
            </div>

            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-black font-medium mb-3 md:mb-4 text-sm sm:text-base">
                Please send USDT BEP20 Token (Binance Smart Chain) to
              </h2>
              <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

              <div className="relative">
                <Input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="bg-white border-none text-[#585858] font-mono text-xs sm:text-sm md:text-base focus-visible:ring-0 pr-16 sm:pr-20 md:pr-24 rounded-3xl"
                />
                <Button
                  onClick={handleCopyAddress}
                  className="absolute right-0 top-0 bottom-0 bg-[#9058FE] text-white px-2 sm:px-3 md:px-4 font-medium text-xs sm:text-sm rounded-l-none rounded-r-3xl cursor-pointer"
                >
                  <span className="hidden sm:inline">Copy</span>
                  <Copy className="fill-white w-4 h-4 sm:ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="rounded-lg p-3 sm:p-4 mb-4 relative bg-white/71 shadow-[3px_0px_4px_0px_rgba(70,70,70,0.25)]">
            <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-3 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden flex items-center justify-center">
              <Image
                src={QR}
                alt="QR Code"
                width={45}
                height={45}
                className="object-contain sm:w-[55px] sm:h-[55px]"
              />
            </div>

            <div className="px-4 sm:px-6">
              <h2 className="text-slate-800 font-medium mb-3 md:mb-4 text-sm sm:text-base">
                or scan QR code to pay
              </h2>
              <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />
              <div className="p-2 sm:p-4 flex justify-center">
                <div
                  className="bg-white/71 p-4 sm:p-6 md:p-8 rounded-3xl"
                  style={{ boxShadow: "3px 0px 4px 0px #46464640" }}
                >
                  <QRCode
                    data="https://example.com"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded"
                    foreground="#000000"
                    background="#ffffff"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="rounded-lg p-3 sm:p-4 mb-4 relative bg-white/71 shadow-[3px_0px_4px_0px_rgba(70,70,70,0.25)]">
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-black font-medium mb-3 md:mb-4 text-sm sm:text-base">
                Confirm your deposit by paste your Transaction Hash
              </h2>
              <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

              <div className="relative">
                <Input
                  type="text"
                  value="Confirm your deposit by paste your Transaction Hash"
                  readOnly
                  className="bg-white border-none text-[#585858] font-mono text-xs sm:text-sm md:text-base focus-visible:ring-0 pr-16 sm:pr-20 md:pr-24 rounded-3xl"
                />
                <Button
                  onClick={handlePasteHash}
                  className="absolute right-0 top-0 bottom-0 bg-[#9058FE] text-white px-2 sm:px-3 md:px-4 font-medium text-xs sm:text-sm rounded-l-none rounded-r-3xl cursor-pointer"
                >
                  <span className="hidden sm:inline">Paste</span>
                  <Copy className="fill-white w-4 h-4 sm:ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className="bg-[#9058FE] text-white py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-10 text-base sm:text-lg md:text-xl font-normal rounded-3xl border-0 shadow-lg w-full sm:w-auto cursor-pointer"
            style={{
              boxShadow: "3px 0px 4px 0px #00000040",
            }}
            onClick={handleConfirmDeposit}
          >
            Confirm Deposit
          </Button>
        </div>
      </div> */}
    </>
  );
}
