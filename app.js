import { createRoot } from 'react-dom/client';
import MainPage from './src/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <MainPage/>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(<App />);