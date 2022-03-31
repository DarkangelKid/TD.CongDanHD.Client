import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import AlertInformationPage from './alertinformations/AlertInformationPage';
import AlertCategoriesPage from './alertcategories/AlertCategoriesPage';
import AlertOrganizationPage from './alertorganizations/AlertOrganizationPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='alertcategories'
          element={
            <>
              <AlertCategoriesPage />
            </>
          }
        />
        <Route
          path='alertorganizations'
          element={
            <>
              <AlertOrganizationPage />
            </>
          }
        />

        <Route
          path='alertinformations'
          element={
            <>
              <AlertInformationPage />
            </>
          }
        />

        <Route index element={<Navigate to='/hotline/hotlinecategories' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
