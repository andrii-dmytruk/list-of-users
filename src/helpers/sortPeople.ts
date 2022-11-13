import { Person } from '../types/Person';
import { SortTypes } from '../types/sortTypes';

export function sortPeople(people: Person[], sortBy: SortTypes) {
  switch (sortBy) {
  case SortTypes.name:
    return [...people].sort((a, b) => a.name.localeCompare(b.name));
  case SortTypes.age:
    return [...people].sort((a, b) => a.age - b.age);
  case SortTypes.id:
    return [...people].sort((a, b) => a.id - b.id);
  default:
    return [...people];
  }
}
