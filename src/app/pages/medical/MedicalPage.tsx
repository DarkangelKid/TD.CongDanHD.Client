import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import MedicalHotlinesPage from './medicalhotlines/MedicalHotlinesPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='medicalhotlines'
          element={
            <>
              <MedicalHotlinesPage />
            </>
          }
        />

        <Route index element={<Navigate to='/medical/medicalhotlines' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
