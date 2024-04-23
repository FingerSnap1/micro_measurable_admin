import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import NavigationIcon from '@mui/icons-material/Navigation';

import { primary } from 'src/theme/palette';

// ----------------------------------------------------------------------

export default function AppWindDirectionStatus({ title, subheader, ...other }) {


  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <NavigationIcon style={{ color: primary, fontSize: 40, transform: 'rotate(90deg)' }} />
      </Box>
    </Card>
  );
}

AppWindDirectionStatus.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
