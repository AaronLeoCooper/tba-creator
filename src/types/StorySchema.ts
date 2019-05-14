interface InputResponse {
  grammar: string[];
  nextScene: string;
}

interface Scene {
  name: string;
  description: string;
  responses?: InputResponse[];
  nextScene?: string;
  ending?: boolean;
}

export interface StorySchema {
  scenes: Scene[];
}
