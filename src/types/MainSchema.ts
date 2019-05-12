export interface SceneOptions {
  preDelayMs: number;
  postDelayMs: number;
}

export interface InputOptions {
  caseSensitive: boolean;
  quitPhrases: string[];
  unknownPhraseWarnings: string[];
}

export interface Options {
  scene: SceneOptions;
  input: InputOptions;
}

export interface Description {
  name: string;
  about: string;
}

export interface MainSchema {
  description: Description;
  options: Options;
}
