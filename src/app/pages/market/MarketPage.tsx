import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import MarketProductsPage from './marketproducts/MarketProductsPage';
import MarketCategoriesPage from './marketcategories/MarketCategoriesPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='marketcategories'
          element={
            <>
              <MarketCategoriesPage />
            </>
          }
        />
        <Route
          path='marketproducts'
          element={
            <>
              <MarketProductsPage />
            </>
          }
        />

        <Route index element={<Navigate to='/market/marketcategories' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
