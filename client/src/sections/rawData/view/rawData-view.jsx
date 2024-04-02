import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRawData } from 'src/hooks/useRawData';

import { rawData } from 'src/_mock/rawData';
import useRawDataStore from 'src/store/rawDataStore';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils';
import TableEmptyRows from '../table-empty-rows';
import RawDataTableRow from '../rawData-table-row';
import RawDataTableHead from '../rawData-table-head';
import RawDataTableSelection from '../rawData-table-selection';


// ----------------------------------------------------------------------

export default function RawDataView() {

  const { isPending, error, data } = useRawData();
  const { setRawData } = useRawDataStore();
  
  useEffect(() => {
    if (!isPending && !error && data) {
      console.log("hello");
      console.log(data.data);
      setRawData(data.data);
    }
  }, [isPending, error, data,setRawData]);


  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Raw Data</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Node
        </Button>
      </Stack>

      <Card>
        <RawDataTableSelection/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <RawDataTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'date', label: '측정 일시'},
                  { id: 'location', label: '측정 위치'},
                  { id: 'pm25', label: '초미세먼지' },
                  { id: 'pm10', label: '미세먼지' },
                  { id: 'ch2o', label: '포름알데히드' },
                  { id: 'temperature', label: '온도' },
                  { id: 'humidity', label: '습도' },
                  { id: 'wind_direction', label: '풍향' },
                  { id: 'wind_speed', label: '풍속' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {rawData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <RawDataTableRow
                      key={row.id}
                      date={row.date}
                      location={row.location}
                      pm25={row.pm25}
                      pm10={row.pm10}
                      ch2o={row.ch2o}
                      temperature={row.temperature}
                      humidity={row.humidity}
                      wind_direction={row.wind_direction}
                      wind_speed={row.wind_speed}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, rawData.length)}
                />

              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={rawData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
