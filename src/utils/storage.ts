export type TUserStorage = {
  displayName: string | null;
};

export const tokenStorage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem("authToken") as string);
  },
  setToken: (token: string) => {    
    window.localStorage.setItem("authToken", JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem("authToken");
  },
};

export const userStorage = {
  getUser: () => {
    return JSON.parse(
      window.localStorage.getItem("user") as string
    ) as TUserStorage;
  },
  setUser: (user: TUserStorage) => {
    window.localStorage.setItem("user", JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem("user");
  },
};
