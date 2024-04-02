/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import React, { useEffect } from 'react';
import { useNodeInfo } from './hooks/useNodeInfo';
import useNodeInfoStore from './store/nodeInfoStore';

// ----------------------------------------------------------------------

export default function App() {

  useScrollToTop();

  const { isPending, error, data } = useNodeInfo();
  const { setNodes, nodes} = useNodeInfoStore();
  
  useEffect(() => {
    if (!isPending && !error && data) {
      setNodes(data.data);
      console.log(data.data);
    }
  }, [isPending, error, data,setNodes]);

  return (
    <ThemeProvider>
      {nodes.length > 0 ? <Router />: <div> Loding... </div>}
    </ThemeProvider>
  );
}
