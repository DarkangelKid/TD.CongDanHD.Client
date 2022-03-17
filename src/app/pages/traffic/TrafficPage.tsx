import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import CarPoliciesPage from './carpolicies/CarPoliciesPage';
import CarUtilitiesPage from './carutilities/CarUtilitiesPage';
import VehicleTypesPage from './vehicletypes/VehicleTypesPage';
import CarpoolsPage from './carpools/CarpoolsPage';
import VehiclesPage from './vehicles/VehiclesPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='vehicles'
          element={
            <>
              <VehiclesPage />
            </>
          }
        />
        <Route
          path='carpools'
          element={
            <>
              <CarpoolsPage />
            </>
          }
        />
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
