
export enum CharacterRole {
  MAIN = '主角团',
  SUPPORT = '配角 / NPC',
  SPECIAL = '特殊 / 隐藏',
  SYSTEM = '游戏系统 & 节日'
}

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  locations: string[];
  avatarUrl: string; 
  description: string;
  guideSteps: string[];
  tips?: string[];
  unlockConditions?: string;
  routes?: {
    name: string;
    steps: string[];
  }[];
  images?: string[]; // 用于图片轮播功能
}

export interface HackerCode {
  code: string;
  answer: string;
  meaning: string;
}

export interface UpdateLog {
  version: string;
  date: string;
  changes: string[];
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CHARACTER_LIST = 'CHARACTER_LIST',
  VACATION_GUIDES = 'VACATION_GUIDES',
  HACKER_TOOL = 'HACKER_TOOL',
  GAME_GUIDES = 'GAME_GUIDES',
  FESTIVALS = 'FESTIVALS',
  SPECIAL_EVENTS = 'SPECIAL_EVENTS',
  BASIC_GUIDES = 'BASIC_GUIDES',
  FAQ = 'FAQ',
  FULL_EFFECTS = 'FULL_EFFECTS',
  LOCALIZATION_ISSUES = 'LOCALIZATION_ISSUES',
  CHANGELOG = 'CHANGELOG',
  ABOUT = 'ABOUT'
}
