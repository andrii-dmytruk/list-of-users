import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';

export function createPerson(name: string, age: number, status: 'Active' | '-'){
  const avatar = createAvatar(style, {
    seed: `${name} ${age}`,
  });

  return {
    avatar,
    name,
    age,
    status,
    date: Date.now(),
  };
}
