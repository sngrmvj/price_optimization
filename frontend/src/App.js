
import './App.css';
import {Fragment, Suspense, lazy} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NawsomeLoader from "./components/loaders/NawsomeLoader/nawsome_loader";
import Header from "./components/header/header";

const App = () => {

    const Login = lazy(() => import('./components/user/login/login'));
    const Register = lazy(() => import('./components/user/register/register'));
    const NoPage = lazy(() => import('./components/nopage/nopage'));
    const Home = lazy(() => import('./components/home/home'));
    const Profile = lazy(() => import('./components/user/profile/profile'));




    return (
        <div className="app">
            <Router>
                <Header />
                <Suspense fallback={<NawsomeLoader />}>
                    <div className='main_body'>
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            {/* Add the routes above this line */}
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                    </div>
                </Suspense>

            </Router>
        </div>

    );
}

export default App;
