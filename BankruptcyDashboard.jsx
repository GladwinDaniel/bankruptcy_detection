import React, { useState, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ScatterChart, Scatter, ZAxis, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Activity, DollarSign, PieChart, Zap, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp, BarChart3, Target, Upload, FileCheck, AlertCircle } from 'lucide-react';

const BankruptcyDashboard = () => {
  const [companyData, setCompanyData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [sortBy, setSortBy] = useState('risk');
  const fileInputRef = useRef(null);

  const metricLabels = {
    X1: "Current Assets", X2: "COGS", X3: "Depreciation & Amortization", X4: "EBITDA",
    X5: "Inventory", X6: "Net Income", X7: "Total Receivables", X8: "Market Value",
    X9: "Net Sales", X10: "Total Assets", X11: "Total Long-term Debt", X12: "EBIT",
    X13: "Gross Profit", X14: "Total Current Liabilities", X15: "Retained Earnings",
    X16: "Total Revenue", X17: "Total Liabilities", X18: "Total Operating Expenses"
  };

  const calculateBankruptcyRisk = (data) => {
    let score = 0.066;
    const safeDiv = (a, b) => (b !== 0 && !isNaN(a) && !isNaN(b)) ? a / b : 0;

    // Leverage indicators
    const equityRatio = safeDiv(data.X10 - data.X17, data.X10);
    if (equityRatio < 0.3) score += 0.25;
    else if (equityRatio < 0.5) score += 0.10;
    else if (equityRatio > 0.7) score -= 0.15;

    // Profitability indicators
    if (data.X6 < 0) score += 0.30;
    else if (data.X6 < data.X16 * 0.02) score += 0.20;
    else if (data.X6 > data.X16 * 0.08) score -= 0.15;

    // Operating performance
    if (data.X12 < 0) score += 0.25;
    else if (data.X12 < data.X16 * 0.02) score += 0.10;
    else score -= 0.10;

    // Liquidity
    const currentRatio = safeDiv(data.X1, data.X14);
    if (currentRatio < 1) score += 0.15;
    else if (currentRatio > 3) score -= 0.10;

    // Efficiency
    const assetTurnover = safeDiv(data.X9, data.X10);
    if (assetTurnover < 0.5) score += 0.10;

    return Math.max(0, Math.min(1, score));
  };

  const calculateFinancialRatios = (data) => {
    const safeDiv = (a, b) => (b !== 0 && !isNaN(a) && !isNaN(b)) ? a / b : 0;
    const equity = data.X10 - data.X17;

    return {
      profitMargin: ((safeDiv(data.X6, data.X16)) * 100).toFixed(1),
      debtToEquity: (safeDiv(data.X17, equity)).toFixed(2),
      currentRatio: (safeDiv(data.X1, data.X14)).toFixed(2),
      quickRatio: (safeDiv(data.X1 - data.X5, data.X14)).toFixed(2),
      roe: ((safeDiv(data.X6, equity)) * 100).toFixed(1),
      assetTurnover: (safeDiv(data.X9, data.X10)).toFixed(2),
      debtRatio: ((safeDiv(data.X17, data.X10)) * 100).toFixed(1),
      roa: ((safeDiv(data.X6, data.X10)) * 100).toFixed(1),
      operatingMargin: ((safeDiv(data.X12, data.X16)) * 100).toFixed(1),
      grossMargin: ((safeDiv(data.X13, data.X16)) * 100).toFixed(1)
    };
  };

  const parseCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.trim().split('\n');
      const headers = lines[0].split(',');

      const newData = {};

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const company_name = values[0].trim();
        const status = values[1].trim();
        const year = parseInt(values[2]);

        if (!newData[company_name]) {
          newData[company_name] = { industry: status, years: [] };
        }

        const yearData = { year, status };
        for (let j = 3; j < headers.length; j++) {
          yearData[headers[j].trim()] = parseFloat(values[j]) || 0;
        }
        newData[company_name].years.push(yearData);
        newData[company_name].years.sort((a, b) => a.year - b.year);
      }

      setCompanyData(newData);
      const companies = Object.keys(newData);
      if (companies.length > 0) {
        setSelectedCompany(companies[0]);
      }
    };

    reader.readAsText(file);
  };

  if (Object.keys(companyData).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl mb-4">
              <BarChart3 className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Bankruptcy Risk Analytics
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            AI-Powered Financial Health Monitoring & Prediction
          </p>
          <label className="inline-block">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg"
            >
              <Upload className="w-6 h-6" />
              Upload CSV File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={parseCSV}
              className="hidden"
            />
          </label>
          <p className="text-gray-400 mt-6 text-sm">
            Upload your american_bankruptcy.csv file to get started
          </p>
        </div>
      </div>
    );
  }

  const companies = Object.keys(companyData).sort();
  const currentData = companyData[selectedCompany];
  const latestYear = currentData.years[currentData.years.length - 1];
  const prevYear = currentData.years.length > 1 ? currentData.years[currentData.years.length - 2] : latestYear;

  const currentRisk = calculateBankruptcyRisk(latestYear);
  const prevRisk = calculateBankruptcyRisk(prevYear);
  const ratios = calculateFinancialRatios(latestYear);

  const predictFutureRisk = (years) => {
    const risks = years.map(y => calculateBankruptcyRisk(y));
    const trend = risks.length > 1 ? (risks[risks.length - 1] - risks[0]) / (risks.length - 1) : 0;
    const lastYear = years[years.length - 1].year;

    return [
      { year: lastYear + 1, risk: Math.max(0, Math.min(1, risks[risks.length - 1] + trend)), type: 'projected' },
      { year: lastYear + 2, risk: Math.max(0, Math.min(1, risks[risks.length - 1] + trend * 2)), type: 'projected' },
      { year: lastYear + 3, risk: Math.max(0, Math.min(1, risks[risks.length - 1] + trend * 3)), type: 'projected' }
    ];
  };

  const futureRisks = predictFutureRisk(currentData.years);

  const historicalWithFuture = [
    ...currentData.years.map(y => ({ year: y.year, risk: calculateBankruptcyRisk(y) * 100, type: 'actual' })),
    ...futureRisks.map(f => ({ year: f.year, risk: f.risk * 100, type: 'projected' }))
  ];

  const radarData = [
    { metric: 'Liquidity', value: Math.min(100, parseFloat(ratios.currentRatio) * 25), fullMark: 100 },
    { metric: 'Profitability', value: Math.max(0, parseFloat(ratios.profitMargin) + 50), fullMark: 100 },
    { metric: 'Leverage', value: Math.max(0, 100 - parseFloat(ratios.debtRatio)), fullMark: 100 },
    { metric: 'Efficiency', value: Math.min(100, parseFloat(ratios.assetTurnover) * 50), fullMark: 100 },
    { metric: 'Returns', value: Math.max(0, parseFloat(ratios.roe) / 2), fullMark: 100 }
  ];

  const getRiskColor = (risk) => {
    if (risk > 0.30) return '#ef4444';
    if (risk > 0.18) return '#f97316';
    if (risk > 0.12) return '#eab308';
    return '#22c55e';
  };

  const getRiskLabel = (risk) => {
    if (risk > 0.30) return { text: 'CRITICAL', icon: AlertTriangle, bg: 'bg-red-50', border: 'border-red-300' };
    if (risk > 0.18) return { text: 'HIGH', icon: AlertTriangle, bg: 'bg-orange-50', border: 'border-orange-300' };
    if (risk > 0.12) return { text: 'MEDIUM', icon: Activity, bg: 'bg-yellow-50', border: 'border-yellow-300' };
    return { text: 'LOW', icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-300' };
  };

  const riskInfo = getRiskLabel(currentRisk);
  const RiskIcon = riskInfo.icon;

  const MetricCard = ({ label, value, change, prefix = '', suffix = '', icon: Icon, isPositiveGood = true }) => {
    const isPositive = change > 0;
    const shouldBeGreen = isPositiveGood ? isPositive : !isPositive;
    
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</div>
          {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {prefix}{typeof value === 'number' ? value.toFixed(2) : value}{suffix}
        </div>
        <div className={`flex items-center text-sm font-medium ${shouldBeGreen ? 'text-green-600' : 'text-red-600'}`}>
          {shouldBeGreen ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {Math.abs(change).toFixed(1)}% vs prev year
        </div>
      </div>
    );
  };

  const companyRisks = companies
    .map(company => ({
      name: company,
      risk: calculateBankruptcyRisk(companyData[company].years[companyData[company].years.length - 1]),
      status: companyData[company].industry
    }))
    .sort((a, b) => sortBy === 'risk' ? b.risk - a.risk : a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Bankruptcy Risk Analytics Platform
              </h1>
              <p className="text-gray-600">AI-Powered Financial Health Monitoring with Real Data</p>
            </div>
            <label>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Change File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={parseCSV}
                className="hidden"
              />
            </label>
          </div>

          {/* Company Selector */}
          <div className="flex gap-3 mb-4 flex-wrap">
            {companies.slice(0, 10).map(company => (
              <button
                key={company}
                onClick={() => setSelectedCompany(company)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCompany === company
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {company}
              </button>
            ))}
            {companies.length > 10 && (
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {companies.slice(10).map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white p-2 rounded-xl border border-gray-200 w-fit">
            {['overview', 'metrics', 'forecast', 'comparison'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Risk Alert Banner */}
            <div className={`rounded-xl p-8 border-2 ${riskInfo.bg} ${riskInfo.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-full ${
                    currentRisk > 0.30 ? 'bg-red-100' :
                    currentRisk > 0.18 ? 'bg-orange-100' :
                    currentRisk > 0.12 ? 'bg-yellow-100' :
                    'bg-green-100'
                  }`}>
                    <RiskIcon className={`w-8 h-8 ${
                      currentRisk > 0.30 ? 'text-red-600' :
                      currentRisk > 0.18 ? 'text-orange-600' :
                      currentRisk > 0.12 ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {riskInfo.text} RISK - {(currentRisk * 100).toFixed(1)}%
                    </div>
                    <div className="text-gray-700 mt-2">
                      {currentRisk > 0.30 ? '⚠️ Immediate action required - critical financial distress' :
                       currentRisk > 0.18 ? '⚠️ High risk - monitor closely and implement corrective measures' :
                       currentRisk > 0.12 ? '⚠️ Moderate risk - some financial concerns present' :
                       '✅ Low risk - company shows healthy financial position'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 font-medium">Trend (YoY)</div>
                  <div className={`text-3xl font-bold ${currentRisk > prevRisk ? 'text-red-600' : 'text-green-600'}`}>
                    {currentRisk > prevRisk ? '↑' : '↓'} {Math.abs((currentRisk - prevRisk) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <MetricCard 
                label="Debt/Equity Ratio" 
                value={ratios.debtToEquity} 
                change={((calculateFinancialRatios(prevYear).debtToEquity - ratios.debtToEquity) / calculateFinancialRatios(prevYear).debtToEquity) * 100}
                icon={PieChart}
                isPositiveGood={false}
              />
              <MetricCard 
                label="Profit Margin" 
                value={ratios.profitMargin}
                change={((parseFloat(ratios.profitMargin) - parseFloat(calculateFinancialRatios(prevYear).profitMargin)) / Math.abs(parseFloat(calculateFinancialRatios(prevYear).profitMargin))) * 100}
                suffix="%"
                icon={DollarSign}
              />
              <MetricCard 
                label="ROE" 
                value={ratios.roe}
                change={((parseFloat(ratios.roe) - parseFloat(calculateFinancialRatios(prevYear).roe)) / Math.abs(parseFloat(calculateFinancialRatios(prevYear).roe))) * 100}
                suffix="%"
                icon={TrendingUp}
              />
              <MetricCard 
                label="Current Ratio" 
                value={ratios.currentRatio}
                change={((parseFloat(ratios.currentRatio) - parseFloat(calculateFinancialRatios(prevYear).currentRatio)) / parseFloat(calculateFinancialRatios(prevYear).currentRatio)) * 100}
                icon={Activity}
              />
              <MetricCard 
                label="Asset Turnover" 
                value={ratios.assetTurnover}
                change={((parseFloat(ratios.assetTurnover) - parseFloat(calculateFinancialRatios(prevYear).assetTurnover)) / parseFloat(calculateFinancialRatios(prevYear).assetTurnover)) * 100}
                icon={Zap}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Timeline */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Risk Trajectory
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={historicalWithFuture}>
                    <defs>
                      <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      formatter={(value) => [`${value.toFixed(1)}%`, 'Risk']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="risk" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      fill="url(#riskGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Financial Health Radar */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Financial Health Profile
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
                    <Radar 
                      name="Health Score" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      fill="#6366f1" 
                      fillOpacity={0.5}
                      strokeWidth={2}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Financial Ratios Grid */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Advanced Financial Ratios
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  { label: 'Profit Margin', value: ratios.profitMargin, suffix: '%' },
                  { label: 'Gross Margin', value: ratios.grossMargin, suffix: '%' },
                  { label: 'Operating Margin', value: ratios.operatingMargin, suffix: '%' },
                  { label: 'ROA', value: ratios.roa, suffix: '%' },
                  { label: 'ROE', value: ratios.roe, suffix: '%' }
                ].map((ratio, idx) => (
                  <div key={idx} className="text-center p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg hover:shadow-md transition-all">
                    <div className="text-xs text-gray-600 mb-2 font-medium uppercase">{ratio.label}</div>
                    <div className="text-2xl font-bold text-indigo-600">{ratio.value}{ratio.suffix}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Liquidity Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Current Ratio</span>
                    <span className="text-xl font-bold text-gray-900">{ratios.currentRatio}x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Quick Ratio</span>
                    <span className="text-xl font-bold text-gray-900">{ratios.quickRatio}x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Debt Ratio</span>
                    <span className="text-xl font-bold text-gray-900">{ratios.debtRatio}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Efficiency Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Asset Turnover</span>
                    <span className="text-xl font-bold text-gray-900">{ratios.assetTurnover}x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Debt/Equity</span>
                    <span className="text-xl font-bold text-gray-900">{ratios.debtToEquity}x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Operating Margin</span>
                    <span className="text-xl font-bold text-gray-900">{ratios.operatingMargin}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">All Financial Metrics Over Time</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(metricLabels).slice(0, 9).map(([key, label]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-white to-gray-50">
                    <div className="text-sm font-semibold text-gray-700 mb-3">{label}</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={currentData.years}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey={key} stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forecast' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">3-Year Risk Forecast</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={futureRisks.map(f => ({ ...f, risk: f.risk * 100 }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="risk" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  <Line type="monotone" dataKey="risk" stroke="#ec4899" strokeWidth={2} dot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className={`rounded-xl p-6 border-2 ${
              futureRisks[2].risk > 0.30 ? 'bg-red-50 border-red-300' :
              futureRisks[2].risk > 0.18 ? 'bg-orange-50 border-orange-300' :
              'bg-green-50 border-green-300'
            }`}>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Forecast Analysis</h3>
              <p className="text-gray-700 leading-relaxed">
                {futureRisks[2].risk > 0.30 ? 
                  `⚠️ Critical Warning: Based on current trajectory, ${selectedCompany} is projected to reach ${(futureRisks[2].risk * 100).toFixed(1)}% bankruptcy risk by ${futureRisks[2].year}. Immediate restructuring is recommended.` :
                 futureRisks[2].risk > 0.18 ?
                  `⚠️ Elevated Risk: The model forecasts increasing financial stress, reaching ${(futureRisks[2].risk * 100).toFixed(1)}% risk by ${futureRisks[2].year}. Consider strategic interventions.` :
                  `✅ Stable Outlook: ${selectedCompany} is projected to maintain low bankruptcy risk of ${(futureRisks[2].risk * 100).toFixed(1)}% through ${futureRisks[2].year}.`
                }
              </p>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Company Risk Ranking</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy('risk')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${sortBy === 'risk' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    By Risk
                  </button>
                  <button
                    onClick={() => setSortBy('name')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${sortBy === 'name' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Alphabetical
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {companyRisks.slice(0, 3).map((company, idx) => {
                  const riskInfo = getRiskLabel(company.risk);
                  return (
                    <div key={company.name} className={`p-6 rounded-xl border-2 ${
                      company.name === selectedCompany ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:shadow-lg transition-all'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-lg">{company.name}</h4>
                          <div className="text-sm text-gray-600">{company.status}</div>
                        </div>
                        <div className={`text-2xl font-bold ${
                          company.risk > 0.30 ? 'text-red-600' :
                          company.risk > 0.18 ? 'text-orange-600' :
                          company.risk > 0.12 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          #{idx + 1}
                        </div>
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${riskInfo.bg} text-gray-900`}>
                        {(company.risk * 100).toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Risk Comparison Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="year" 
                      type="number" 
                      domain={['dataMin', 'dataMax']}
                      stroke="#6b7280"
                    />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Legend />
                    {companies.slice(0, 5).map((company, idx) => {
                      const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
                      const compData = companyData[company].years.map(y => ({
                        year: y.year,
                        risk: calculateBankruptcyRisk(y) * 100
                      }));
                      return (
                        <Line 
                          key={company}
                          data={compData}
                          type="monotone" 
                          dataKey="risk" 
                          name={company}
                          stroke={colors[idx]}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          isAnimationActive={false}
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankruptcyDashboard;
