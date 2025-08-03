'use client';

import { useState, useEffect } from 'react';
import { QuestionOption } from '@/types/form';

interface QuestionCardProps {
  title: string;
  options: QuestionOption[];
  showOther?: boolean;
  value?: string;
  otherText?: string;
  onChange: (value: string, otherText?: string) => void;
}

export function QuestionCard({ 
  title, 
  options, 
  showOther = false, 
  value = '', 
  otherText = '',
  onChange 
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState(value);
  const [otherInputText, setOtherInputText] = useState(otherText);
  const [showOtherInput, setShowOtherInput] = useState(false);

  useEffect(() => {
    setSelectedValue(value);
    setOtherInputText(otherText);
    setShowOtherInput(value === 'other' && showOther);
  }, [value, otherText, showOther]);

  const handleOptionChange = (optionValue: string) => {
    setSelectedValue(optionValue);
    
    if (optionValue === 'other' && showOther) {
      setShowOtherInput(true);
      onChange(optionValue, otherInputText);
    } else {
      setShowOtherInput(false);
      onChange(optionValue);
    }
  };

  const handleOtherTextChange = (text: string) => {
    if (text.length <= 120) {
      setOtherInputText(text);
      onChange(selectedValue, text);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      
      {/* Question Title */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
        {title}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
              ${selectedValue === option.value
                ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }
            `}
          >
            <input
              type="radio"
              name="question-option"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleOptionChange(option.value)}
              className="sr-only"
            />
            
            <div className={`
              w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
              ${selectedValue === option.value
                ? 'border-gray-900 dark:border-white'
                : 'border-gray-300 dark:border-gray-500'
              }
            `}>
              {selectedValue === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-gray-900 dark:bg-white" />
              )}
            </div>
            
            <span className="text-gray-900 dark:text-white font-medium">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {/* Other Text Input */}
      {showOtherInput && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            その他の内容を入力してください
          </label>
          <textarea
            value={otherInputText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            placeholder="具体的な内容をお聞かせください"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="text-right mt-1">
            <span className={`text-xs ${otherInputText.length > 100 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
              {otherInputText.length}/120
            </span>
          </div>
        </div>
      )}

    </div>
  );
} 