"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

type TxType = "income" | "expense" | "transfer";

interface TxAccount {
  _id?: string;
  name?: string;
  balance?: number;
  currency?: string;
}
interface TxCategory {
  _id?: string;
  name?: string;
  type?: string;
  color?: string;
  icon?: string;
}
interface TransactionDto {
  _id: string;
  type: TxType;
  amount: number;
  currency: string;
  date: string; // ISO
  description?: string;
  account?: TxAccount | null;
  targetAccount?: TxAccount | null;
  category?: TxCategory | null;
  createdAt?: string;
}

function formatCurrency(amount: number, currency = "LKR") {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
  } catch {
    // fallback if currency code unsupported
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function formatDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function RecentTransactions({ limit = 10 }: { limit?: number }) {
  const [txs, setTxs] = useState<TransactionDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
        const url = (base || "") + `/api/finance/transactions?limit=${limit}`;

        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          // try parse JSON error
          const body = await res.json().catch(() => ({}));
          const msg = body?.error || body?.message || `Request failed (${res.status})`;
          throw new Error(msg);
        }

        const json = await res.json();
        if (mounted) setTxs(json.transactions || []);
      } catch (err: any) {
        if (mounted) setError(err?.message || "Failed to load transactions");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [limit]);

  // UI helpers
  function badgeColorByType(type?: TxType) {
    if (type === "income") return "success";
    if (type === "expense") return "error";
    return "warning"; // transfer
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Transactions</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Latest activity from your accounts</p>
        </div>

        <div className="flex items-center gap-3">
          {/* potential controls: filter / see all */}
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Description</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Account</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Category</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Amount</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Type</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-gray-500">Loading transactions…</TableCell>
              </TableRow>
            )}

            {!loading && error && (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-red-500">{error}</TableCell>
              </TableRow>
            )}

            {!loading && !error && txs && txs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-gray-500">No transactions yet</TableCell>
              </TableRow>
            )}

            {!loading && !error && txs && txs.map((t) => (
              <TableRow key={t._id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    {/* small avatar circle with account initial */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold">
                      {t.account?.name ? t.account.name.charAt(0).toUpperCase() : t.category?.name ? t.category.name.charAt(0).toUpperCase() : "$"}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{t.description || (t.category?.name ?? "Transaction")}</p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">{t.category?.name ?? "Uncategorized"}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {t.account?.name ?? (t.targetAccount?.name ? `Transfer to ${t.targetAccount.name}` : "—")}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {t.category?.name ?? "-"}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {/* show negative for expenses, positive for income */}
                  <span className={t.type === "expense" ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                    {t.type === "expense" ? "-" : "+"}{formatCurrency(t.amount, t.currency || "LKR")}
                  </span>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{formatDate(t.date)}</TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={badgeColorByType(t.type as TxType)}>{t.type.charAt(0).toUpperCase() + t.type.slice(1)}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
