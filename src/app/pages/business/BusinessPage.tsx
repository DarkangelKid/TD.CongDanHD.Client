import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import BenefitsPage from './benefits/BenefitsPage';
import DegreesPage from './degrees/DegreesPage';
import ExperiencesPage from './experiences/ExperiencesPage';
import IndustriesPage from './industries/IndustriesPage';
import JobAgesPage from './jobages/JobAgesPage';
import JobNamesPage from './jobnames/JobNamesPage';
import JobPositionsPage from './jobpositions/JobPositionsPage';
import JobTypesPage from './jobtypes/JobTypesPage';
import SalariesPage from './salaries/SalariesPage';
import RecruitmentsPage from './recruitments/RecruitmentsPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='recruitments'
          element={
            <>
              <RecruitmentsPage />
            </>
          }
        />
        <Route
          path='benefits'
          element={
            <>
              <BenefitsPage />
            </>
          }
        />
        <Route
          path='degrees'
          element={
            <>
              <DegreesPage />
            </>
          }
        />
        <Route
          path='experiences'
          element={
            <>
              <IndustriesPage />
            </>
          }
        />

        <Route
          path='industries'
          element={
            <>
              <ExperiencesPage />
            </>
          }
        />
        <Route
          path='jobnames'
          element={
            <>
              <JobNamesPage />
            </>
          }
        />
        <Route
          path='jobages'
          element={
            <>
              <JobAgesPage />
            </>
          }
        />

        <Route
          path='jobpositions'
          element={
            <>
              <JobPositionsPage />
            </>
          }
        />

        <Route
          path='jobtypes'
          element={
            <>
              <JobTypesPage />
            </>
          }
        />
        <Route
          path='salaries'
          element={
            <>
              <SalariesPage />
            </>
          }
        />

        <Route index element={<Navigate to='/business/benefits' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
