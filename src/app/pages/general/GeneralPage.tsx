import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import CategoriesPage from './categories/CategoriesPage';
import PlaceTypesPage from './placetypes/PlaceTypesPage';
import AreasPage from './areas/AreasPage';
import PlacesPage from './places/PlacesPage';
import HomePageInforsPage from './homepageinfors/HomePageInforsPage';

import SeaGamesPage from './seagames/SeaGamesPage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='homepageinfors'
          element={
            <>
              <HomePageInforsPage />
            </>
          }
        />
        <Route
          path='seagames'
          element={
            <>
              <SeaGamesPage />
            </>
          }
        />
        <Route
          path='categories'
          element={
            <>
              <CategoriesPage />
            </>
          }
        />
        <Route
          path='placetypes'
          element={
            <>
              <PlaceTypesPage />
            </>
          }
        />

        <Route
          path='places'
          element={
            <>
              <PlacesPage />
            </>
          }
        />

        <Route
          path='areas'
          element={
            <>
              <AreasPage />
            </>
          }
        />

        <Route index element={<Navigate to='/general/categories' />} />
      </Route>
    </Routes>
  );
};

export default GeneralPage;
