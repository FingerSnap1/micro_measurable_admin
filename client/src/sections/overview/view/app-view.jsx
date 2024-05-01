import { getAuth } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Battery60Icon from '@mui/icons-material/Battery60';

import googleMapID from 'src/config/googleMapId';
import useNodeInfoStore from 'src/store/nodeInfoStore';
import useOverViewStore from 'src/store/overViewStore';
import useManagerInfoStore from 'src/store/managerInfoStore';

import GoogleMap from 'src/components/map/googleMap';

import AppNodeState from '../app-node-state';
import AppErrorCheck from '../app-error-check';
import AppSubstanceState from "../app-substance-status";
import AppWindDirectionStatus from '../app-wind-direction-status';



// ----------------------------------------------------------------------

export default function AppView() {

  const auth = getAuth();

  const { rawData, errorData, selectedLocation, setSelectedLocation } = useOverViewStore();

  const { managers } = useManagerInfoStore();

  const { nodes } = useNodeInfoStore();

  const [errorDataList, setErrorDataList] = useState([]);

  const [ myName, setMyName ] = useState(''); 

  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const filteredAndMappedList = errorData
      .filter(item => !item.done) // Filter out items where done is false
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp)) // Sort by timestamp desc
      .map(item => ({ id: item.id, name: item.errMsg, timestamp: item.timestamp })); // Map to the required format

      setErrorDataList(filteredAndMappedList);

      // 로그인한 이메일을 기준으로 manager들 중 내 정보를 찾고, 그 에 따라 화면을 커스텀합니다.
      const myInfo = managers.filter((manager) => auth.currentUser.email === manager.email)[0] || '';
      setMyName(myInfo.managerName);

      const nodeLocations = nodes.reduce((acc, node) => {
        acc[node.nodeAddress] = node.location;
        return acc;
      },{});

      setSelectedLocation(nodeLocations[myInfo.nodeAddress]);

      setFilteredData(rawData.filter(data => data.nodeInfo.location === '뉴턴홀 뒤'));// ❗️수정필요 - selectedLocation으로 수정 필요
  }, [errorData,setSelectedLocation, selectedLocation, managers, nodes, auth.currentUser, rawData]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {myName} 👋
      </Typography>

      <Grid container spacing={3}>
        
        <Grid xs={12} md={6} lg={8}>
          <Wrapper apiKey={googleMapID}>
            <GoogleMap 
              title={selectedLocation}
              subheader={`${myName} 관리자`}
              options={{ disableDefaultUI: true, zoomControl: false }}/>
          </Wrapper>
        </Grid>

        <Grid container direction="column" spacing={3} xs={12} md={6} lg={4}>
          <Grid item>
            <AppNodeState
              icon={ <Battery60Icon style={{ color: "black", fontSize: 25,}}/>}
            />
          </Grid>

           <Grid item>
          <AppErrorCheck
            title="에러 데이터 체크 리스트"
            list={ errorDataList }
          />
        </Grid>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="PM2.5"
            subheader="36 ppm : 나쁨"
            unit="ppm"
            chart={{
              labels: filteredData.map((row) => row.timestamp.slice(0,2)),
              series: [
                
                {
                  name: 'pm2.5',
                  type: 'area',
                  fill: 'gradient',
                  data: filteredData.map((row) => row["pm2.5"]),
                },
              ],
            }}
          />
        </Grid>
        

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="PM10"
            subheader="300 ppm : 매우나쁨"
            unit="ppm"
            chart={{
              labels: filteredData.map((row) => row.timestamp.slice(0,2)),
              series: [
                
                {
                  name: 'pm10',
                  type: 'area',
                  fill: 'gradient',
                  data: filteredData.map((row) => row.pm10),
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="온도"
            subheader="16 °C"
            unit="°C"
            chart={{
              labels: filteredData.map((row) => row.timestamp.slice(0,2)),
              series: [
                
                {
                  name: 'temperature',
                  type: 'area',
                  fill: 'gradient',
                  data: filteredData.map((row) => row.temperature),
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="습도"
            subheader="73%"
            unit="%"
            chart={{
              labels: filteredData.map((row) => row.timestamp.slice(0,2)),
              series: [
                
                {
                  name: 'humidity',
                  type: 'area',
                  fill: 'gradient',
                  data: filteredData.map((row) => row.humidity),
                }, 
              ],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="포름알데히드"
            subheader="0.12"
            unit="ppm"
            chart={{
              labels: filteredData.map((row) => row.timestamp.slice(0,2)),
              series: [
                
                {
                  name: 'ch2o',
                  type: 'area',
                  fill: 'gradient',
                  data: filteredData.map((row) => row.ch2o),
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="풍속"
            subheader="4 m/s"
            unit="m/s"
            chart={{
              labels: filteredData.map((row) => row.timestamp.slice(0,2)),
              series: [
                {
                  name: 'wind-speed',
                  type: 'area',
                  fill: 'gradient',
                  data: filteredData.map((row) => row["wind-speed"]),
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          {filteredData.length > 0 && (
            <AppWindDirectionStatus
              value={filteredData[filteredData.length - 1]['wind-direction']}
            />
          )}
        </Grid>
        
      </Grid>
    </Container>
  );
}
