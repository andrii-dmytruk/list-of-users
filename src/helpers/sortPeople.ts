import { Person } from '../types/Person';
import { SortTypes } from '../types/sortTypes';

export function sortPeople(people: Person[], sortBy: SortTypes) {
  switch (sortBy) {
  case SortTypes.name:
    return [...people].sort((person1, person2) => person1.name.localeCompare(person2.name));
  case SortTypes.age:
    return [...people].sort((person1, person2) => person1.age - person2.age);
  case SortTypes.date:
    return [...people].sort((person1, person2) => person1.date - person2.date);
  default:
    return [...people];
  }
}
