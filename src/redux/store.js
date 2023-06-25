import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialReducers from './initialReducers';
// import rootReducer from './reducers

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const initialState = {};

const middleware = [thunk];

const staticReducers = { static: initialReducers };
const createReducer = (asyncReducers) => combineReducers({
    ...staticReducers,
    ...asyncReducers,
});

const configureStore = () => {
    const store = createStore(
        // rootReducer,
        createReducer(),
        initialState, bindMiddleware(middleware));

    // Add a dictionary to keep track of the registered async reducers
    const asyncReducers = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key, asyncReducer) => {
        asyncReducers[key] = asyncReducer;
        store.replaceReducer(
            createReducer(asyncReducers)
        );
    };

    // Return the modified store
    return store;
};

export default configureStore;