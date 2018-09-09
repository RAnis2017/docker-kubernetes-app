import React from 'react';
import PropTypes from 'prop-types';

const Menu = (props) => {
  return(
    <div className="col-sm-12 col-md-4 col-lg-2 aside-menu">
      <div className="text-center app-title-admin">{props.title}</div>
      <div className="text-center admin-text">Admin Panel</div>
      <div className="seperator m-auto"></div>
      <div className="nav-custom">
        <ul className="ul-nav">
          <li><a href="#">Members</a></li>
          <li><a href="#" onClick={(e)=>props.handleSignOut(e)}>Sign Out</a></li>
        </ul>
      </div>
    </div>
  );
};

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
}

export default Menu;
