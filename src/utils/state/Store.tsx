import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Reducer from './Reducer';

const getStateFromLocStorage = (): IState | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const state: string | null = localStorage.getItem('state');
  return JSON.parse(state || '{}');
};

export interface IState {
  accessToken?: string
  refreshToken?: string
  profileId?: string
}

export interface IAction {
  type: string //TODO enum
  data?: any //TODO
}

let initialState: IState = {};

const StoreContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({ state: initialState, dispatch: () => {} });

export const StoreProvider = (props: any) => {
  initialState = getStateFromLocStorage() || initialState;
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    initialState = getStateFromLocStorage() || initialState;
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
