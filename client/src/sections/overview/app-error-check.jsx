// import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Popover from '@mui/material/Popover';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AppErrorCheck({ title, subheader, list, ...other }) {


  return (
    <Card {...other} style={{ height: 335, overflow: 'auto' }}>
      <CardHeader title={title} subheader={subheader} />
      
      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={task.done}
        />
      ))}
    </Card>
  );
}

AppErrorCheck.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked }) {
  // const [open, setOpen] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  // const handleEdit = () => {
  //   handleCloseMenu();
  //   console.info('EDIT', task.id);
  // };

  // const handleDelete = () => {
  //   handleCloseMenu();
  //   console.info('DELETE', task.id);
  // };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 3,
          pr: 3,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >

        <Typography variant="header6" sx={{ flexGrow: 1, m: 0 }}> 
          {task.name}
        </Typography>

        <Typography variant="caption">
          {task.timestamp}
        </Typography>
        

        {/* <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
      </Stack>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>


        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  task: PropTypes.object,
};
