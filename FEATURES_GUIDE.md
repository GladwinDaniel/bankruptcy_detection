# 🎨 Dashboard Features & Capabilities Guide

## 📊 Overview Tab

### Risk Alert Banner
- **Status Indicator**: Shows CRITICAL, HIGH, MEDIUM, or LOW risk
- **Risk Score**: Percentage-based bankruptcy risk
- **Color Coding**: 
  - 🟢 Green (< 12%): Healthy
  - 🟡 Yellow (12-18%): Moderate concern
  - 🟠 Orange (18-30%): High risk
  - 🔴 Red (> 30%): Critical

- **Trend Indicator**: Shows if risk is improving (↓) or worsening (↑)
- **YoY Change**: Percentage change from previous year

### Key Metrics Cards (5 columns)
1. **Debt/Equity Ratio** - Leverage indicator
2. **Profit Margin %** - Profitability
3. **ROE %** - Return on Equity
4. **Current Ratio** - Liquidity
5. **Asset Turnover** - Efficiency

Each card shows:
- Current value
- YoY percentage change
- Visual indicator (↑ or ↓)
- Trending direction (green=good, red=bad)

### Risk Trajectory Chart
- **X-axis**: Years from 1999-2018+ (including 3-year forecast)
- **Y-axis**: Bankruptcy risk percentage (0-100%)
- **Solid Line**: Historical data
- **Dashed Line**: Projected data (if applicable)
- **Interactive**: Hover for exact values

### Financial Health Radar
- **5 Dimensions**:
  1. Liquidity (based on current ratio)
  2. Profitability (based on profit margin)
  3. Leverage (inverse of debt ratio)
  4. Efficiency (based on asset turnover)
  5. Returns (based on ROE)

- **Score Range**: 0-100 per dimension
- **Fills**: Blue gradient shows health profile
- **Interactive**: Hover for individual scores

### Advanced Financial Ratios Grid
Shows 10 key ratios in color-coded boxes:

**Profitability Metrics:**
- Profit Margin (%)
- Gross Margin (%)
- Operating Margin (%)
- ROA (%)
- ROE (%)

**Efficiency & Leverage:**
- Asset Turnover (x)
- Debt/Equity Ratio (x)
- Debt Ratio (%)
- Current Ratio (x)
- Quick Ratio (x)

### Liquidity & Efficiency Breakdown
Two side-by-side cards showing:

**Liquidity:**
- Current Ratio (ability to pay short-term)
- Quick Ratio (immediate liquidity)
- Debt Ratio (leverage position)

**Efficiency:**
- Asset Turnover (revenue generation)
- Debt/Equity (capital structure)
- Operating Margin (operational profitability)

---

## 📈 Metrics Tab

### Individual Metric Trend Charts (9 shown)
- **Grid Layout**: 2 columns on tablet, 1 on mobile
- **Each Chart**:
  - Line graph with data points
  - X-axis: Years
  - Y-axis: Metric value
  - Hover tooltips
  - Smooth curves connecting data points

### Available Metrics
- X1: Current Assets
- X2: COGS (Cost of Goods Sold)
- X3: Depreciation & Amortization
- X4: EBITDA
- X5: Inventory
- X6: Net Income
- X7: Total Receivables
- X8: Market Value
- X9: Net Sales

*Additional metrics X10-X18 can be viewed by expanding the grid*

---

## 🔮 Forecast Tab

### 3-Year Risk Forecast Chart
- **Chart Type**: Combined bar + line chart
- **Data**: Next 3 years of projected risk
- **Bars**: Risk percentage for each year
- **Line**: Trend direction overlay
- **Colors**: Indigo bars with pink trend line
- **Interactive**: Hover for exact projections

### AI Forecast Analysis
Narrative explanation based on 3-year outlook:

**If Critical Risk (>30%):**
- "⚠️ Critical Warning" message
- Recommends immediate restructuring
- Shows projected risk level and year

**If High Risk (18-30%):**
- "⚠️ Elevated Risk" message
- Suggests strategic interventions
- Highlights need for corrective measures

