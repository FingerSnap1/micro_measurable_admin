import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import useErrorDataStore from 'src/store/errorDataStore';

import Scrollbar from 'src/components/scrollbar';

import { emptyRows} from '../utils';
import ErrorTableRow from '../error-table-row';
import ErrorTableHead from '../error-table-head';
import TableEmptyRows from '../table-empty-rows';
import ErrorTableSelection from '../error-table-selection';

// ----------------------------------------------------------------------

export default function ErrorDataView() {

  const { selectedErrorData, selectedLocation } = useErrorDataStore();

  const [tableData, setTableData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('date');

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

  useEffect(() => {
    // if(selectedLocation === '전체'){
    //   setTableData(selectedErrorData);
    //   console.log("전체", selectedErrorData);
    // }
    // else{
    //   console.log(selectedLocation, selectedErrorData);
    //   setTableData(selectedErrorData.filter(row => row.nodeInfo.location === selectedLocation));
    // }

    console.log("selectedErrorData",selectedErrorData);
    setTableData(selectedErrorData);

  }, [selectedLocation, selectedErrorData]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Error Data</Typography>
      </Stack>

      <Card>

        <ErrorTableSelection/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ErrorTableHead
                order={order}
                orderBy={orderBy}
                rowCount={tableData.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'done', label: '처리여부' },
                  { id: 'date', label: '측정일시'},
                  { id: 'errorMsg', label: '에러메시지'},
                  { id: 'loraContent', label: '데이터'},
                  { id: 'errorCause', label: '에러원인'},
                  { id: 'solution', label: '해결방안' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ErrorTableRow
                      key={row.id}
                      id={row.id}
                      done={row.done.toString()}
                      date={`${row.date} ${row.timestamp}`}
                      errorMsg={row.errMsg}
                      loraContent={row.loraContent}
                      errorCause={row.errCause}
                      solution={row.solution}
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
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
