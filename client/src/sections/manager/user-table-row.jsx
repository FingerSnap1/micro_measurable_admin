import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useManagerInfo } from 'src/hooks/useManagerInfo';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  managerName,
  avatarUrl,
  email,
  nodeAddress,
  location,
  handleClick,
}) {

  const { deleteManagerMutation } = useManagerInfo();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const navigate = useNavigate();

  const handleModifyButton = () => {
    setOpen(null);
    navigate(
      'modify', 
      { state: { 
        id,
        managerName,
        email,
        nodeAddress,
      } }
    );
  }

  const handleDeleteButton = () => {
    deleteManagerMutation.mutate(id);
    console.log(id);
    setOpen(null);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={managerName} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {managerName}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell>{email}</TableCell>
        <TableCell>{nodeAddress}</TableCell>
        <TableCell>{location}</TableCell>

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

        <MenuItem onClick={handleDeleteButton} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  managerName: PropTypes.any,
  nodeAddress: PropTypes.any,
  location: PropTypes.any,
  email: PropTypes.any,
  selected: PropTypes.any,
};
