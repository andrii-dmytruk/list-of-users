import React from 'react';

import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SVG from 'react-inlinesvg';
import { styled, withStyles } from '@mui/styles';
import { Person } from '../../types/Person';
import { NavLink } from 'react-router-dom';

type Props = {
  people: Person[];
  onDelete: (person: Person) => void;
}

export const PeopleTable = React.memo(function PeopleTable({
  people,
  onDelete,
}: Props) {
  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#f5f5f5',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableHead = withStyles(() => ({
    root: {
      backgroundColor: '#212121'
    }
  }))(TableHead);
  
  const TableHeaderCell = withStyles(() => ({
    root: {
      color: 'white',
      fontWeight: 'bold',
    }
  }))(TableCell);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell align="left">Avatar</TableHeaderCell>
            <TableHeaderCell align="left">Name</TableHeaderCell>
            <TableHeaderCell align="left">Age</TableHeaderCell>
            <TableHeaderCell align="left">Status</TableHeaderCell>
            <TableHeaderCell
              align="center"
              style={{width: '100px'}}
            >
                  Actions
            </TableHeaderCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {people.map((person, i) => (
            <StyledTableRow key={person.id}>
              <TableCell component="th" scope="person">
                {i + 1}
              </TableCell>
              <TableCell align="left">
                <SVG
                  src={person.avatar}
                  width={40}
                />
              </TableCell>
              <TableCell align="left">{person.name}</TableCell>
              <TableCell align="left">{person.age}</TableCell>
              <TableCell align="left">{person.status}</TableCell>
              <TableCell align="left">
                <Stack direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <NavLink
                    to={`edit-person/${person.date}`}
                  >
                    <IconButton aria-label="delete">
                      <EditIcon color="info" />
                    </IconButton>
                  </NavLink>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(person)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Stack>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
