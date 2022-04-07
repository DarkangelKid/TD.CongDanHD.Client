import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import SchoolsPage from './schools/SchoolsPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='schools'
          element={
            <>
              <SchoolsPage />
            </>
          }
        />

        <Route index element={<Navigate to='/education/schools' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
