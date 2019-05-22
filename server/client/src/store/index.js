import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers";

const persistConfig = {
	key: 'root',
storage: storage,
	stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	let store = createStore(
		persistedReducer,
		{},
		composeWithDevTools(applyMiddleware(reduxThunk));
	let persistor = persistStore(store);
	return {store, persistor}
}

