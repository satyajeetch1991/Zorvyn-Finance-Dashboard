# Zorvyn Finance Dashboard

A full-featured personal finance dashboard built with **React 19 (Vite)**, **JavaScript**, **Tailwind CSS v4**, and **Zustand**. Manage transactions, track goals, monitor bills, view spending insights, and switch between 10 live currencies — all in the browser with no backend required.

---

## Live Demo

> Run locally — see [Getting Started](#getting-started) below.
https://zorvyn-finance-dashboard-eta-dun.vercel.app/dashboard
---


| Overview | Transactions | Insights |
|---|---|---|
| Summary cards, charts, bills & goals widgets | Full CRUD with filters, search, sort, pagination | Spending heatmap, category breakdown, observations |

---

## Features

### Dashboard Overview
- **Summary Cards** — Total Balance, Income, Expenses with animated count-up and month-over-month % change
- **Balance Trend Chart** — Area chart showing cumulative balance over time
- **Spending Heatmap** — 52-week calendar grid showing daily expense intensity
- **Upcoming Bills Widget** — Next 5 unpaid bills with overdue alerts
- **Goals Widget** — Top 3 saving goals with animated progress bars
- **Spending Breakdown** — Donut chart for top 6 categories (click to filter transactions)
- **Recent Transactions** — Last 6 transactions with quick links
- **Quick Actions** — Add transaction, bill, or goal directly from the dashboard (Admin only)

### Transactions
- Full table with **search**, **type filter**, **category filter**, **date range filter**
- **Column sorting** — date, amount, category (asc/desc)
- **Pagination** — 15 per page
- **CRUD** — Add, edit, delete (Admin role only)
- **Mobile card layout** — responsive for all screen sizes
- **Export** — Download filtered view as CSV or JSON

### Bill Reminders
- Add/edit/delete bills with due dates, categories, and notes
- **Status badges** — Overdue (red), Due Today (amber), Upcoming (blue), Paid (green)
- **Recurring bills** — weekly / monthly / yearly frequency
- Auto-generates **notifications** for overdue and upcoming bills

### Goal Tracker
- Create saving goals with target amount, deadline, and color
- **Animated progress bars** per goal
- **Add Savings** — increment saved amount toward any goal
- Deadline countdown and remaining amount display
- Auto-notifies when a goal is completed or deadline is near

### Recurring Transactions
- Set up income or expense templates with frequency (daily / weekly / monthly / yearly)
- **Toggle active/inactive** per recurring item
- **Generate Now** — instantly create a transaction from a recurring template and advance the next due date
- Monthly net estimate across all active items

### Multi-Currency Support
- **10 currencies** — INR, USD, EUR, GBP, JPY, AED, SGD, CAD, AUD, CNY
- **Live exchange rates** fetched from [frankfurter.app](https://www.frankfurter.app) (free, no API key)
- Rates **cached for 6 hours** — falls back to static rates if offline
- Currency switcher in the topbar — shows flag, country, currency code
- **Live / Fallback / Loading** status indicator with manual refresh button
- All amounts, charts, and insight text update instantly on currency switch

### Notifications & Alerts
- **Bell icon** in topbar with unread count badge
- **Slide-out panel** (portal-rendered, above all layers) with Today / Earlier grouping
- Auto-generated alerts for:
  - Overdue and upcoming bills (within 3 days)
  - Goals completed or deadline within 7 days
  - Large expenses (> ₹5,000)
- Mark individual or all as read, dismiss, clear all

### Insights
- **Spending Heatmap** — 52-week daily expense calendar
- **Top Spending Categories** — bar breakdown with percentages
- **Monthly Comparison** — income vs expenses bar chart (last 3 months)
- **6 Auto-generated Observations** — top category, MoM change, savings rate, largest transaction, most frequent category, net balance

### UI / UX
- **Dark mode** — Light / Dark / System toggle (custom React theme provider), persisted
- **Role-based UI** — Viewer (read-only) and Admin (full CRUD) switchable from topbar
- **Collapsible sidebar** on desktop, **scrollable bottom nav** on mobile (6 tabs)
- **Framer Motion** animations — stagger cards, slide-in panels, animated progress bars, count-up numbers
- **Responsive** — works on mobile, tablet, and desktop


---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | Vite + React Router | Vite ^7 / React Router ^7 |
| Language | JavaScript | ES2022+ |
| Styling | Tailwind CSS | v4 |
| UI Components | @base-ui/react | ^1.3.0 |
| Charts | Recharts | ^3.8.1 |
| State Management | Zustand (persist) | ^5.0.12 |
| Animations | Framer Motion | ^12 |
| Theme | Custom Theme Context | local implementation |
| Icons | lucide-react | ^1.7.0 |
| Exchange Rates | frankfurter.app API | free / no key |

---

## Getting Started

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/satyajeetch1991/Zorvyn-Finance-Dashboard.git

# 2. Navigate into the project
cd finance-dashboard

# 3. Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.  
You will be automatically redirected to `/dashboard`.

### Other Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

```
**`npm install` fails**
> Ensure Node.js v18+ is installed. Run `node -v` to confirm.
---

## First Time Setup

No configuration required. On first load the app:
1. Seeds **76 mock transactions** (Oct 2024 – Mar 2025) into localStorage
2. Seeds **8 sample bills**, **4 goals**, and **5 recurring transactions**
3. Fetches **live exchange rates** from frankfurter.app
4. Auto-generates **notifications** from overdue bills and large transactions

---

## How to Use

### Switch Role (Viewer ↔ Admin)
- Click the **role badge** in the topbar (top-right)
- **Viewer** — read-only, no add/edit/delete buttons visible
- **Admin** — full access to create and manage all data

### Switch Currency
- Click the **flag + currency code** button in the topbar
- Select any of 10 countries/currencies
- All amounts across every page update instantly
- Shows live rate timestamp or fallback indicator

### View Notifications
- Click the **bell icon** in the topbar
- Panel slides in from the right
- Click a notification to mark it read
- Use "All read" or trash icon to manage

### Add a Transaction (Admin)
- Click **"+ Transaction"** button on the dashboard or transactions page
- Fill in date, amount, type (income/expense), category, description
- Click **Add Transaction**

### Add a Bill (Admin)
- Go to **Bills** from the sidebar
- Click **Add Bill** — fill in name, amount, due date, category
- Toggle **Recurring** to set weekly / monthly / yearly frequency
- Click **Mark Paid** when a bill is settled

### Add a Goal (Admin)
- Go to **Goals** from the sidebar
- Click **New Goal** — set name, target amount, deadline, color
- Click **Add Savings** on any goal to increment the saved amount

### Add a Recurring Transaction (Admin)
- Go to **Recurring** from the sidebar
- Click **Add Recurring** — set description, amount, type, frequency, next due date
- Click **Generate Now** to instantly add it as a real transaction

---

## Project Structure

```
finance-dashboard/
├── public/                         # Static assets
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── layout.jsx          # Shell: Sidebar + Topbar + MobileNav
│   │   │   ├── page.jsx            # Overview page
│   │   │   ├── transactions/
│   │   │   │   └── page.jsx
│   │   │   ├── insights/
│   │   │   │   └── page.jsx
│   │   │   ├── bills/
│   │   │   │   └── page.jsx
│   │   │   ├── goals/
│   │   │   │   └── page.jsx
│   │   │   └── recurring/
│   │   │       └── page.jsx
│   │   ├── globals.css             # Tailwind v4 + CSS theme variables
│   │   ├── layout.jsx              # Root wrapper
│   │   └── page.jsx                # / -> /dashboard redirect
│   ├── components/
│   │   ├── bills/
│   │   ├── dashboard/
│   │   ├── goals/
│   │   ├── insights/
│   │   ├── layout/
│   │   ├── notifications/
│   │   ├── recurring/
│   │   ├── shared/
│   │   ├── transactions/
│   │   └── ui/
│   ├── hooks/
│   │   ├── useChartData.js
│   │   ├── useFilteredTransactions.js
│   │   ├── useNotificationEngine.js
│   │   └── useSummary.js
│   ├── lib/
│   │   ├── billUtils.js
│   │   ├── computeInsights.js
│   │   ├── exportUtils.js
│   │   ├── formatters.js
│   │   ├── mockData.js
│   │   └── utils.js
│   ├── store/
│   │   ├── useBillStore.js
│   │   ├── useCurrencyStore.js
│   │   ├── useFilterStore.js
│   │   ├── useGoalStore.js
│   │   ├── useNotificationStore.js
│   │   ├── useRecurringStore.js
│   │   ├── useRoleStore.js
│   │   ├── useTransactionStore.js
│   │   └── useUserStore.js
│   ├── types/
│   │   └── index.js                # Placeholder export
│   ├── App.jsx                     # Route definitions
│   └── main.jsx                    # Vite entry point
├── components.json
├── eslint.config.mjs
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.mjs
└── vite.config.js
```

---

## Data Persistence

All data is stored in **browser localStorage** via Zustand's `persist` middleware. No backend or database needed.

| Store | localStorage Key | Data |
|---|---|---|
| Transactions | `zorvyn_transactions` | All transactions |
| Bills | `zorvyn_bills` | All bill reminders |
| Goals | `zorvyn_goals` | All saving goals |
| Recurring | `zorvyn_recurring` | Recurring templates |
| Notifications | `zorvyn_notifications` | All notifications |
| Currency | `zorvyn_currency` | Selected currency + cached rates |
| Role | `zorvyn_role` | viewer / admin |
| Sidebar | `zorvyn_sidebar_collapsed` | Sidebar open/closed |

To **reset all data** to mock defaults: Open DevTools → Application → Local Storage → delete all `zorvyn_*` keys → refresh.

---

## Architecture Decisions

### Why Zustand over Redux?
Zustand requires zero boilerplate — no actions, reducers, or dispatch. Each store is a plain object with state + functions, making it easy to read and extend.

### Why localStorage over a database?
This is a frontend-only project. localStorage via Zustand persist gives instant read/write with no network latency or backend setup. A real production app would replace store actions with API calls.

### Why `React.lazy` + `Suspense` for the Heatmap?
The heatmap is one of the heavier visual components, so it's loaded lazily to reduce initial bundle work and keep first load responsive in a client-side app.

### Why `createPortal` for the Notification Panel?
The notification panel is rendered inside the Topbar which creates a CSS stacking context (`z-index: 20`). Without a portal, the panel would appear behind the Sidebar (`z-index: 30`). Rendering via `createPortal` at `document.body` escapes any stacking context.


