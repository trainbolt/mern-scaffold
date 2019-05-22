import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers";

const rootPersistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["user"]
};

const userPersistConfig = {
  key: "user",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["loggedIn"]
};

console.log("rootReducer", rootReducer);

rootReducer = {
  ...rootReducer,
  user: persistReducer(userPersistConfig, rootReducer.user)
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export const persistor = persistStore(store);
