export interface Response {
  grammar: string[];
  nextScene: string;
}

export interface Scene {
  name: string;
  description: string;
  responses?: Response[];
  nextScene?: string;
  ending?: boolean;
}

export interface StorySchema {
  scenes: Scene[];
}
