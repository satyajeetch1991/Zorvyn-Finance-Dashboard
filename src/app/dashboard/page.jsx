import { Link } from "react-router-dom";
import { Plus, Receipt, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingBreakdownChart } from "@/components/dashboard/SpendingBreakdownChart";
import { UpcomingBillsWidget } from "@/components/dashboard/UpcomingBillsWidget";
import { GoalsWidget } from "@/components/dashboard/GoalsWidget";
import { lazy, Suspense, useState } from "react";
const SpendingHeatmap = lazy(() => import("@/components/dashboard/SpendingHeatmap").then((m) => ({ default: m.SpendingHeatmap })));
import { RecentTransactionsWidget } from "@/components/dashboard/RecentTransactionsWidget";
import { GreetingBanner } from "@/components/dashboard/GreetingBanner";
import { useRoleStore } from "@/store/useRoleStore";
import { TransactionModal } from "@/components/transactions/TransactionModal";
export default function DashboardPage() {
    const role = useRoleStore((s) => s.role);
    const [txModalOpen, setTxModalOpen] = useState(false);
    return (<div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <GreetingBanner />
          <p className="text-muted-foreground text-sm pl-10">Your custom money pulse for today</p>
        </div>
        {role === "admin" && (<div className="flex items-center gap-2 shrink-0">
            <Link to="/dashboard/bills" className="inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors">
              <Receipt className="h-3.5 w-3.5"/>New Due Item
            </Link>
            <Link to="/dashboard/goals" className="inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors">
              <Target className="h-3.5 w-3.5"/>New Milestone
            </Link>
            <Button size="sm" className="gap-1.5 h-8 text-xs" onClick={() => setTxModalOpen(true)}>
              <Plus className="h-3.5 w-3.5"/>New Entry
            </Button>
          </div>)}
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Row: Balance Trend + Upcoming Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-2">
          <UpcomingBillsWidget />
        </div>
      </div>

      {/* Row: Spending Heatmap + Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="h-48 rounded-xl bg-muted/40 animate-pulse"/>}>
            <SpendingHeatmap />
          </Suspense>
        </div>
        <div className="lg:col-span-2">
          <GoalsWidget />
        </div>
      </div>

      {/* Row: Spending Breakdown + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <SpendingBreakdownChart />
        </div>
        <div className="lg:col-span-2">
          <RecentTransactionsWidget />
        </div>
      </div>

      {role === "admin" && (<TransactionModal open={txModalOpen} onClose={() => setTxModalOpen(false)}/>)}
    </div>);
}
