import { Routes, Route} from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import  HomePage  from '../pages/HomePage';
import  CreateProduct  from '../pages/CreateProduct';
import StokeControl from '../pages/stockControl';
import UpdateProduct from '../pages/UpdateProduct';
import CreateCategory from '../pages/CreateCategory';

export const RoutesFront  = () => {
    return(
        <Routes>
            {/* register page */}
            <Route path="/" element={<RegisterPage />} />

            {/* login page */}
            <Route path="/login" element={<LoginPage />} />
            
            {/*home page  */}
            <Route path='/homepage' element={<HomePage />} />

            {/* create product */}
            <Route path='/homepage/createProduct' element={<CreateProduct />} />

            {/* stock control */}
            <Route path='/homepage/stockcontrol' element={<StokeControl />} />
            
            {/* update product */}
            <Route path='/homepage/updateProduct/:id' element={<UpdateProduct />} />

            {/* create product */}
            <Route path='/homepage/createCategory/' element={<CreateCategory />} />
        </Routes>
    )
}
