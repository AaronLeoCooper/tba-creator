export interface DictionaryItem {
  name: string;
  aka: string[];
}

export interface DictionarySchema {
  [key: string]: DictionaryItem[];
}
