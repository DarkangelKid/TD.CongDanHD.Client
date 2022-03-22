import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import EcommerceCategoriesPage from './ecommercecategories/EcommerceCategoriesPage';
import BrandsPage from './brands/BrandsPage';
import AttributesPage from './attributes/AttributesPage';
import SellersPage from './sellers/SellersPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='ecommercecategories'
          element={
            <>
              <EcommerceCategoriesPage />
            </>
          }
        />
        <Route
          path='sellers'
          element={
            <>
              <SellersPage />
            </>
          }
        />
        <Route
          path='brands'
          element={
            <>
              <BrandsPage />
            </>
          }
        />
        <Route
          path='attributes'
          element={
            <>
              <AttributesPage />
            </>
          }
        />
        <Route index element={<Navigate to='/ecommerce/ecommercecategories' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
