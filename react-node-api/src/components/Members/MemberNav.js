import React from 'react';
import PropTypes from 'prop-types';
import Lagoswhite from '../../images/Lagoswhite.png';
import { NavLink, Link } from 'react-router-dom'

const MemberNav = (props) => {

    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <img src={Lagoswhite} width="170" className="d-inline-block align-top" alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <NavLink
                      exact
                      to="/"
                      activeClassName="active"
                      className="nav-link"> The Lounge
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                      exact
                      to="/referrals"
                      activeClassName="active"
                      className="nav-link"> Referrals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                      exact
                      to="/profile"
                      activeClassName="active"
                      className="nav-link"> Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                      exact
                      to="/contact"
                      activeClassName="active"
                      className="nav-link"> Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={(e)=>props.handleSignOut(e)}> Sign Out
              </a>
            </li>
          </ul>
          </div>
        </nav>

    );
}

MemberNav.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
}

export default MemberNav;
