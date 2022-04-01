import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import LaborMarketInformationsPage from './labormarketinformations/LaborMarketInformationsPage';
import EnterpriseForumCategoriesPage from './enterpriseforumcategories/EnterpriseForumCategoriesPage';
import LawDatasPage from './lawdatas/LawDatasPage';
import ProjectInvestCategoriesPage from './projectinvestcategories/ProjectInvestCategoriesPage';
import ProjectInvestFormsPage from './projectinvestforms/ProjectInvestFormsPage';
import ProjectInvestInformationsPage from './projectinvestinformations/ProjectInvestInformationsPage';
import EnterpriseForumTopicsPage from './enterpriseforumtopics/EnterpriseForumTopicsPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='enterpriseforumtopics'
          element={
            <>
              <EnterpriseForumTopicsPage />
            </>
          }
        />
        <Route
          path='projectinvestforms'
          element={
            <>
              <ProjectInvestFormsPage />
            </>
          }
        />
        <Route
          path='projectinvestinformations'
          element={
            <>
              <ProjectInvestInformationsPage />
            </>
          }
        />
        <Route
          path='projectinvestcategories'
          element={
            <>
              <ProjectInvestCategoriesPage />
            </>
          }
        />
        <Route
          path='enterpriseforumcategories'
          element={
            <>
              <EnterpriseForumCategoriesPage />
            </>
          }
        />
        <Route
          path='labormarketinformations'
          element={
            <>
              <LaborMarketInformationsPage />
            </>
          }
        />

        <Route
          path='lawdatas'
          element={
            <>
              <LawDatasPage />
            </>
          }
        />

        <Route index element={<Navigate to='/enterprise/enterpriseforumcategories' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
