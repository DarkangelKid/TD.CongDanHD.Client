import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import TourGuidesPage from './tourguides/TourGuidesPage';
import TravelHandbooksPage from './travelhandbooks/TravelHandbooksPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='tourguides'
          element={
            <>
              <TourGuidesPage />
            </>
          }
        />
        <Route
          path='travelhandbooks'
          element={
            <>
              <TravelHandbooksPage />
            </>
          }
        />
        <Route index element={<Navigate to='/travel/tourguides' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
