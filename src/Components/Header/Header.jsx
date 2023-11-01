import React from 'react';
import logo from "../../logo.webp"
import { Link } from "react-router-dom"
import {ImSearch} from"react-icons/im"

const Header = () => {
  return (
    <nav className="Header">
<img src={logo} alt="logo" />
<div>
    <Link to="/tvshows">TV Shows</Link>
    <Link to="/movies">Movies</Link>
    <Link to="/recently_added">Recently Added</Link>
    <Link to="/my_list">My List</Link>
</div>

<ImSearch />



    </nav>
  );
}

export default Header;
