"use client";

import { useState } from "react";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import History from "@/images/icons/history.png";
import historyConfig from "@/data/history.json";
import { Button } from "../ui/button";

interface HistoryOption {
  value: string;
  label: string;
}

interface HistoryDataItem {
  id: number;
  date: string;
  amount: string;
  fee: string;
  receive: string;
  withdrawTo: string;
  status:
    | "COMPLETED"
    | "PENDING"
    | "CANCELLED"
    | "PROCESSING"
    | "APPROVED"
    | "REJECTED";
}

interface HistoryConfig {
  historyOptions: HistoryOption[];
  historyData: {
    [key: string]: HistoryDataItem[];
  };
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = (status: string): string => {
    const statusUpper = status?.toUpperCase();

    switch (statusUpper) {
      case "COMPLETED":
      case "SUCCESS":
        return "text-green-400";
      case "PENDING":
      case "PROCESSING":
        return "text-yellow-400";
      case "CANCELLED":
      case "FAILED":
      case "REJECTED":
        return "text-red-400";
      case "APPROVED":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 sm:px-2.5 rounded-full text-xs font-medium duration-200 ${getStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};

type HistoryData = HistoryDataItem;

const { historyOptions, historyData } = historyConfig as HistoryConfig;

const getTableHeaders = () => {
  return [
    "Date",
    "Amount(USDT)",
    "Fee(USDT)",
    "Receive(USDT)",
    "Withdraw To",
    "Status",
  ];
};

export default function HistoryPage() {
  const [selectedHistory, setSelectedHistory] = useState("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const currentHistoryData = historyData[selectedHistory] || [];
  const totalPages = Math.ceil(currentHistoryData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = currentHistoryData.slice(startIndex, endIndex);

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, 4);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2
        );
      }
    }

    return pages;
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowClick = (row: HistoryData): void => {
    console.log("Row clicked:", row);
  };

  const handleHistoryChange = (value: string) => {
    setSelectedHistory(value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-full space-y-3 sm:space-y-4 px-2 sm:px-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold flex items-baseline gap-2 md:gap-4">
              History
              <Image
                src={History}
                alt="History"
                width={18}
                height={18}
                className="object-contain sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] lg:w-[30px] lg:h-[30px]"
              />
            </h1>
          </div>
        </div>

        <Separator className="bg-[#989898] h-px mb-2 sm:mb-3 md:mb-5" />

        {/* History Type */}
        <div className="flex justify-center items-center mb-6">
          <Select value={selectedHistory} onValueChange={handleHistoryChange}>
            <SelectTrigger className="w-full max-w-md bg-white text-[#9058FE] cursor-pointer">
              <SelectValue placeholder="Select History" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {historyOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-[#9058FE] hover:bg-violet-100 focus:bg-[#9058FE] focus:text-white cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {selectedHistory !== "default" && currentHistoryData.length > 0 && (
          <div className="w-full space-y-3 sm:space-y-4">
            <div className="block lg:hidden space-y-3">
              {currentData.map((row, index) => (
                <div
                  key={`${selectedHistory}-${row.id}-${index}`}
                  className="rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-lg p-4 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #343967 0%, #263450 100%)",
                  }}
                  onClick={() => handleRowClick(row)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-white text-sm font-medium">
                        {row.date.split(" ")[0]}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {row.date.split(" ")[1]}
                      </div>
                    </div>
                    <StatusBadge status={row.status} />
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs">Amount:</span>
                      <span className="text-white text-sm font-medium">
                        {row.amount} USDT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs">Fee:</span>
                      <span className="text-white text-sm font-medium">
                        {row.fee} USDT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs">Receive:</span>
                      <span className="text-white text-sm font-medium">
                        {row.receive} USDT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-xs">
                        Withdraw To:
                      </span>
                      <span className="text-white text-sm text-right flex-1 ml-2 truncate">
                        {row.withdrawTo}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {totalPages > 1 && (
                <div
                  className="rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-lg p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, #343967 0%, #263450 100%)",
                  }}
                >
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
                    {getPageNumbers().map((page) => (
                      <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 !rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                          page === currentPage
                            ? "!bg-gradient-to-r from-[#9058FE] to-[#563598] !text-white shadow-lg transform scale-105"
                            : "bg-transparent border-2 border-[#9058FE] !text-gray-300 hover:!text-white"
                        }`}
                      >
                        {page}
                      </Button>
                    ))}

                    {currentPage < totalPages && (
                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-8 h-8 sm:w-10 sm:h-10 !rounded-full bg-transparent border-2 border-[#9058FE] text-gray-300 hover:bg-gray-500/60 hover:text-white transition-all duration-200 flex items-center justify-center ml-1 cursor-pointer"
                      >
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <div
                className="rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #343967 0%, #263450 100%)",
                }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="relative">
                        {getTableHeaders().map((header, index) => (
                          <th
                            key={index}
                            className={`text-white text-sm lg:text-base xl:text-lg font-semibold py-3 lg:py-4 px-3 lg:px-6 ${
                              index === 0 ? "text-left" : "text-center"
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((row, index) => (
                        <tr
                          key={`${selectedHistory}-${row.id}-${index}`}
                          className="hover:bg-slate-700/20 cursor-pointer transition-colors relative"
                          onClick={() => handleRowClick(row)}
                        >
                          <td className="text-white text-sm lg:text-base py-3 lg:py-4 px-3 lg:px-6">
                            <div className="space-y-1">
                              <div className="text-white text-sm lg:text-base">
                                {row.date.split(" ")[0]}
                              </div>
                              <div className="text-gray-400 text-xs">
                                {row.date.split(" ")[1]}
                              </div>
                            </div>
                          </td>
                          <td className="text-white text-sm lg:text-base py-3 lg:py-4 px-3 lg:px-6 text-center">
                            <div className="text-white text-sm lg:text-base font-medium">
                              {row.amount} USDT
                            </div>
                          </td>
                          <td className="text-white text-sm lg:text-base py-3 lg:py-4 px-3 lg:px-6 text-center">
                            <div className="text-white text-sm lg:text-base font-medium">
                              {row.fee} USDT
                            </div>
                          </td>
                          <td className="text-white text-sm lg:text-base py-3 lg:py-4 px-3 lg:px-6 text-center">
                            <div className="text-white text-sm lg:text-base font-medium">
                              {row.receive} USDT
                            </div>
                          </td>
                          <td className="text-white text-sm lg:text-base py-3 lg:py-4 px-3 lg:px-6 text-center">
                            <div className="text-white text-sm lg:text-base truncate max-w-[150px]">
                              {row.withdrawTo}
                            </div>
                          </td>
                          <td className="py-3 lg:py-4 px-3 lg:px-6 text-center">
                            <StatusBadge status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col items-center justify-center p-3 lg:p-6 space-y-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
                      {getPageNumbers().map((page) => (
                        <Button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 !rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                            page === currentPage
                              ? "!bg-gradient-to-r from-[#9058FE] to-[#563598] !text-white shadow-lg transform scale-105"
                              : "bg-transparent border-2 border-[#9058FE] !text-gray-300 hover:!text-white"
                          }`}
                        >
                          {page}
                        </Button>
                      ))}

                      {currentPage < totalPages && (
                        <Button
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 !rounded-full bg-transparent border-2 border-[#9058FE] text-gray-300 hover:bg-gray-500/60 hover:text-white transition-all duration-200 flex items-center justify-center ml-1 cursor-pointer"
                        >
                          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
