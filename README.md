# Bankruptcy Risk Analytics Dashboard

A fully operational React dashboard for analyzing bankruptcy risk using real financial data.

## Features

✨ **Advanced Analytics**
- Real-time bankruptcy risk calculation using 18 financial metrics
- AI-powered risk scoring and forecasting
- Multi-company comparison and ranking
- Historical trend analysis with future projections

📊 **Rich Visualizations**
- Area charts for risk trajectory
- Radar charts for financial health profiles
- Line charts for metric comparisons
- Bar charts for forecasting
- Responsive design with Tailwind CSS

💼 **Key Metrics**
- Profitability (Profit Margin, ROA, ROE)
- Liquidity (Current Ratio, Quick Ratio)
- Leverage (Debt/Equity, Debt Ratio)
- Efficiency (Asset Turnover, Operating Margin)
- Growth indicators

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Open the application in your browser
2. Click "Upload CSV File" to load your data
3. Select a company to analyze
4. Navigate through tabs:
   - **Overview**: Key metrics and risk assessment
   - **Metrics**: Individual metric trends over time
   - **Forecast**: 3-year bankruptcy risk projection
   - **Comparison**: Multi-company analysis and ranking

## CSV Format

The CSV file should include:
- `company_name`: Company identifier
- `status_label`: "alive" or "failed"
- `year`: Year of observation
- `X1-X18`: Financial metrics

## Technologies Used

- React 18 - UI Framework
- Vite - Build tool
- Recharts - Data visualization
- Tailwind CSS - Styling
- Lucide React - Icons

## Bankruptcy Risk Model

The risk score is calculated using:
- Equity ratio and debt leverage
- Profitability metrics (Net Income, EBIT)
- Operating performance
- Liquidity ratios
- Asset efficiency

Risk Levels:
- 🟢 LOW: < 12%
- 🟡 MEDIUM: 12-18%
- 🟠 HIGH: 18-30%
- 🔴 CRITICAL: > 30%
