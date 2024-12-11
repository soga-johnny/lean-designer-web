'use client';

import { useForm } from '@/contexts/FormContext';

const techStackOptions = [
  'React',
  'Vue.js',
  'Angular',
  'Next.js',
  'Nuxt.js',
  'Node.js',
  'Python',
  'Ruby on Rails',
  'PHP',
  'Java',
  'Go',
  'AWS',
  'GCP',
  'Azure',
  'Docker',
  'Kubernetes',
  'その他'
];

const teamStructureOptions = [
  'フロントエンドエンジニア',
  'バックエンドエンジニア',
  'フルスタックエンジニア',
  'デザイナー',
  'プロダクトマネージャー',
  'プロジェクトマネージャー',
  'QAエンジニア',
  'DevOpsエンジニア',
  'その他'
];

const communicationToolOptions = [
  'Slack',
  'Microsoft Teams',
  'Discord',
  'Zoom',
  'Google Meet',
  'メール',
  'その他'
];

const projectManagementToolOptions = [
  'Jira',
  'Trello',
  'Asana',
  'GitHub Projects',
  'Notion',
  'Backlog',
  'その他'
];

export function TechnicalInfoSection() {
  const { formData, setFormData } = useForm();
  const { technicalInfo } = formData;

  const updateTechnicalInfo = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      technicalInfo: {
        ...prev.technicalInfo,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* 技術スタック */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">技術スタック</label>
        <div className="grid grid-cols-3 gap-2">
          {techStackOptions.map((tech) => (
            <label key={tech} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={technicalInfo.techStack.includes(tech)}
                onChange={(e) => {
                  const newTechStack = e.target.checked
                    ? [...technicalInfo.techStack, tech]
                    : technicalInfo.techStack.filter(t => t !== tech);
                  updateTechnicalInfo('techStack', newTechStack);
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm">{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* チーム構成 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">チーム構成</label>
        <div className="grid grid-cols-2 gap-2">
          {teamStructureOptions.map((role) => (
            <label key={role} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={technicalInfo.teamStructure.includes(role)}
                onChange={(e) => {
                  const newTeamStructure = e.target.checked
                    ? [...technicalInfo.teamStructure, role]
                    : technicalInfo.teamStructure.filter(r => r !== role);
                  updateTechnicalInfo('teamStructure', newTeamStructure);
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm">{role}</span>
            </label>
          ))}
        </div>
      </div>

      {/* コミュニケーションツール */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">コミュニケーションツール</label>
        <div className="grid grid-cols-2 gap-2">
          {communicationToolOptions.map((tool) => (
            <label key={tool} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={technicalInfo.communicationTools.includes(tool)}
                onChange={(e) => {
                  const newTools = e.target.checked
                    ? [...technicalInfo.communicationTools, tool]
                    : technicalInfo.communicationTools.filter(t => t !== tool);
                  updateTechnicalInfo('communicationTools', newTools);
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm">{tool}</span>
            </label>
          ))}
        </div>
      </div>

      {/* プロジェクト管理ツール */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">プロジェクト管理ツール</label>
        <div className="grid grid-cols-2 gap-2">
          {projectManagementToolOptions.map((tool) => (
            <label key={tool} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={technicalInfo.projectManagementTools.includes(tool)}
                onChange={(e) => {
                  const newTools = e.target.checked
                    ? [...technicalInfo.projectManagementTools, tool]
                    : technicalInfo.projectManagementTools.filter(t => t !== tool);
                  updateTechnicalInfo('projectManagementTools', newTools);
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm">{tool}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 現状の課題 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">現状の課題</label>
        <textarea
          value={technicalInfo.currentIssues}
          onChange={(e) => updateTechnicalInfo('currentIssues', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
          placeholder="現在のプロジェクトで直面している技術的な課題があれば記入してください"
        />
      </div>
    </div>
  );
} 