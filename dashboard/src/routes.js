import React, { Suspense, Fragment, lazy } from 'react';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import DashDefault from './views/dashboard/DashDefault';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
   
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          // <Route
          //   key={i}
          //   path={route.path}
          //   exact={route.exact}
          //   render={(props) => <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>}
          // />
          <Route path='/' element={<DashDefault />} />

        );
      })}
      </Routes>
      
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/auth/signin-1',
    component: lazy(() => import('./views/auth/signin/SignIn'))
  },
  {
    exact: true,
    path: '/auth/signup-1',
    component: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/app/dashboard/default',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/basic/button',
        component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: true,
        path: '/basic/badges',
        component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: true,
        path: '/basic/breadcrumb',
        component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: true,
        path: '/basic/pagination',
        component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: true,
        path: '/basic/collapse',
        component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: true,
        path: '/basic/tabs-pills',
        component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: true,
        path: '/basic/typography',
        component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: true,
        path: '/forms/form-basic',
        component: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: true,
        path: '/tables/bootstrap',
        component: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: true,
        path: '/charts/nvd3',
        component: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: true,
        path: '/maps/google-map',
        component: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: true,
        path: '/sample-page',
        component: lazy(() => import('./views/extra/SamplePage'))
      },
      // {
      //   exact: true,
      //   path: '/projects',
      //   component: lazy(() => import('./components/Projects/Projects'))
      // },
      // {
      //   exact: true,
      //   path: '/projects/new',
      //   component: lazy(() => import('./views/projects/ProjectNew'))
      // },
      // {
      //   exact: true,
      //   path: '/projects/:id',
      //   component: lazy(() => import('./views/projects/ProjectShow'))
      // },
      // {
      //   exact: true,
      //   path: '/projects/:id/edit',
      //   component: lazy(() => import('./views/projects/ProjectEdit'))
      // },
      // {
      //   exact: true,
      //   path: '/tickets',
      //   component: lazy(() => import('./components/Tickets/Tickets'))
      // },
      // {
      //   exact: true,
      //   path: '/tickets/new',
      //   component: lazy(() => import('./views/tickets/TicketNew'))
      // },
      // {
      //   exact: true,
      //   path: '/tickets/:id',
      //   component: lazy(() => import('./views/tickets/TicketShow'))
      // },
      // {
      //   exact: true,
      //   path: '/tickets/:id/edit',
      //   component: lazy(() => import('./views/tickets/TicketEdit'))
      // },
      // {
      //   exact: true,
      //   path: '/profile',
      //   component: lazy(() => import('./views/profile/UserProfile'))
      // },
      // {
      //   exact: true,
      //   path: '/profile/settings',
      //   component: lazy(() => import('./views/profile/Settings'))
      // },
      // {
      //   exact: true,
      //   path: '/profile/edit',
      //   component: lazy(() => import('./views/profile/ProfileEdit'))
      // },
      // {
      //   exact: true,
      //   path: '/users',
      //   component: lazy(() => import('./views/profile/Profiles'))
      // },
      {
        exact: true,
        path: '/users/new',
        component: lazy(() => import('./views/users/UserNew'))
      },
      {
        path: '*',
        exact: true,
        component: () => <Navigate to="./views/dashboard/DashDefault" />
      }
    ]
  }
];

export default routes;
