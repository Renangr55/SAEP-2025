import { Routes, Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export const RoutesFront  = () => {
    return(
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    )
}
