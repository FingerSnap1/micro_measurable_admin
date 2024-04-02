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

import { useNodeInfo } from 'src/hooks/useNodeInfo';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function NodeTableRow({
  id,
  nodeAddress,
  selected,
  location,
  latitude,
  longitude,
  battery,
  status,
  handleClick,
}) {

  const { deleteNodeMutation } = useNodeInfo();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteButton = () => {
    deleteNodeMutation.mutate(id);
    console.log(id);
    setOpen(null);
  }

  const navigate = useNavigate();

  const handleModifyButton = () => {
    setOpen(null);
    navigate(
      'modify', 
      { state: { 
        id,
        nodeAddress,
        location,
        longitude,
        latitude,
      } }
    );
  }



  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none" align="center" >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={location} src="/assets/images/node.png" />
            <Typography variant="subtitle2" noWrap>
              {location}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{battery}</TableCell>

        <TableCell align="center">
          <Label color={(status === 'error' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="center">{latitude}</TableCell>

        <TableCell align="center">{longitude}</TableCell>

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

NodeTableRow.propTypes = {
  id: PropTypes.any,
  nodeAddress: PropTypes.any,
  handleClick: PropTypes.func,
  battery: PropTypes.any,
  location: PropTypes.any,
  latitude: PropTypes.any,
  longitude: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
