import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  Dispatch,
} from "react";

type UserDetails = {
  user: {
    balance: number;
    orderAmount: number;
  };
  setUser: Dispatch<
    SetStateAction<{
      balance: number;
      orderAmount: number;
    }>
  >;
};

const UserInfoContext = createContext<UserDetails | null>(null);

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    balance: 1000,
    orderAmount: 0,
  });

  return (
    <UserInfoContext.Provider value={{ user, setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};
export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
