import {
    Suspense,
    type ComponentType,
    type ReactElement,
    useLayoutEffect,
} from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
    useLocation,
} from 'react-router-dom';
import { HouseDoorFill } from 'react-bootstrap-icons';
import { Loading } from '../common/components/Actions/Loading';
import { RouteErrorElement } from '../common/components/Errors/RouteErrorElement';
import { Content } from '../templates/Content';
import { privateRoutes } from './routes/privateRoutes';
import { publicRoutes } from './routes/publicRoutes';
import { Layout } from '../templates/Layout';

const createHomeCrumb = (to: string) => ({
  crumb: (): ReactElement => (
    <Link to={to}>
      <HouseDoorFill />
    </Link>
  ),
});

const createTextCrumb = (to: string, label: string) => ({
  crumb: (): ReactElement => <Link to={to}>{label}</Link>,
});

const RouteReadySignal = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.dispatchEvent(new Event('app:navigation:ready'));
  }, [location.key]);

  return null;
};

const renderContent = (Page: ComponentType) => (
  <Content breadcrumb={false}>
    <Suspense fallback={<Loading />}>
      <Page />
      <RouteReadySignal />
    </Suspense>
  </Content>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {publicRoutes.map(({ path, label, Page }) => (
        <Route
          key={path || 'login'}
          path={path}
          element={(
            <Suspense fallback={<Loading />}>
              <Page />
            </Suspense>
          )}
          errorElement={<RouteErrorElement />}
          handle={createTextCrumb(path || '/', label)}
        />
      ))}

      <Route path="/" element={<Layout />} errorElement={<RouteErrorElement />}>
        {privateRoutes.map(({ path, crumbTo = path, Page }) => (
          <Route
            key={path}
            path={path}
            element={renderContent(Page)}
            handle={createHomeCrumb(crumbTo)}
          />
        ))}
      </Route>
    </>
  )
);

export const AppRoutes = (): ReactElement => {
  return <RouterProvider router={router} />;
};
