import { Routes, Route} from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import  HomePage  from '../pages/HomePage';

export const RoutesFront  = () => {
    return(
        <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/homepage' element={<HomePage />} />
        </Routes>
    )
}
