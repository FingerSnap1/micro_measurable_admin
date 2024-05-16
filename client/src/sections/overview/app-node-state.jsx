import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Battery0Bar from '@mui/icons-material/Battery0Bar';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

import { todayDate } from 'src/utils/format-time';

import { calculateBattery, changeBatteryDate } from './utils';



// ----------------------------------------------------------------------

const batteryIcons = {
  0: Battery0Bar,
  10: Battery20Icon,
  20: Battery20Icon,
  30: Battery30Icon,
  40: Battery30Icon,
  50: Battery50Icon,
  60: Battery60Icon,
  70: Battery60Icon,
  80: Battery80Icon,
  90: Battery90Icon,
  100: BatteryFullIcon
};

export function BatteryIcon({ level }) {
  const Icon = batteryIcons[level] || BatteryFullIcon; // Default to BatteryFullIcon if no match
  return <Icon style={{ color: "black", fontSize: 25 }} />;
}

BatteryIcon.propTypes = {
  level: PropTypes.any,
};

export default function AppNodeState({ battery, sx, ...other }) {


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
      <BatteryIcon level={`${ calculateBattery( battery ) ?? '0'}`}/>
      </Stack>
      <Typography sx={{ fontSize: '0.8rem' }} >{ `예상 배터리 교체일: ${ changeBatteryDate(battery) }` }</Typography>
      </Stack>
    </Card>
  );
}

AppNodeState.propTypes = {
  battery: PropTypes.any,
  sx: PropTypes.object,
};
