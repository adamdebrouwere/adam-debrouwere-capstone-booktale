import { Link } from 'react-router-dom';
const NotFound = () => {
    
    return (
        <div className="not-found-container">
            <h1 className="not-found__header">404</h1>
            <h2 className="not-found__header-2">Oops! Page Not Found</h2>
            <Link href="/" className="home-link"><p className="home-link__text"></p>Go back to Homepage</Link>
        </div>
    );
};

export default NotFound;