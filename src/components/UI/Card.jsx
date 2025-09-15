import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

const Card = ({ title, value, change, icon: Icon, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.type === 'increase' ? '+' : '-'}
                {Math.abs(change.value)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="flex items-center justify-center h-12 w-12 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
