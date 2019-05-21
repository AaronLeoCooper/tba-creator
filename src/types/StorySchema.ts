interface InputResponse {
  grammar: string[];
  nextScene?: string;
  description?: string;
}

export interface Scene {
  name: string;
  description: string;
  responses?: InputResponse[];
  ending?: boolean;
}

export interface StorySchema {
  scenes: Scene[];
}
