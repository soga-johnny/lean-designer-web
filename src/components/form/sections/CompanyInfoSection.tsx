'use client';

import { useForm } from '@/contexts/FormContext';
import { useState } from 'react';

const positionOptions = [
  '代表取締役',
  '取締役',
  '事業部長',
  'プロジェクトマネージャー',
  'プロダクトマネージャー',
  'エンジニア',
  'デザイナー',
  'その他'
];

const referralOptions = [
  'Web検索',
  'SNS',
  '知人の紹介',
  'メディア記事',
  '展示会・イベント',
  'その他'
];

export function CompanyInfoSection() {
  const { formData, setFormData } = useForm();
  const { companyInfo } = formData;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateCompanyInfo = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value
      }
    }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({
        ...prev,
        email: '有効なメールアドレスを入力してください'
      }));
    }
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#61585A] bg-white dark:bg-[#231F1F] focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#6B4A4F]/20 text-text dark:text-text-dark placeholder-gray-400 dark:placeholder-text-gray";
  const checkboxClasses = "rounded border-gray-300 dark:border-[#61585A] text-primary dark:text-primary-dark focus:ring-primary/20 dark:focus:ring-[#6B4A4F]/20";
  const labelClasses = "text-sm text-text dark:text-text-dark";

  return (
    <div className="space-y-8">
      {/* ご担当者様 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          ご担当者様
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={companyInfo.personInCharge}
          onChange={(e) => updateCompanyInfo('personInCharge', e.target.value)}
          className={inputClasses}
          placeholder="例：山田 太郎"
          required
        />
      </div>

      {/* 役職 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          役職
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={companyInfo.position}
          onChange={(e) => updateCompanyInfo('position', e.target.value)}
          className={inputClasses}
          required
        >
          <option value="">選択してください</option>
          {positionOptions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </div>

      {/* 会社名 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          会社名
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={companyInfo.companyName}
          onChange={(e) => updateCompanyInfo('companyName', e.target.value)}
          className={inputClasses}
          placeholder="例：株式会社サンプル"
          required
        />
      </div>

      {/* メールアドレス */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          メールアドレス
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          value={companyInfo.email}
          onChange={(e) => updateCompanyInfo('email', e.target.value)}
          onBlur={(e) => validateEmail(e.target.value)}
          className={`${inputClasses} ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
          placeholder="例：example@company.com"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* サービスを知ったきっかけ */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          サービスを知ったきっかけ
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {referralOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={companyInfo.referralSource.includes(option)}
                onChange={(e) => {
                  const newSources = e.target.checked
                    ? [...companyInfo.referralSource, option]
                    : companyInfo.referralSource.filter(s => s !== option);
                  updateCompanyInfo('referralSource', newSources);
                }}
                className={checkboxClasses}
              />
              <span className={labelClasses}>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 必須項目の注意書き */}
      <p className="text-sm text-red-500">
        * の項目は必須入力です
      </p>
    </div>
  );
} 