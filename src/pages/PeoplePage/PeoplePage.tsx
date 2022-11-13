import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


import './PeoplePage.scss';
import { SortTypes } from '../../types/sortTypes';
import { Person } from '../../types/Person';
import { PeopleTable } from '../../components/PeopleTable';
import { createPerson } from '../../helpers/createPerson';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actions } from '../../redux/features/people';


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

  const handleAddPersonButton = async () => {
    const newPerson = await createPerson('Oleg', 30);
    dispatch(actions.add(newPerson));
  };

  const handleDeletePersonButton = (person: Person) => {
    dispatch(actions.delete(person));
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
            onClick={handleAddPersonButton}
          >
            Add new person
          </Button>
        </Stack>

        <PeopleTable people={sortedPeople} onDelete={handleDeletePersonButton} />
      </div>
    </>
  );
});
