import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./../pages/RegistrationPage";
import PageNotFound from "./../pages/PageNotFound";
import ProductsPage from "./../pages/ProductsPage";
import LoginPage from "./../pages/LoginPage";
import AuthProvider from "./../providers/AuthProvider";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <ProductsPage />
            </AuthProvider>
          }
        />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
