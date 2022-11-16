const API = 'https://yesno.wtf/api';

export async function getStatus() {
  const data = await fetch(API);

  return data.json();
}
