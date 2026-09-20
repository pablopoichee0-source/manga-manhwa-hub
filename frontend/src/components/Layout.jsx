import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <Link to="/" className="brand">AnimeLegal</Link>
        </div>

        <nav className="nav">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/anime">Anime</NavLink>
          <NavLink to="/top-anime">Top</NavLink>
          <NavLink to="/noticias">Noticias</NavLink>
          <NavLink to="/resenas">Reseñas</NavLink>
          {user && <NavLink to="/profile">Perfil</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin">Administración</NavLink>}
          {user ? (
            <button type="button" className="ghost-button" onClick={() => { logout(); navigate('/'); }}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <NavLink to="/login">Entrar</NavLink>
              <NavLink to="/register">Crear cuenta</NavLink>
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
