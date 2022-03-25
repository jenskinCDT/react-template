import Header from './components/Header/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { theme } from './MUIConfig';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from './components/Commons/ProtectedRoute';
import { Suspense } from 'react';
import Loading from './components/Loading/Loading';
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Routes>
            {routes.map((route, i) =>
              route.protected ? (
                <Route
                  path={route.path}
                  exact={route.exact}
                  key={i}
                  element={
                    <ProtectedRoute backUrl={route.path}>
                      <route.component title={route.title} />
                    </ProtectedRoute>
                  }
                />
              ) : (
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  element={<route.component title={route.title} />}
                />
              )
            )}
          </Routes>
        </ThemeProvider>
      </Router>
    </Suspense>
  );
}

export default App;
