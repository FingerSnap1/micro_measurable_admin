import { getAuth } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

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

  const [ managerName, setManagerName ] = useState('');

  const [ nodeBattery, setNodeBattery ] = useState('');

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => { // 에러 데이터
    const filteredAndMappedList = errorData
      .filter(item => !item.done) // Filter out items where done is false
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp)) // Sort by timestamp desc
      .map(item => ({ id: item.id, name: item.errMsg, timestamp: item.timestamp })); // Map to the required format

      setErrorDataList(filteredAndMappedList);
  }, [errorData]);


  useEffect(() => {
      // 로그인한 이메일을 기준으로 manager들 중 내 정보를 찾고, 그 에 따라 화면을 커스텀합니다.
      const myInfo = managers.filter((manager) => auth.currentUser.email === manager.email)[0] || '';
      setMyName(myInfo.managerName);

      const nodeLocations = nodes.reduce((acc, node) => {
        acc[node.nodeAddress] = node.location;
        return acc;
      },{});

      const nodeBatteries = nodes.reduce((acc, node) => {
        acc[node.nodeAddress] = node.battery;
        return acc;
      },{});

      const nodeManager = managers.filter((manager) => nodeLocations[manager.nodeAddress] === selectedLocation)[0] || '';
      setManagerName(managerName ?  nodeManager.managerName : myInfo.managerName);

      setSelectedLocation(selectedLocation === '' ? nodeLocations[myInfo.nodeAddress]: selectedLocation);

      setNodeBattery(myInfo ? nodeBatteries[nodeManager.nodeAddress] : '');

      setFilteredData(rawData.filter(data => data.nodeInfo.location === selectedLocation));

  }, [rawData, setSelectedLocation, selectedLocation, managers, nodes, auth.currentUser, managerName]);

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
              subheader={`${managerName} 관리자`}
              options={{ disableDefaultUI: true, zoomControl: false }}/>
          </Wrapper>
        </Grid>

        <Grid container direction="column" spacing={3} xs={12} md={6} lg={4}>
          <Grid>
            <AppNodeState
              battery={ nodeBattery }
            />
          </Grid>

           <Grid>
          <AppErrorCheck
            title="에러 데이터 체크 리스트"
            list={ errorDataList }
          />
        </Grid>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppSubstanceState
            title="PM2.5"
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
