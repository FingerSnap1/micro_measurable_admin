import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { RawDataProvider } from 'src/providers/rawDataProvider';
import { NodeInfoProvider } from 'src/providers/nodeInfoProvider';
import { ErrorDataProvider } from 'src/providers/errorDataProvider';

import { NodeView } from 'src/sections/node/view';
import { NodeAddView } from 'src/sections/node/add';
import { ManagerView } from 'src/sections/manager/view';
import { ManagerAddView } from 'src/sections/manager/add';
import { NodeModifyView } from 'src/sections/node/modify';

import PrivateRoute from './privateRoute';
import { ManagerInfoProvider } from '../providers/managerInfoProvider';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ManagerPage = lazy(() => import('src/pages/manager'));
export const NodePage = lazy(() => import('src/pages/node'));
export const ErrorDataPage = lazy(() => import('src/pages/errorData'));
export const RawDataPage = lazy(() => import('src/pages/rawData'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


// ----------------------------------------------------------------------

export default function Router() {


  const routes = useRoutes([
    {
      element: <PrivateRoute element= {(
        <DashboardLayout>
          <NodeInfoProvider>
            <ManagerInfoProvider>
              <RawDataProvider>
                <ErrorDataProvider>
                  <Suspense>
                    <Outlet />
                  </Suspense>
                </ErrorDataProvider>
              </RawDataProvider>
            </ManagerInfoProvider>
          </NodeInfoProvider>
        </DashboardLayout>
      )} />,
      children: [
        { element: <IndexPage />, index: true},
        { path: 'errorData', element: <ErrorDataPage /> },
        { path: 'rawData', element: <RawDataPage /> },
        { 
          path: 'manager', 
          element: <ManagerPage />, 
          children: [
            { path: '', element: <ManagerView /> },
            { path: 'add', element: <ManagerAddView />},
          ]
        },
        { 
          path: 'node', 
          element: <NodePage />, 
          children: [
            { path: '', element: <NodeView />},
            { path: 'add', element: <NodeAddView />},
            { path: 'modify', element: <NodeModifyView />},
          ]
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
