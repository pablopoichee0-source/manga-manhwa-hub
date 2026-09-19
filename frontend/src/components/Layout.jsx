import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <Link to="/" className="brand">MangaManhwa Hub</Link>
        </div>

        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          {user ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <button type="button" className="ghost-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="page-shell">
        <Outlet />
      </main>
    </div>
  );
}
