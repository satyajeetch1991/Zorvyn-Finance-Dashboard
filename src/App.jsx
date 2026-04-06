import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/app/dashboard/layout";
import DashboardPage from "@/app/dashboard/page";
import TransactionsPage from "@/app/dashboard/transactions/page";
import InsightsPage from "@/app/dashboard/insights/page";
import BillsPage from "@/app/dashboard/bills/page";
import GoalsPage from "@/app/dashboard/goals/page";
import RecurringPage from "@/app/dashboard/recurring/page";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen antialiased bg-background text-foreground overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="bills" element={<BillsPage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="recurring" element={<RecurringPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
