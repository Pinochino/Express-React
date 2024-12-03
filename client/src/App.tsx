import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoute } from "./routes/route";
import { DefaultLayout } from "./layouts";
import React, { Fragment } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {publicRoute.map((route, index: number) => {
            let Layout: any = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )

          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
