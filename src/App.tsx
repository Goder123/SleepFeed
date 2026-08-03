import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/history"
        element={<HistoryPage />}
      />

      <Route
        path="/settings"
        element={<SettingsPage />}
      />
    </>,
  ),
);