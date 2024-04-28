import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function RawDataTableRow({
  date, 
  location,
  pm25,
  pm10,
  ch2o,
  temperature,
  humidity,
  wind_direction,
  wind_speed
}) {


  return (
      <TableRow hover>

        <TableCell align="center">{date}</TableCell>

        <TableCell align="center">{location}</TableCell>

        <TableCell align="center">{pm25}</TableCell>

        <TableCell align="center">{pm10}</TableCell>

        <TableCell align="center">{ch2o}</TableCell>

        <TableCell align="center">{temperature}</TableCell>

        <TableCell align="center">{humidity}</TableCell>

        <TableCell align="center">{wind_direction}</TableCell>

        <TableCell align="center">{wind_speed}</TableCell>

        
      </TableRow>

  );
}

RawDataTableRow.propTypes = {
  date: PropTypes.any,
  location: PropTypes.any,
  pm25: PropTypes.any,
  pm10: PropTypes.any,
  ch2o: PropTypes.any,
  temperature: PropTypes.any,
  humidity: PropTypes.any,
  wind_direction: PropTypes.any,
  wind_speed: PropTypes.any,
};
