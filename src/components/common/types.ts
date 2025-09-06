// src/components/common/types.ts
export interface TestConfig {
  [key: number]: {
    scale: string;
    validAnswer: string;
  };
}

export interface Scores {
  X: number;
  XXX: number;
  XX: number;
}

export interface TestResult {
  subjectCode: string;
  Duty:string;
  scores: Scores;
  personalityType: string;
  description: string;
  isReliable: boolean;
  timestamp: string;
  isComplete: boolean;
  completionPercentage: number;
}

export interface Answers {
  [key: number]: string;
}

export interface PersonalityDescriptions {
  [key: string]: string[];
}

export type AppView = "home" | "test" | "results" | "search" | "subjects";