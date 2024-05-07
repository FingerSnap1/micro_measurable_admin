import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import useRawDataStore from 'src/store/rawDataStore';
// import useNodeInfoStore from 'src/store/nodeInfoStore';

import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils';
import TableEmptyRows from '../table-empty-rows';
import RawDataTableRow from '../rawData-table-row';
import RawDataTableHead from '../rawData-table-head';
import RawDataTableSelection from '../rawData-table-selection';


// ----------------------------------------------------------------------

export default function RawDataView() {

  const { selectedRawData, selectedLocation } = useRawDataStore();
  
  // const { nodes } = useNodeInfoStore();

  // 사용하지 않고, map 함수 사용시, row.nodeInfo.location을 바로 적용하도록 함
  // const nodeLocation = nodes.reduce((acc, row) => {
  //   acc[row.nodeAddress] = row.location;
  //   return acc;
  // }, {});

  const [tableData, setTableData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('date');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    console.log("raw 클릭");
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

  useEffect(() => {
    if(selectedLocation === '전체'){
      setTableData(selectedRawData);
    }
    else{
      console.log(selectedLocation, selectedRawData);
      setTableData(selectedRawData.filter(row => row.nodeInfo.location === selectedLocation));
    }

  }, [selectedLocation, selectedRawData]);
  

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Raw Data</Typography>
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
                ]}
              />
              <TableBody>
                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <RawDataTableRow
                      key={row.id}
                      date={`${row.date} ${row.timestamp}`}
                      location={row.nodeInfo.location}
                      pm25={row['pm2.5']}
                      pm10={row.pm10}
                      ch2o={row.ch2o}
                      temperature={row.temperature}
                      humidity={row.humidity}
                      wind_direction={row['wind-direction']}
                      wind_speed={row['wind-speed']}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />

              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
