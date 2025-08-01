import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { Home } from "../pages/home/Home";
import { LoginPage } from "../pages/login/LoginPage"
import { ConsignmentPage } from '../pages/business/ConsignmentPage';
import { SalePage } from '../pages/business/SalePage';
import { LogoPage } from '../pages/home/components/logo';
import { Shipment } from '../pages/shipment/Shipment';
import { RouteScreen } from '../pages/route/Route';
import NotFound from '../pages/NotFound';


export function AppRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/consignment" element={<ConsignmentPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path='/shipment' element={<Shipment />} />
        <Route path="/route" element={<RouteScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
