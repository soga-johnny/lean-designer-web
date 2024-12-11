export type FormData = {
  // Section 1: 基本情報
  basicInfo: {
    serviceName: string;
    serviceGoals: string[];
    targetUser: string;
    expectedEffect: string;
    budget: string;
    developmentPeriod: string;
    constraints: string[];
    qualityRequirements: string;
    seoImportance: string;
    otherRequirements: string[];
  };
  // Section 2: 詳細要件
  technicalInfo: {
    techStack: string[];
    teamStructure: string[];
    communicationTools: string[];
    projectManagementTools: string[];
    currentIssues: string;
  };
  // Section 3: デザイン要件
  designInfo: {
    persona: string;
    customerJourney: string;
    marketPositioning: string;
    colorPattern: string;
    designKeywords: string[];
    interaction: string;
  };
  // Section 4: 担当者・会社情報
  companyInfo: {
    personInCharge: string;
    position: string;
    companyName: string;
    email: string;
    referralSource: string[];
  };
}; 