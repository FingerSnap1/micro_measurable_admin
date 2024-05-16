import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { todayDate } from 'src/utils/format-time';

import { calculateBattery, changeBatteryDate } from './utils';



// ----------------------------------------------------------------------

export default function AppNodeState({ battery, icon, sx, ...other }) {

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 3,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={0.5}>
      <Typography sx={{ fontSize: '0.8rem' }}>{ todayDate() }</Typography>
      <Stack spacing={0.5} direction="row">
      <Typography variant="h5"> Active </Typography>
      
      <Typography variant="h5"> {`| ${ calculateBattery( battery ) ?? '0'} % `}</Typography>
      {icon}
      </Stack>
      <Typography sx={{ fontSize: '0.8rem' }} >{ `예상 배터리 교체일: ${ changeBatteryDate(battery) }` }</Typography>
      </Stack>
    </Card>
  );
}

AppNodeState.propTypes = {
  battery: PropTypes.any,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
};
