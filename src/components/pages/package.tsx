"use client";

import { SetStateAction, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import PackageIcon from "@/images/icons/package.png";
import SelectPackage from "@/images/choose package.png";
import Dollar from "@/images/icons/dollar.png";
import packageConfig from "@/data/packages.json";

interface PackageItem {
  id: number;
  amount: number;
  profit: string;
  bgColor: string;
  textColor: string;
  amountColor: string;
  selected?: boolean;
}

interface AccountItem {
  id: string;
  label: string;
  value: string;
  color: string;
}

interface PackageConfig {
  packages: PackageItem[];
  accounts: AccountItem[];
}

const { packages, accounts } = packageConfig as PackageConfig;

export default function PackagePage() {
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState("account-balance");

  const handleAccountSelect = (accountId: SetStateAction<string>) => {
    setSelectedAccount(accountId);
    console.log("Selected account:", accountId);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < packages.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleInvest = () => {
    const selectedPkg = packages[selectedPackage];
    alert(`Investing ${selectedPkg.amount} USDT`);
  };

  return (
    <>
      <div className="mb-4 md:mb-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
          Buy a package
          <Image
            src={PackageIcon}
            alt="Package"
            width={18}
            height={18}
            className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
          />
        </h1>
      </div>

      <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

      {/* Main Package */}
      <div className="dashboard-gradient rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-white text-xl sm:text-2xl md:text-5xl font-normal flex items-center justify-center gap-3">
            Select a package
            <Image
              src={SelectPackage}
              alt="Select Package"
              width={55}
              height={55}
              className="object-contain sm:w-[35px] sm:h-[35px] md:w-[55px] md:h-[55px]"
            />
          </h2>
        </div>
        <Separator className="bg-[#ffffff] h-px mb-3 md:mb-5" />

        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-white/80 hover:bg-white/30 text-white border-none p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft
                style={{ width: "35px", height: "35px" }}
                className="text-black"
              />
            </Button>

            {/* Package Cards */}
            <div className="flex gap-3 sm:gap-5 md:gap-6 flex-1 justify-center max-w-2xl sm:max-w-3xl md:max-w-5xl">
              {packages
                .slice(currentIndex, currentIndex + 3)
                .map((pkg, index) => (
                  <div key={pkg.id} className="relative">
                    <div
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`${
                        pkg.bgColor
                      } rounded-2xl p-5 sm:p-6 md:p-8 cursor-pointer transition-all duration-300 hover:scale-105 min-w-[110px] sm:min-w-[150px] md:min-w-[180px] flex-1 max-w-[150px] sm:max-w-[180px] md:max-w-[250px] relative overflow-hidden border-6 h-32 sm:h-36 md:h-40 ${
                        selectedPackage === pkg.id
                          ? "shadow-lg scale-105 pb-8"
                          : "border-gray-200"
                      }`}
                      style={{
                        borderColor:
                          selectedPackage === pkg.id
                            ? "#9058FE"
                            : pkg.amount === 300
                            ? "#FECA58"
                            : undefined,
                      }}
                    >
                      {/* Popular ribbon for 300 USDT */}
                      {/* {pkg.amount === 300 && (
                        <div className="absolute -top-2 -left-2 w-28 h-6 bg-gradient-to-r from-orange-400 to-orange-500 transform rotate-[-45deg] origin-center">
                          <div className="flex items-center justify-center h-full">
                            <span className="text-white text-[10px] font-bold">
                              Popular
                            </span>
                          </div>
                        </div>
                      )} */}

                      {/* Content */}
                      <div className="text-center">
                        <div
                          className={`${pkg.amountColor} text-lg sm:text-xl md:text-4xl font-bold mb-1 sm:mb-2`}
                        >
                          {pkg.amount} USDT
                        </div>
                        <div
                          className={`${pkg.textColor} text-xs sm:text-sm md:text-lg opacity-80`}
                        >
                          ({pkg.profit})
                        </div>
                      </div>
                    </div>

                    {selectedPackage === pkg.id && (
                      <div
                        className="absolute bottom-0 left-0 right-0 text-center py-1"
                        style={{
                          backgroundColor: "#9058FE",
                          marginTop: "-1px",
                        }}
                      >
                        <span className="text-white text-xs font-medium">
                          Selected
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex >= packages.length - 3}
              className="bg-white/80 hover:bg-white/30 text-white border-none p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center cursor-pointer"
            >
              <ChevronRight style={{ width: "35px", height: "35px" }} />
            </Button>
          </div>
        </div>

        {/* Invest by */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white text-lg sm:text-3xl font-medium flex items-center gap-2 md:gap-2">
              Invest by
              <Image
                src={Dollar}
                alt="Dollar"
                width={20}
                height={20}
                className="object-contain sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
              />
            </h3>
          </div>
          <Separator className="bg-[#ffffff] h-px mb-3 md:mb-5" />

          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="account-selection"
                  id={account.id}
                  checked={selectedAccount === account.id}
                  className={`w-3 h-3 appearance-none rounded-full cursor-pointer relative ${
                    selectedAccount === account.id
                      ? "border-2 border-white"
                      : "border-0"
                  }`}
                  style={{
                    backgroundColor: account.color,
                  }}
                  onChange={() => handleAccountSelect(account.id)}
                />
                <label
                  htmlFor={account.id}
                  className="text-white font-medium cursor-pointer flex-1 flex items-center gap-2"
                >
                  {account.label}
                  <span className="text-white/70">{account.value}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Invest Button */}
        <div className="flex justify-start">
          <Button
            onClick={handleInvest}
            className="bg-[#9058FE] text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-medium rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{
              boxShadow: "3px 0px 4px 0px #00000040",
            }}
          >
            Invest
          </Button>
        </div>
      </div>
    </>
  );
}
