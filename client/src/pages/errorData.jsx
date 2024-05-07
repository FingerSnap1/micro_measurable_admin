import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

export default function ErrorDataPage() {
  return (
    <>
      <Helmet>
        <title> Error Data | Micro measurable </title>
      </Helmet>

      <Outlet />
    </>
  );
}
