import { Routes, Route} from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import  HomePage  from '../pages/HomePage';
import  CreateProduct  from '../pages/CreateProduct';
import StokeControl from '../pages/stockControl';

export const RoutesFront  = () => {
    return(
        <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/createProduct' element={<CreateProduct />} />
            <Route path='/homepage/stockcontrol' element={<StokeControl />} />
        </Routes>
    )
}
