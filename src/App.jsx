import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageWrapper from "./components/PageWrapper";
import MainLayout from './components/layout/MainLayout'
import routes from "./routers/routes";
const App = () => {
  return (
    <Fragment>
      <main className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map((route, index) => (
                route.index ? (
                  <Route
                    index
                    key={index}
                    element={route.path ? (<PageWrapper state={route.state} >{route.component}</PageWrapper>) : route.component}
                  />
                ) : (
                  <Route
                    path={route.path}
                    key={index}
                    element={route.state ? (
                      <PageWrapper state={route.state}>{route.component}</PageWrapper>
                    ) : route.component}
                  />
                )))}
            </Route>
          </Routes>
        </BrowserRouter>

      </main>
    </Fragment>
  );
}

export default App;
