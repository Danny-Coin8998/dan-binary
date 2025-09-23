"use client";

import { useState } from "react";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail } from "lucide-react";

import Setting from "@/images/icons/setting.png";
import Avatar from "@/images/icons/avatar.png";

export default function SettingPage() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Somchai Jaidee",
    email: "somchai888@gmail.com",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    newPassword: "",
    retypePassword: "",
  });

  const handlePersonalInfoUpdate = () => {
    console.log("Updating personal info:", personalInfo);
  };

  const handlePasswordUpdate = () => {
    console.log("Updating password");
  };

  return (
    <>
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold flex items-baseline gap-2 sm:gap-3 md:gap-4">
          Setting
          <Image
            src={Setting}
            alt="Setting"
            width={24}
            height={24}
            className="object-contain w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] xl:w-[28px] xl:h-[28px]"
          />
        </h1>
      </div>

      <Separator className="bg-[#989898] h-px mb-4 sm:mb-6 md:mb-8" />

      {/* Main Container - ทุกอย่างอยู่ในกรอบเดียว */}
      <div className="dashboard-gradient rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl">
        
        {/* Avatar Section - อยู่ด้านบนซ้ายของกรอบ */}
        <div className="flex items-center mb-8 sm:mb-10 md:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full border-2 md:border-3 lg:border-4 border-blue-200 bg-white p-1 shadow-lg mr-4 sm:mr-6">
            <Image
              src={Avatar}
              alt="Avatar"
              width={144}
              height={144}
              className="object-contain rounded-full w-full h-full"
            />
          </div>
          <div className="text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-1">
              {personalInfo.fullName}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
              {personalInfo.email}
            </p>
          </div>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 justify-items-center max-w-6xl mx-auto mb-6 sm:mb-8">
          
          {/* Personal Information */}
          <div className="bg-white/73 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <h3 className="text-[#3C01AF] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-5 md:mb-6 lg:mb-8">
              Personal Information
            </h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
              <div>
                <label className="block text-[#222222] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-2 md:py-3 bg-white/54 border border-[#696969] rounded-full text-[#454545] text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent pl-8 sm:pl-9 md:pl-10"
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-[#222222] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-2 md:py-3 bg-white/54 border border-[#696969] rounded-full text-[#454545] text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent pl-8 sm:pl-9 md:pl-10"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex justify-center pt-2 sm:pt-3 md:pt-4">
                <Button
                  onClick={handlePersonalInfoUpdate}
                  className="w-24 sm:w-28 md:w-32 bg-[#9058FE] text-white py-2 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-xs sm:text-sm md:text-base cursor-pointer"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white/73 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <h3 className="text-[#3C01AF] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-5 md:mb-6 lg:mb-8">
              Change password
            </h3>

            <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
              <div>
                <label className="block text-[#222222] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  value={passwordInfo.newPassword}
                  onChange={(e) =>
                    setPasswordInfo({
                      ...passwordInfo,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-2 md:py-3 bg-white/54 border border-[#696969] rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent text-sm sm:text-base md:text-lg"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-[#222222] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                  Retype Password
                </label>
                <Input
                  type="password"
                  value={passwordInfo.retypePassword}
                  onChange={(e) =>
                    setPasswordInfo({
                      ...passwordInfo,
                      retypePassword: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-2 md:py-3 bg-white/54 border border-[#696969] rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent text-sm sm:text-base md:text-lg"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-center pt-2 sm:pt-3 md:pt-4">
                <Button
                  onClick={handlePasswordUpdate}
                  className="w-24 sm:w-28 md:w-32 bg-[#9058FE] text-white py-2 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-xs sm:text-sm md:text-base cursor-pointer"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Date - อยู่ด้านล่างของกรอบ */}
        <div className="text-center text-[#B1B1B1] text-xs sm:text-sm md:text-base lg:text-lg border-t border-gray-300/20 pt-4 sm:pt-6">
          Registration Date : 2025-04-18 10:11:47
        </div>
      </div>
    </>
  );
}