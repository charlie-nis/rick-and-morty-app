import {
  useEffect,
  useReducer,
  useMemo,
  createContext,
  ReactNode,
} from "react";

import { type TUserStorage, tokenStorage, userStorage } from "@/utils/storage";

type State = {
  token: string | null;
  isLoading?: boolean;
};

type Action = {
  type: string;
  token: string | null;
};

const initialState: State = {
  token: null,
  isLoading: true,
};

type AuthContextProviderProps = { children: ReactNode };
type AuthContextValue = {
  auth: ({
    token,
    user,
  }: {
    token: string;
    user: TUserStorage;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  currentState: State;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "RESTORE_USER_DATA":
      return {
        ...state,
        token: action.token,
        isLoading: false,
      };
    case "AUTH":
      return {
        ...state,
        token: action.token,
      };
    case "SIGN_OUT":
      return {
        ...state,
        token: null,
        isLoading: false,
      };
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    let token = null;

    try {
      token = tokenStorage.getToken();
    } catch (e) {
      console.error(e);
    }

    dispatch({ type: "RESTORE_USER_DATA", token: token });
  }, []);

  const authContext = useMemo(
    () => ({
      auth: async ({ token, user }: { token: string; user: TUserStorage }) => {
        try {
          tokenStorage.setToken(token);
          userStorage.setUser(user);
        } catch (e) {
          return;
        }
        dispatch({ type: "AUTH", token: token });
      },
      signOut: async () => {
        try {
          tokenStorage.clearToken();
          userStorage.clearUser();
        } catch (e) {
          return;
        }

        dispatch({ type: "SIGN_OUT", token: null });
      },
      currentState: state,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
