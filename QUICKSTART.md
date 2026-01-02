# 🚀 Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
```bash
cd d:\DOWNLOAD\accounts
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The dashboard will automatically open at `http://localhost:5173`

### 3. Upload CSV File
- Click the "Upload CSV File" button
- Select your `american_bankruptcy.csv` file
- The dashboard will load and display all data

## Project Structure

```
accounts/
├── BankruptcyDashboard.jsx    # Main dashboard component
├── main.jsx                    # React entry point
├── index.html                  # HTML template
├── index.css                   # Global styles
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── american_bankruptcy.csv     # Your data file
└── README.md                   # Documentation
```

## Features Implemented

### 📊 Dashboard Tabs

1. **Overview**
   - Real-time bankruptcy risk with color-coded status
   - 5 key metrics cards with YoY changes
   - Risk trajectory area chart
   - Financial health radar chart
   - Advanced financial ratios (10 metrics)
   - Liquidity and efficiency breakdown

2. **Metrics**
   - 9 individual metric trend charts
   - Historical data visualization
   - Year-over-year comparisons

3. **Forecast**
   - 3-year bankruptcy risk projection
   - Combined bar and line chart
   - AI-powered analysis narrative

4. **Comparison**
   - Company risk ranking (top 3 highlighted)
   - Sort by risk or alphabetically
   - Multi-company trend comparison (top 5)

### 🎯 Key Metrics Tracked

- Current Assets & Total Assets
- Net Income, Operating Income (EBIT)
- Profitability Ratios (Profit Margin, ROA, ROE)
- Liquidity Ratios (Current Ratio, Quick Ratio)
- Leverage Ratios (Debt/Equity, Debt Ratio)
- Efficiency Metrics (Asset Turnover)
- And 9+ more financial indicators

### 🔴 Risk Scoring Model

The bankruptcy risk is calculated using:
- **Leverage Indicators**: Equity ratio, debt levels
- **Profitability**: Net income vs revenue
- **Operating Performance**: EBIT trends
- **Liquidity**: Current and quick ratios
- **Asset Efficiency**: Turnover rates

## 🎨 Design Improvements

✅ Modern gradient backgrounds
✅ Smooth animations and transitions
✅ Responsive grid layouts (1-5 columns)
✅ Color-coded risk indicators (Red/Orange/Yellow/Green)
✅ Beautiful cards with hover effects
✅ Professional data visualization
✅ Mobile-friendly responsive design
✅ Dark tooltips for better contrast

## 🔧 Technology Stack

- **React 18** - Component-based UI
- **Vite 4** - Fast build tool with HMR
- **Recharts** - Professional charts
- **Tailwind CSS 3** - Utility-first styling
- **Lucide Icons** - Beautiful SVG icons

## 💡 Tips

1. Upload the CSV file on first load
2. Use the company selector buttons to switch between companies
3. Hover over charts for detailed information
4. Color coding helps identify risk levels at a glance
5. All calculations are based on real financial ratios

## 🚀 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder ready for deployment.

---

**Enjoy your bankruptcy risk analytics dashboard!** 📈
