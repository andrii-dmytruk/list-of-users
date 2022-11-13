import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


import './PeoplePage.scss';
import { SortTypes } from '../../types/sortTypes';
import { Person } from '../../types/Person';
import { PeopleTable } from '../../components/PeopleTable';
import { sortPeople } from '../../helpers/sortPeople';
import { createPerson } from '../../helpers/createPerson';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actions } from '../../redux/features/people';


const people: Person[] = [
  createPerson('Oleg', 30, 'Active'),
  createPerson('Artem', 41, 'Active'),
  createPerson('Vlad', 32, 'Active'),
  createPerson('Denis', 45, 'Active'),
  createPerson('Anya', 10, 'Active'),
  createPerson('Zara', 60, 'Active'),
];


export const PeoplePage = React.memo(function PeoplePage() {
  const dispatch = useAppDispatch();
  const sortedPeople = useAppSelector(state => state.people);

  const [sortBy, setSortBy] = useState<SortTypes>(SortTypes.date);



  useEffect(() => {
    dispatch(actions.sort(sortBy));
  }, [sortBy]);

  const handleSortButtonClick = (sortType: SortTypes) => {
    if (sortBy === sortType) {
      setSortBy(SortTypes.date);
      return;
    }

    setSortBy(sortType);
  };
  
  return (
    <>
      <div className="tablePage">
        <h1 className="title">People Table</h1>
        <Stack
          direction="row"
          marginBottom="20px"
          justifyContent="space-between"
        >
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <span className="secondary-text">Sort By:</span>
            <Button
              variant={sortBy === SortTypes.name ? 'contained' : 'outlined'}
              onClick={() => handleSortButtonClick(SortTypes.name)}
            >
            Name
            </Button>
            <Button
              variant={sortBy === SortTypes.age ? 'contained' : 'outlined'}
              onClick={() => handleSortButtonClick(SortTypes.age)}
            >
            Age
            </Button>
            {sortBy !== SortTypes.date && (
              <Button
                variant="text"
                color="error"
                onClick={() => setSortBy(SortTypes.date)}
              >
            Clear
              </Button>
            )}
          </Stack>

          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            
          >
            Add new person
          </Button>
        </Stack>

        <PeopleTable people={sortedPeople} />
      </div>
    </>
  );
});
