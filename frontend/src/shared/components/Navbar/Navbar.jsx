import './navbar.scss'
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">Social Media</div>
      <input className="search" placeholder="Search" />
      <div className="navbar-right">
        <div className="profile-mini">
          <div className="avatar-sm"></div>
          <span>@jakobbsh</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
