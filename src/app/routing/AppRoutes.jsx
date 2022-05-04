/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {useEffect} from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {PrivateRoutes} from './PrivateRoutes';
import {ErrorsPage} from '../modules/errors/ErrorsPage';
import {Logout, AuthPage} from '../modules/auth';
import {App} from '../App';
import * as actionsGlobal from 'src/setup/redux/global/Actions';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env;

const AppRoutes = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(({auth}) => auth.user, shallowEqual);
  const connection = useSelector((state) => state.global.connection);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(actionsGlobal.listenNotifications(accessToken));
    } else {
      if (connection) {
        connection.stop().then((e) => {
          console.log('stop tai day!');
        });
      }
    }

    return () => {};
  }, [accessToken]);

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {isAuthorized ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              {/* <Route index element={<Navigate to='/dashboard' />} /> */}
              <Route index element={<Navigate to='/general/seagames' />} />
              
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export {AppRoutes};
