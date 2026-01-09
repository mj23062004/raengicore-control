import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Aug", expenses: 450000 },
  { month: "Sep", expenses: 520000 },
  { month: "Oct", expenses: 480000 },
  { month: "Nov", expenses: 580000 },
  { month: "Dec", expenses: 550000 },
  { month: "Jan", expenses: 600000 },
];

const categoryData = [
  { name: "Diesel", value: 180000, color: "hsl(38, 92%, 50%)" },
  { name: "Labour", value: 150000, color: "hsl(173, 80%, 40%)" },
  { name: "Machine Repair", value: 100000, color: "hsl(262, 83%, 58%)" },
  { name: "Site Materials", value: 90000, color: "hsl(221, 83%, 53%)" },
  { name: "Travel", value: 50000, color: "hsl(0, 72%, 51%)" },
  { name: "Office", value: 30000, color: "hsl(142, 71%, 45%)" },
];

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

export function ExpenseAnalytics() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Monthly Trend */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Monthly Expense Trend
        </h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(222, 30%, 18%)" }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(222, 30%, 18%)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(210, 20%, 95%)" }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Expenses"]}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#expenseGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Category Breakdown
        </h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "hsl(210, 20%, 95%)", fontSize: 12 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GST Credit Summary */}
      <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Input GST Credit (This Month)
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">Total Expenses (GST Applicable)</p>
            <p className="mt-1 font-mono text-xl font-bold text-foreground">₹4,20,000</p>
          </div>
          <div className="rounded-lg bg-success/10 p-4">
            <p className="text-xs text-muted-foreground">Input GST Credit</p>
            <p className="mt-1 font-mono text-xl font-bold text-success">₹75,600</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-xs text-muted-foreground">Net GST Payable</p>
            <p className="mt-1 font-mono text-xl font-bold text-primary">₹1,04,400</p>
          </div>
        </div>
      </div>
    </div>
  );
}
