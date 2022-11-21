import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './features/people';

const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

store.subscribe(() => {
  const { people } = store.getState();

  localStorage.setItem('people', JSON.stringify(people.people));
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
