"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DashboardIcon from "@/images/icons/dashboard.png";
import { useDashboard } from "@/store/dashboard";
import { useEffect } from "react";

import Balance from "@/images/Account Balance.png";
import Invest from "@/images/Active Invest.png";
import Apr from "@/images/Total APR.png";
import { Separator } from "@radix-ui/react-separator";

export default function Dashboard() {
  const { data, isLoading, error, fetchDashboard } = useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <div className="mb-4 md:mb-6">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
            Dashboard
            <Image
              src={DashboardIcon}
              alt="Dashboard"
              width={18}
              height={18}
              className="object-contain md:w-[30px] md:h-[30px]"
            />
          </h1>
        </div>

        <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

        <div className="dashboard-gradient rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
          <div className="space-y-6 md:space-y-8 max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-white text-lg">
                Loading dashboard data...
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <div className="mb-4 md:mb-6">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
            Dashboard
            <Image
              src={DashboardIcon}
              alt="Dashboard"
              width={18}
              height={18}
              className="object-contain md:w-[30px] md:h-[30px]"
            />
          </h1>
        </div>

        <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

        <div className="dashboard-gradient rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
          <div className="space-y-6 md:space-y-8 max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-red-400 text-lg mb-4">
                Error loading dashboard data
              </div>
              <div className="text-white text-sm mb-4">{error}</div>
              <Button
                onClick={fetchDashboard}
                className="bg-[#9058FE] text-white px-6 py-2 rounded-lg"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // No data state
  if (!data) {
    return (
      <>
        <div className="mb-4 md:mb-6">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
            Dashboard
            <Image
              src={DashboardIcon}
              alt="Dashboard"
              width={18}
              height={18}
              className="object-contain md:w-[30px] md:h-[30px]"
            />
          </h1>
        </div>

        <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

        <div className="dashboard-gradient rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
          <div className="space-y-6 md:space-y-8 max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-white text-lg">No data available</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const { balances } = data;

  return (
    <>
      <div className="mb-4 md:mb-6">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
          Dashboard
          <Image
            src={DashboardIcon}
            alt="Dashboard"
            width={18}
            height={18}
            className="object-contain md:w-[30px] md:h-[30px]"
          />
        </h1>
      </div>

      <Separator className="bg-[#989898] h-px mb-3 md:mb-5" />

      <div className="dashboard-gradient rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
        <div className="space-y-6 md:space-y-8 max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Top Stats*/}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 place-items-center">
              <StatCard
                title="Account Balance"
                value={balances.account_balance.toFixed(2)}
                icon={
                  <Image
                    src={Balance}
                    alt="Wallet"
                    width={35}
                    height={35}
                    className="object-contain md:w-[50px] md:h-[50px]"
                  />
                }
              />
              <StatCard
                title="Active Invest"
                value={parseFloat(balances.total_investment_active).toFixed(2)}
                icon={
                  <Image
                    src={Invest}
                    alt="Investment"
                    width={35}
                    height={35}
                    className="object-contain md:w-[55px] md:h-[55px]"
                  />
                }
              />
              <StatCard
                title="Total APR"
                value={`${balances.earned_percentage.toFixed(2)}%`}
                className="sm:col-span-2 lg:col-span-1"
                icon={
                  <Image
                    src={Apr}
                    alt="APR"
                    width={35}
                    height={35}
                    className="object-contain md:w-[55px] md:h-[55px]"
                  />
                }
              />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-4">
              <MetricCard
                label="Total Deposits"
                value={balances.total_deposit.toFixed(2)}
              />
              <MetricCard
                label="Total Withdrawals"
                value={balances.total_withdraw.toFixed(2)}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-4">
              <MetricCard
                label="Total Invest"
                value={parseFloat(balances.total_investment).toFixed(2)}
              />
              <MetricCard
                label="Total Received Commission"
                value={parseFloat(balances.total_commission).toFixed(2)}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-4">
              <MetricCard
                label="Total Transferred In"
                value={balances.total_transfer_in.toFixed(2)}
              />
              <MetricCard
                label="Total Transferred Out"
                value={balances.total_transfer_out.toFixed(2)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
            <Button
              className="bg-[#9058FE] text-white py-4 md:py-6 text-lg md:text-xl font-normal rounded-lg border-0 shadow-lg w-full cursor-pointer"
              style={{
                boxShadow: "3px 0px 4px 0px #00000040",
              }}
            >
              Make Deposit
            </Button>
            <Button
              className="bg-[#9058FE] text-white py-4 md:py-6 text-lg md:text-xl font-normal rounded-lg border-0 shadow-lg w-full cursor-pointer"
              style={{
                boxShadow: "3px 0px 4px 0px #00000040",
              }}
            >
              Withdraw fund
            </Button>
            <Button
              className="bg-[#9058FE] text-white py-4 md:py-6 text-lg md:text-xl font-normal rounded-lg border-0 shadow-lg w-full cursor-pointer"
              style={{
                boxShadow: "3px 0px 4px 0px #00000040",
              }}
            >
              Transfer fund
            </Button>
            <Button
              className="bg-[#9058FE] text-white py-4 md:py-6 text-lg md:text-xl font-normal rounded-lg border-0 shadow-lg w-full cursor-pointer"
              style={{
                boxShadow: "3px 0px 4px 0px #00000040",
              }}
            >
              Setting
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
