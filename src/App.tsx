import { Suspense, lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { FullScreenLoader, ProtectedLayout, HomeLayout } from "@/components";

const Loadable =
  (Component: React.FunctionComponent) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );

const LoadableCharacters = Loadable(lazy(() => import("@/pages/Characters")));
const LoadableCharacter = Loadable(lazy(() => import("@/pages/Character")));
const LoadableEpisode = Loadable(lazy(() => import("@/pages/Episode")));
const LoadableLocation = Loadable(lazy(() => import("@/pages/Location")));
const LoadableSignUp = Loadable(lazy(() => import("@/pages/SignUp")));
const LoadableSignIn = Loadable(lazy(() => import("@/pages/SignIn")));
const LoadableNotFound = Loadable(lazy(() => import("@/pages/NotFound")));

const nonAuthRoutes: RouteObject = {
  path: "*",
  children: [
    {
      path: "sign-in",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <LoadableSignIn />,
        },
      ],
    },
    {
      path: "sign-up",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <LoadableSignUp />,
        },
      ],
    },
    {
      path: "",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <LoadableSignIn />,
        },
      ],
    },

    {
      path: "*",
      element: <LoadableNotFound />,
    },
  ],
};

const authRoutes: RouteObject = {
  path: "*",
  element: <ProtectedLayout />,
  children: [
    {
      path: "characters",
      element: <LoadableCharacters />,
    },
    {
      path: "characters/:id",
      element: <LoadableCharacter />,
    },
    {
      path: "location/:id",
      element: <LoadableLocation />,
    },
    {
      path: "episode/:id",
      element: <LoadableEpisode />,
    },

    {
      path: "*",
      element: <LoadableNotFound />,
    },
  ],
};

const routes: RouteObject[] = [nonAuthRoutes, authRoutes];

export default routes;
