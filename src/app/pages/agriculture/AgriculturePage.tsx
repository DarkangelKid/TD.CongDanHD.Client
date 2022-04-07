import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import AgriculturalEngineeringCategoriesPage from './agriculturalengineeringcategories/AgriculturalEngineeringCategoriesPage';
import AgriculturalEngineeringPage from './agriculturalengineerings/AgriculturalEngineeringPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='agriculturalengineerings'
          element={
            <>
              <AgriculturalEngineeringPage />
            </>
          }
        />
        <Route
          path='agriculturalengineeringcategories'
          element={
            <>
              <AgriculturalEngineeringCategoriesPage />
            </>
          }
        />

        <Route index element={<Navigate to='/agriculture/agriculturalengineeringcategories' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
