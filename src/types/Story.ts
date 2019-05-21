import { Scene } from 'types/StorySchema';

export interface StateDescriptor {
  running: boolean;
  scene: Scene;
  description?: string;
}
