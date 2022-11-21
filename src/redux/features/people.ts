import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPeople } from '../../helpers/createPerson';
import { sortPeople } from '../../helpers/sortPeople';
import { Person } from '../../types/Person';
import { SortTypes } from '../../types/sortTypes';

let peopleFromStorage;

if (localStorage.getItem('people')) {
  peopleFromStorage = JSON.parse(localStorage.getItem('people') as string);
} 

export interface State {
  people: Person[];
  status: 'succeeded' | 'loading' | 'failed';
}

const initPeople: State = {
  people: peopleFromStorage || [],
  status: 'succeeded',
};

export const fetchPeople =  createAsyncThunk(
  'users/fetchPeople',
  async () => {
    const people = await createPeople();

    return people;
  },
);


const peopleSlice = createSlice({
  name: 'people',
  initialState: initPeople,
  reducers: {
    add: (state, action: PayloadAction<Person>) => {
      state.people.push(action.payload);
    },
    delete: (state, action: PayloadAction<Person>) => {
      state.people = state.people.filter(person => person.date !== action.payload.date);
    },
    update: (state, action: PayloadAction<Person>) => {
      const {
        date,
        name,
        age,
      } = action.payload;
      const changePerson = state.people.find(person => person.date === date);

      if (changePerson) {
        changePerson.name = name;
        changePerson.age = age;
      }

    },
    sort: (state, action: PayloadAction<SortTypes>) => {
      state.people = sortPeople(state.people, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people = action.payload;
      })
      .addCase(fetchPeople.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default peopleSlice.reducer;
export const { actions } = peopleSlice;
