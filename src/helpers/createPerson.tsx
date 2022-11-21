import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';
import { getStatus } from '../api/getStatus';
import { v4 as uuidv4 } from 'uuid';

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
    id: uuidv4(),
    avatar,
    name,
    age,
    status,
    date: Date.now(),
  };
}


export function createPeople() {
  const creators = [
    createPerson('John Doe', 60),
    createPerson('Alex', 45),
    createPerson('Bob', 20),
    createPerson('Zoe', 30),
    createPerson('Lamar', 10),
    createPerson('Jeff', 17),
    createPerson('Monika', 21),
    createPerson('Jane Doe', 60),
  ];

  return Promise.all(creators);
}
