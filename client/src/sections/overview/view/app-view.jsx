import React, { useState, useEffect } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Battery60Icon from '@mui/icons-material/Battery60';

import googleMapID from 'src/config/googleMapId';
import useErrorDataStore from "src/store/errorDataStore";

import GoogleMap from 'src/components/map/googleMap';

import AppTasks from '../app-tasks';
import AppWidgetSummary from '../app-widget-summary';
import AppSubstanceState from "../app-substance-status";
import AppWindDirectionStatus from '../app-wind-direction-status';


// ----------------------------------------------------------------------

export default function AppView() {
  const { errorData } = useErrorDataStore();

  const [errorDataList, setErrorDataList] = useState([]);

  useEffect(() => {
    const filteredAndMappedList = errorData
      .filter(item => !item.done) // Filter out items where done is false
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp)) // Sort by timestamp
      .map(item => ({ id: item.id, name: item.errMsg })); // Map to the required format

      setErrorDataList(filteredAndMappedList);
  }, [errorData]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        
        <Grid xs={12} md={6} lg={8}>
          <Wrapper apiKey={googleMapID}>
            <GoogleMap options={{ disableDefaultUI: true, zoomControl: false }}/>
          </Wrapper>
        </Grid>

        <Grid container direction="column" spacing={3} xs={12} md={6} lg={4}>
          <Grid item>
            <AppWidgetSummary
              title="Weekly Sales"
              total={714000}
              color="success"
              icon={ <Battery60Icon style={{ color: "black", fontSize: 25,}}/>}
            />
          </Grid>

           <Grid item>
          <AppTasks
            title="에러 데이터 체크 리스트"
            list={ errorDataList }
          />
        </Grid>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="PM2.5"
            subheader="36 ppm : 나쁨"
            chart={{
              labels: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                
              ],
              series: [
                
                {
                  name: 'pm2.5',
                  type: 'line',
                  fill: 'solid',
                  data: [20, 20, 20, 20, 25, 25, 27, 27, 29, 35, 36,36],
                },
              ],
            }}
          />
        </Grid>
        

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="PM10"
            subheader="300 ppm : 매우나쁨"
            chart={{
              labels: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
              ],
              series: [
                
                {
                  name: 'pm2.5',
                  type: 'line',
                  fill: 'solid',
                  data: [250, 265, 263, 288, 302, 303, 312, 318, 305, 321, 300],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="온도"
            subheader="16 °C"
            chart={{
              labels: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
              ],
              series: [
                
                {
                  name: 'temperature',
                  type: 'line',
                  fill: 'solid',
                  data: [12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 16],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="습도"
            subheader="73%"
            chart={{
              labels: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
              ],
              series: [
                
                {
                  name: 'pm2.5',
                  type: 'line',
                  fill: 'solid',
                  data: [75, 75, 70, 70, 70, 70, 64, 65, 65, 60,55],
                }, 
              ],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="포름알데히드"
            subheader="0.12 ppm"
            chart={{
              labels: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
              ],
              series: [
                
                {
                  name: 'pm2.5',
                  type: 'line',
                  fill: 'solid',
                  data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.11, 0.13, 0.15, 0.13,0.12],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="풍속"
            subheader="4 m/s"
            chart={{
              labels: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
              ],
              series: [
                
                {
                  name: 'pm2.5',
                  type: 'line',
                  fill: 'solid',
                  data: [1,1,2,2,2,2,3,3,3,3,4,4],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWindDirectionStatus
            title="풍향"
            subheader="서풍"
          />
        </Grid>
        
      </Grid>
    </Container>
  );
}
