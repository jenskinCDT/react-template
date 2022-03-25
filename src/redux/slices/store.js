import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth.slice';
import logger from 'redux-logger';

const middlewares = [];

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});
