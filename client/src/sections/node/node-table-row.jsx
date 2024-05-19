import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useNodeInfo } from 'src/hooks/useNodeInfo';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { calculateBattery } from './utils';

// ----------------------------------------------------------------------

export default function NodeTableRow({
  id,
  nodeAddress,
  location,
  latitude,
  longitude,
  battery,
}) {

  const { deleteNodeMutation, updateNodeMutation } = useNodeInfo();

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

  const handleResetBattryButton = () => {

    const now = new Date();
    const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC 시간에 9시간을 더합니다.
    const koreanDateISO = koreaTime.toISOString().slice(0, 10);

    console.log(koreanDateISO)
    const newNode = {
      id,
      nodeAddress,
      location,
      latitude,
      longitude,
      battery: koreanDateISO
    };
    updateNodeMutation.mutate(newNode);

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
        battery
      } }
    );
  }

  const batteryPercent = calculateBattery(battery);

  return (
    <>
      <TableRow hover >

        <TableCell component="th" scope="row" padding="none" align="center" >
          <Stack direction="row" alignItems="center" spacing={2} pl={2}>
            <Avatar alt={location} src="/assets/images/node.png" />
            <Typography variant="subtitle2" noWrap>
              {location}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{nodeAddress}</TableCell>

        <TableCell align="center">{ `${batteryPercent}%` }</TableCell>

        <TableCell align="center">
          <Label color={batteryPercent > 0 ? 'success' : 'error'}>
            {batteryPercent > 0 ? 'active' : 'inactive'}
          </Label>
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

        <MenuItem onClick={handleResetBattryButton}>
          <Iconify icon="eva:battery-outline" sx={{ mr: 2 }} />
          Battery
        </MenuItem>

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
  battery: PropTypes.any,
  location: PropTypes.any,
  latitude: PropTypes.any,
  longitude: PropTypes.any,
};
