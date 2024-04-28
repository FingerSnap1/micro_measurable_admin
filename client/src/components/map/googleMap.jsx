import React, { useRef, useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import useNodeInfoStore from "src/store/nodeInfoStore";

const GoogleMap = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  const { nodes } = useNodeInfoStore();

  useEffect(() => {

    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: { lat: 36.1032734, lng: 129.3893488 },
        zoom: 16,
        styles: [
          {
            featureType: "all",
            elementType: "labels",
            stylers: [{ visibility: "off" }] // 모든 레이블을 숨깁니다.
          },

        ]
      }));
    }


    // 노드 정보 가져오기
    nodes.forEach((node) => {

      const CustomNode = document.createElement('div');
      CustomNode.className = 'customNode';
      CustomNode.innerText = node.location;
      CustomNode.style.border = `2px solid #7D9DDB`;
      CustomNode.style.background = "rgb(125,157,219,0.7)";


      const marker = new window.google.maps.Marker({
        map,
        position: { lat: node.latitude, lng: node.longitude },
        content: CustomNode,
        title: node.location,
      });

      marker.addListener("click", () => {
        console.log(node.location);
      });

    });


  }, [ref, map, nodes]);

  const title = "히딩크"; 
  const subheader = "홍길동 관리자"; 

  return (
    <Card style={{ height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardHeader title={title} subheader={subheader}/>
      <div ref={ref} style={{ width: "100%", height: "82%" }}/>
    </Card>
  );

};

export default GoogleMap;