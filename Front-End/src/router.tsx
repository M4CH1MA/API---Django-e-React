import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//Autenticacao
const SignIn = Loader(lazy(() => import('src/content/pages/Auth/SignIn')));

//Grupos
const Groups = Loader(lazy(() => import('src/content/pages/Groups/Groups')));
const AddGroup = Loader(lazy(() => import('src/content/pages/Groups/Add')));
const EditGroup = Loader(lazy(() => import('src/content/pages/Groups/Edit')));

const Employees = Loader(lazy(() => import('src/content/pages/Employees/Employees')));
const AddEmployee = Loader(lazy(() => import('src/content/pages/Employees/Add')));
const EditEmployee = Loader(lazy(() => import('src/content/pages/Employees/Edit')));

const Tasks = Loader(lazy(() => import('src/content/pages/Tasks/tasks')));
const AddTask = Loader(lazy(() => import('src/content/pages/Tasks/Add')));
const EditTask = Loader(lazy(() => import('src/content/pages/Tasks/Edit')));

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

//const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      //Autenticacao
      {
        path: '/signin',
        element: <SignIn />
      },

      //Grupos
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: 'groups',
            element: <Groups />,
          },
          {
            path: 'groups-add', 
            element: <AddGroup />
          },
          //
          {
            path: 'groups/edit/:id', 
            element: <EditGroup />
          }
        ]
      },

      //Funcionarios
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: 'employees',
            element: <Employees />
          },
          {
            path: 'employees-add',
            element: <AddEmployee />
          },
          {
            path: 'employees/edit/:id',
            element: <EditEmployee />
          }
        ]
      },

      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: 'tasks',
            element: <Tasks />
          },
          {
            path: 'tasks-add',
            element: <AddTask />
          },
          {
            path: 'tasks/edit/:id',
            element: <EditTask />
          }
        ]
      },

      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="tasks" replace />
      },
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
