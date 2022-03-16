import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import CarPoliciesPage from './carpolicies/CarPoliciesPage';
import CarUtilitiesPage from './carutilities/CarUtilitiesPage';
import VehicleTypesPage from './vehicletypes/VehicleTypesPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='carpolicies'
          element={
            <>
              <CarPoliciesPage />
            </>
          }
        />
        <Route
          path='carutilities'
          element={
            <>
              <CarUtilitiesPage />
            </>
          }
        />
        <Route
          path='vehicletypes'
          element={
            <>
              <VehicleTypesPage />
            </>
          }
        />
        <Route index element={<Navigate to='/traffic/carpolicies' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
