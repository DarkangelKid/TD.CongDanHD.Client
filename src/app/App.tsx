import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';

import {ToastContainer} from 'react-toastify';

import {I18nProvider} from '../_metronic/i18n/i18nProvider';
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core';
import {MasterInit} from '../_metronic/layout/MasterInit';
import AuthInit from './modules/auth/redux/AuthInit';

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export {App};
