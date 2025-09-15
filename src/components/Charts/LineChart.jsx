import React from 'react';

const LineChart = ({ data, title, height = 300, color = '#2563EB' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : ((maxValue - point.value) / range) * 80 + 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 relative">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <div style={{ height: height }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#f3f4f6"
              strokeWidth="0.5"
            />
          ))}

          {/* Area fill */}
          <polygon
            points={`0,100 ${points} 100,100`}
            fill={`url(#gradient-${color.replace('#', '')})`}
          />

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = range === 0 ? 50 : ((maxValue - point.value) / range) * 80 + 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill={color}
                className="hover:r-3 transition-all duration-200"
              >
                <title>{`${point.date}: ${point.value}`}</title>
              </circle>
            );
          })}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <span>{data[0]?.date}</span>
        <span>{data[Math.floor(data.length / 2)]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>

      {/* Y-axis labels */}
      <div className="flex flex-col justify-between absolute left-0 top-0 h-full text-xs text-gray-600 -ml-10">
        <span>{maxValue}</span>
        <span>{Math.round((maxValue + minValue) / 2)}</span>
        <span>{minValue}</span>
      </div>
    </div>
  );
};

export default LineChart;
