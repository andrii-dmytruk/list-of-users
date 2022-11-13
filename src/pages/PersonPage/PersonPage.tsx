import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Person } from '../../types/Person';
import { PageNotFound } from '../PageNotFound';

import TextField from '@mui/material/TextField';
import './PersonPage.scss';
import { Button } from '@mui/material';
import { actions } from '../../redux/features/people';
import { createPerson } from '../../helpers/createPerson';



export const PersonPage = React.memo(function PersonPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const people = useAppSelector(state => state.people);

  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [nameValue, setNameValue] = useState<string>('');
  const [ageValue, setAgeValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  useEffect(() => {
    if (id.length) {
      const editablePerson = people.find(person => person.date === +id);
      if (editablePerson) {
        setCurrentPerson(editablePerson);
        setNameValue(editablePerson.name);
        setAgeValue(editablePerson.age.toString());
      }
    }
  }, []);

  const handleNameInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(() => event.target.value);
  }, []);

  const handleAgeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= 0) {
      setAgeValue(() => event.target.value);
    }
  }, []);

  const handleApplyBtn = async () => {
    const name = nameValue;
    const age = +ageValue;

    if (!name.length) {
      setNameError(true);
      return;
    }

    if (currentPerson) {
      dispatch(actions.update({...currentPerson, name, age}));
    } else {
      setLoading(() => true);
      const newPerson = await createPerson(name, age);

      dispatch(actions.add(newPerson));
    }

    navigate('/');
  };


  const handleDiscardBtn = async () => {
    navigate('/');
  };

  if (id.length && !currentPerson) {
    return <PageNotFound />;
  }

  return (
    <>
      <h1 className="title">
        {id.length ? 'Edit person' : 'Create person'}
      </h1>

      <div className="inputs">
        <TextField
          required
          error={nameError}
          id="outlined-required"
          label="Name"
          value={nameValue}
          onChange={handleNameInput}
        />
        <TextField
          required
          id="standard-number"
          label="Age"
          type="number"
          value={ageValue}
          onChange={handleAgeInput}
        />
        
        <Button
          disabled={loading}
          variant="contained"
          color="success"
          onClick={handleApplyBtn}
        >
          Apply
        </Button>
        <Button
          disabled={loading}
          variant="outlined"
          color="error"
          onClick={handleDiscardBtn}
        >
          Discard
        </Button>
      </div>
    </>
  );
});