**If Low Risk (<18%):**
- "✅ Stable Outlook" message
- Encourages continued monitoring
- Confirms healthy financial trajectory

---

## 🏆 Comparison Tab

### Company Risk Ranking
- **Top 3 Companies** displayed prominently
- Shows:
  - Company name & status
  - Risk ranking (#1, #2, #3)
  - Risk percentage with color coding
  - Quick metrics (Equity Ratio, Operating Income)

### Ranking & Sorting Controls
- **Sort by Risk**: Highest to lowest risk
- **Sort Alphabetically**: A-Z by company name
- **Buttons**: Toggle between sort options

### Multi-Company Trend Comparison
- **Line Chart**: Shows top 5 companies
- **Color Coding**: Each company has unique color
- **Interactive**: Hover to see specific values
- **Legend**: Identify companies by color
- **Trends**: Visual comparison of risk trajectories

---

## 🎛️ Navigation Controls

### Company Selector
- **Button Row**: First 10 companies as quick buttons
- **Dropdown**: Additional companies (11+)
- **Active State**: Selected company highlighted (gradient)
- **Instant Switch**: Dashboard updates immediately

### Tab Navigation
- **4 Tabs**: Overview | Metrics | Forecast | Comparison
- **Active Tab**: Indigo background
- **Smooth Transition**: Content updates without page reload

### File Upload
- **Upload Button**: Located in header
- **"Change File"**: Allows loading new CSV
- **Automatic Parse**: CSV read without page refresh
- **Data Persistence**: Dashboard updates with new data

---

## 🎯 Risk Calculation Model

### Leverage Component (25% weight)
- Equity Ratio analysis
- Penalty for low equity (< 30%)
- Reward for strong equity (> 70%)

### Profitability Component (30% weight)
- Net Income trends
- Negative income heavily penalized
- Strong margins rewarded

### Operating Performance (25% weight)
- EBIT analysis
- Operating efficiency
- Core business health

### Liquidity Component (15% weight)
- Current ratio assessment
- Ability to meet obligations
- Extreme ratios penalized

### Efficiency Component (5% weight)
- Asset turnover rate
- Revenue generation per asset

**Final Score**: 0 (safe) to 1.0 (bankrupt)

---

## 💡 Tips for Best Use

### Understanding the Data
1. Look at the Overview tab first for quick risk assessment
2. Review the Metrics tab to see which specific metrics are problematic
3. Check the Forecast tab to understand future trajectory
4. Use Comparison tab to benchmark against peers

### Interpreting Charts
- **Upward trends** = Increasing risk (red flag)
- **Downward trends** = Improving health (positive)
- **Flat lines** = Stable but potentially concerning if elevated
- **Sharp drops** = Sudden financial distress (bankruptcy likely)

### Key Indicators to Watch
1. **Profit Margin**: Should be positive and stable
2. **Current Ratio**: Should be > 1.0 (can pay bills)
3. **Debt/Equity**: Lower is better (< 1.0 is healthy)
4. **ROE**: Higher is better (shows efficiency)
5. **Risk Score**: Any increase YoY is concerning

### Action Items by Risk Level
- **🟢 Low (<12%)**: Continue monitoring, maintain current strategy
- **🟡 Medium (12-18%)**: Review metrics monthly, consider improvements
- **🟠 High (18-30%)**: Develop action plan, make operational changes
- **🔴 Critical (>30%)**: Urgent intervention needed, consider restructuring

---

## 📱 Responsive Design

The dashboard adapts to different screen sizes:

- **Desktop (1920px+)**: Full 5-column layouts, all features visible
- **Tablet (1024px)**: 2-3 column layouts, scrollable content
- **Mobile (640px)**: 1-2 column layouts, stacked interface

All charts remain interactive regardless of screen size.

---

## ⚙️ Customization Possibilities

The dashboard can be extended with:
- Additional financial metrics
- Custom risk calculation weights
- Export to PDF/Excel
- Email alerts for risk changes
- Real-time data integration
- Machine learning predictions
- Scenario modeling
- Custom date ranges

All built with clean, modular React code!

---

**Your dashboard is fully featured and production-ready!** 🚀
