import './App.css';
import './styles/Auth.css';
import './styles/Donation.css';
import './styles/DonationProfile.css';
import './styles/AboutUs.css';
import './styles/Testimonials.css'
import './styles/FAQ.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { AuthProvider } from './Context/Auth';
import HomePage from './pages/HomePage/index'
import Login from './pages/LoginPage';
import Signup from './pages/SignUpPage';
import Donation from './pages/DonationPage/Donation';
import Fundraise from './pages/FundRaise';
import DonatorProfile from './pages/Donator/DonationProfile';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Testimonials from './components/Testimonials';
import Causes from './components/Causes';
import FAQComponent from './components/FAQComponent';
import PaymentDetails from './pages/DonationPage/PaymentDetails';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/donate" element={<Donation/>}></Route>
          <Route path="/donate/:causeId" element={<Donation />} />
          <Route path="/fundraise" element={<Fundraise/>}></Route>
          <Route path="/myprofile" element={<DonatorProfile/>}></Route>
          <Route path="/about" element={<AboutUs/>}></Route>
          <Route path="/contact" element={<ContactUs/>}></Route>
          <Route path="/causes" element={<Causes/>}></Route>
          <Route path="/testimonials" element={<Testimonials/>}></Route>
          <Route path="/faqs" element={<FAQComponent/>}></Route>
          <Route path="/paymentdetails/:orderId" element={<PaymentDetails/>}></Route>

        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
