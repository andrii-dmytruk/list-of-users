import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPerson } from '../../helpers/createPerson';
import { sortPeople } from '../../helpers/sortPeople';
import { Person } from '../../types/Person';
import { SortTypes } from '../../types/sortTypes';

const initPeople: Person[] = [];

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
        status,
      } = action.payload;
      const newPeople = people.filter(person => person.date !== date);
      const changedPerson = createPerson(name, age, status);

      newPeople.push(changedPerson);

      return newPeople;
    },
    sort: (people, action: PayloadAction<SortTypes>) => sortPeople(people, action.payload),
  }
});

export default peopleSlice.reducer;
export const { actions } = peopleSlice;
