import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import './PeoplePage.scss';
import { SortTypes } from '../../types/sortTypes';
import { Person } from '../../types/Person';
import { PeopleTable } from '../../components/PeopleTable';
import { sortPeople } from '../../helpers/sortPeople';



function createData(id: number, avatar: string, name: string, age: number, status: 'Active' | '-'){
  return { id, avatar, name, age, status };
}

const people: Person[] = [
  createData(1, 'avatar', 'Oleg', 30, 'Active'),
  createData(2, 'avatar', 'Artem', 41, 'Active'),
  createData(5, 'avatar', 'Vlad', 32, 'Active'),
  createData(3, 'avatar', 'Denis', 45, 'Active'),
  createData(8, 'avatar', 'Anya', 10, 'Active'),
  createData(6, 'avatar', 'Zara', 60, 'Active'),
];


export const PeoplePage = React.memo(function PeoplePage() {
  const [sortBy, setSortBy] = useState<SortTypes>(SortTypes.id);
  const [sortedPeople, setSortedPeople] = useState<Person[]>(sortPeople(people, sortBy));

  useEffect(() => {
    setSortedPeople(sortPeople(sortedPeople, sortBy));
  }, [sortBy]);

  const handleSortButtonClick = (sortType: SortTypes) => {
    if (sortBy === sortType) {
      setSortBy(SortTypes.id);
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
            {sortBy !== SortTypes.id && (
              <Button
                variant="text"
                color="error"
                onClick={() => setSortBy(SortTypes.id)}
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
