import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';
import { getStatus } from '../api/getStatus';

export async function createPerson(name: string, age: number){
  const avatar = createAvatar(style, {
    seed: `${name} ${age}`,
  });
  let status = '-';
  
  try {
    const { answer } = await getStatus();
    status = answer === 'yes' ? 'Active' : '-';
  } catch (err) {
    console.log('Loading status error');
  }

  return {
    avatar,
    name,
    age,
    status,
    date: Date.now(),
  };
}
