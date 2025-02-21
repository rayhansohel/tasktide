import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes} />
    </AuthProvider>
  </StrictMode>
);
