interface SceneOptions {
  preDelayMs: number;
  postDelayMs: number;
}

interface InputOptions {
  caseSensitive: boolean;
  quitPhrases: string[];
  unknownPhraseWarnings: string[];
}

interface Options {
  scene: SceneOptions;
  input: InputOptions;
}

interface Description {
  name: string;
  about: string;
}

export interface MainSchema {
  description: Description;
  options: Options;
}
