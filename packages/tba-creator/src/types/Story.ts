import { Scene } from './StorySchema';

export interface StateDescriptor {
  running: boolean;
  scene: Scene;
  description?: string;
}
