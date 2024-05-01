import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import NavigationIcon from '@mui/icons-material/Navigation';

import { secondary } from 'src/theme/palette';

import { windDirectionValueToAngle } from './utils';

// ----------------------------------------------------------------------

export default function AppWindDirectionStatus({ value, ...other }) {

  return (
    <Card {...other}>
      <CardHeader title="풍향" subheader={value} />

      <Box sx={{ p: 3, pb: 1 }}>
        <NavigationIcon style={{ color: secondary, fontSize: 40, transform: `rotate(${windDirectionValueToAngle[value]}deg)` }} />
      </Box>
    </Card>
  );
}

AppWindDirectionStatus.propTypes = {
  value: PropTypes.string,
};
