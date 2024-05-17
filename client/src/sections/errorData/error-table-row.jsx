import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const FixedTableCell = styled(TableCell)`
    min-width: 100px;
`;

const WideFixedTableCell = styled(TableCell)`
    min-width: 300px;
`;

const DoneCell = styled(TableCell)`
  min-width: 100px;
  color: ${(props) => props.done === 'true' ? 'black' : 'red'};
`;

export default function ErrorTableRow({
  id,
  date,
  done,
  errorMsg,
  loraContent,
  errorCause,
  solution,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const navigate = useNavigate();

  const handleModifyButton = () => {
    console.log("asdfasdf",id);
    setOpen(null);
    navigate(
      'modify', 
      { state: { 
        id,
        date,
        done,
        errorMsg,
        loraContent,
        errorCause,
        solution,
      } }
    );
  }


  return (
    <>
      <TableRow hover tabIndex={-1}>

      <DoneCell align="center" done={done}>{done === 'true' ? "완료": "미완료"}</DoneCell>

        <WideFixedTableCell align="center">{date}</WideFixedTableCell>

        <WideFixedTableCell align="center">{errorMsg}</WideFixedTableCell>

        <WideFixedTableCell align="center">{loraContent}</WideFixedTableCell>

        <WideFixedTableCell align="center">{errorCause}</WideFixedTableCell>

        <FixedTableCell align="center">{solution}</FixedTableCell>

        

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleModifyButton}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        {/* <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}


ErrorTableRow.propTypes = {
  id: PropTypes.any,
  date: PropTypes.any,
  errorMsg: PropTypes.any,
  loraContent: PropTypes.any,
  errorCause: PropTypes.any,
  solution: PropTypes.any,
  done: PropTypes.any,
};
