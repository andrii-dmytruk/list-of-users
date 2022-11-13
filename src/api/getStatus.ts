const API = 'https://yesno.wtf/api';

export function getStatus() {
  return fetch(API).then(res => res.json());
}
