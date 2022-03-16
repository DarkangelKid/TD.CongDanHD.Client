import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import HotlinesPage from './hotlines/HotlinesPage';
import HotlineCategoriesPage from './hotlinecategories/HotlineCategoriesPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='hotlinecategories'
          element={
            <>
              <HotlineCategoriesPage />
            </>
          }
        />
        <Route
          path='hotlines'
          element={
            <>
              <HotlinesPage />
            </>
          }
        />

        <Route index element={<Navigate to='/hotline/hotlinecategories' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
