import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from 'react-router-dom';
// import { EditCustommer } from '../pages/EditCustommer';
import { MainPage } from "../pages/home/MainPage";
import { LoginPage } from "../pages/login/LoginPage"
import { ConsignmentPage } from '../pages/business/ConsignmentPage';
import { SalePage } from '../pages/business/SalePage';
// import { NewCustommerForm } from '../pages/NewCustommerForm';

export function AppRouter() {
return (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/consignment" element={<ConsignmentPage/>} />
      <Route path="/sale" element={<SalePage/>} />


      {/* <Route path="/newcustommer" element={<NewCustommerForm/>} />
      <Route path="/custommer/edit/:id" element={<EditCustommer/>} /> */}
    </Routes>
  </Router>
);} 