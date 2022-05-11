import {lazy, FC, Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {MasterLayout} from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper';
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils';

import UsersPage from '../pages/users/UsersPage';
import RolesPage from '../pages/roles/RolesPage';

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'));
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'));
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'));
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'));
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'));
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'));

  const GeneralPage = lazy(() => import('../pages/general/GeneralPage'));
  const TrafficPage = lazy(() => import('../pages/traffic/TrafficPage'));
  const BusinessPage = lazy(() => import('../pages/business/BusinessPage'));
  const MarketPage = lazy(() => import('../pages/market/MarketPage'));
  const HotlinePage = lazy(() => import('../pages/hotline/HotlinePage'));
  const CompaniesPage = lazy(() => import('../pages/companies/CompaniesPage'));
  const EcommercePage = lazy(() => import('../pages/ecommerce/EcommercePage'));
  const AlertPage = lazy(() => import('../pages/alert/AlertPage'));
  const EnterprisePage = lazy(() => import('../pages/enterprise/EnterprisePage'));
  const EducationPage = lazy(() => import('../pages/education/EducationPage'));
  const AgriculturePage = lazy(() => import('../pages/agriculture/AgriculturePage'));
  const MedicalPage = lazy(() => import('../pages/medical/MedicalPage'));
  const TravelPage = lazy(() => import('../pages/travel/TravelPage'));

  //const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/general/seagames' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />

        <Route path='admin/users' element={<UsersPage />} />
        <Route path='admin/companies' element={<CompaniesPage />} />
        <Route path='admin/roles' element={<RolesPage />} />

        {/* Lazy Modules */}

        <Route
          path='travel/*'
          element={
            <SuspensedView>
              <TravelPage />
            </SuspensedView>
          }
        />
        <Route
          path='medical/*'
          element={
            <SuspensedView>
              <MedicalPage />
            </SuspensedView>
          }
        />
        <Route
          path='agriculture/*'
          element={
            <SuspensedView>
              <AgriculturePage />
            </SuspensedView>
          }
        />
        <Route
          path='general/*'
          element={
            <SuspensedView>
              <GeneralPage />
            </SuspensedView>
          }
        />
        <Route
          path='education/*'
          element={
            <SuspensedView>
              <EducationPage />
            </SuspensedView>
          }
        />

        <Route
          path='enterprise/*'
          element={
            <SuspensedView>
              <EnterprisePage />
            </SuspensedView>
          }
        />
        <Route
          path='alert/*'
          element={
            <SuspensedView>
              <AlertPage />
            </SuspensedView>
          }
        />

        <Route
          path='ecommerce/*'
          element={
            <SuspensedView>
              <EcommercePage />
            </SuspensedView>
          }
        />

        <Route
          path='traffic/*'
          element={
            <SuspensedView>
              <TrafficPage />
            </SuspensedView>
          }
        />

        <Route
          path='business/*'
          element={
            <SuspensedView>
              <BusinessPage />
            </SuspensedView>
          }
        />

        <Route
          path='market/*'
          element={
            <SuspensedView>
              <MarketPage />
            </SuspensedView>
          }
        />

        <Route
          path='hotline/*'
          element={
            <SuspensedView>
              <HotlinePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        {/* <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        /> */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export {PrivateRoutes};
