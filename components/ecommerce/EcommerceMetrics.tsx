"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";

export const EcommerceMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image src={GroupIcon as string} alt={GroupIcon as string} />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Monthly Income (Rs.)
            </span>
            <h5 className="mt-2 font-bold text-gray-800 text-[25px] dark:text-white/90">
              240,000.00
            </h5>
          </div>
          <Badge color="success">
            <Image src={ArrowUpIcon as string} alt="" />
            1.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image src={BoxIconLine as string} alt="" className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Expenses
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-[25px] dark:text-white/90">
              Rs. 185,000.00
            </h4>
          </div>

          <Badge color="error">
            <Image src={ArrowDownIcon as string} alt="" className="text-green-500" />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
