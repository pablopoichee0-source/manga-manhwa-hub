import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Layout() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  return <div className="app-shell"><header className="topbar"><Link to="/" className="brand">MangaManhwa Hub</Link><nav className="nav">
    <NavLink to="/">Inicio</NavLink>{user && <NavLink to="/profile">Perfil</NavLink>}{user?.role === 'admin' && <NavLink to="/admin">Administración</NavLink>}
    {user ? <button className="ghost-button" onClick={() => { logout(); navigate('/'); }}>Salir</button> : <><NavLink to="/login">Entrar</NavLink><NavLink to="/register">Crear cuenta</NavLink></>}
  </nav></header><main className="page-shell"><Outlet /></main></div>;
}
