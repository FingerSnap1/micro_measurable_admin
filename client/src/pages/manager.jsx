import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


// ----------------------------------------------------------------------

export default function ManagerPage() {
  return (
    <>
      <Helmet>
        <title> Manager | Minimal UI </title>
      </Helmet>

      <Outlet />
    </>
  );
}
