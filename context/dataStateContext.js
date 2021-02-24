import { useReducer, createContext } from "react";
import Cookies from 'js-cookie'

let reducer = (state, action) => {
  switch (action.type) {
    case "basket":
      Cookies.set('basket', JSON.stringify([ ...action.state ]))
      return { ...state, basket: action.state }
    case "user":
      Cookies.set('user', JSON.stringify({ ...action.state }))
      return { ...state, user: action.state }
    case "cookies":
      Cookies.set('cookies_agree', action.state)
      return { ...state, cookies_agree: action.state }
    case "state":
      return { ...state, state: action.state }
    default:
      console.error('action.type: "' + action.type + '" is not implemented')
      return state
  }
};

const initialState = {
  basket: Cookies.get('basket') ? JSON.parse(Cookies.get('basket')) : [],
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : [],
  cookies_agree: Cookies.get('cookies_agree') ? Cookies.get('cookies_agree') : false,
  state: {
    searchFocus: false
  }
}

const DataStateContext = createContext(initialState);

function DataProvider(props) {
  const [dataContextState, dataContextDispatch] = useReducer(reducer, initialState);
  return (
    <DataStateContext.Provider value={{ dataContextState, dataContextDispatch }}>
      {props.children}
    </DataStateContext.Provider>
  );
}

export { DataStateContext, DataProvider };
