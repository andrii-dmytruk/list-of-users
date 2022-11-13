import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortPeople } from '../../helpers/sortPeople';
import { Person } from '../../types/Person';
import { SortTypes } from '../../types/sortTypes';

let peopleFromStorage;

if (localStorage.getItem('people')) {
  peopleFromStorage = JSON.parse(localStorage.getItem('people') as string);
} else {
  localStorage.setItem('people', JSON.stringify([]));
}

const initPeople: Person[] = peopleFromStorage || [];

const peopleSlice = createSlice({
  name: 'people',
  initialState: initPeople,
  reducers: {
    add: (people, action: PayloadAction<Person>) => {
      people.push(action.payload);
    },
    delete: (people, action: PayloadAction<Person>) => {
      return people.filter(person => person.date !== action.payload.date);
    },
    update: (people, action: PayloadAction<Person>) => {
      const {
        date,
        name,
        age,
      } = action.payload;
      const changePerson = people.find(person => person.date === date);

      if (changePerson) {
        changePerson.name = name;
        changePerson.age = age;
      }

    },
    sort: (people, action: PayloadAction<SortTypes>) => sortPeople(people, action.payload),
  }
});

export default peopleSlice.reducer;
export const { actions } = peopleSlice;
