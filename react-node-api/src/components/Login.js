import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Motion, spring} from 'react-motion';
import {Link} from 'react-router-dom';


// {
//   props.failedLogin
//   ? <div className="loginError text-center wow bounceIn">The Information Username/Password is invalid. Please Try Again</div>
//   : ""
// }
const CustomError = (props) => {
    return(
      <div className={`loginError text-center ${props.failedLogin ? "active" : ""}`}>The Information Username/Password is invalid. Please Try Again</div>
    );
}

const Login = (props) => {
  return(
        <Row>
          <Col md={12} lg={12}>
            <div className="background-img">

                <div className="row form-row">
                  <div className="col-sm-12 col-md-3 col-lg-4 d-none d-lg-block align-self-center align-self-center">
                    <div className="smartphone m-auto">
                      <div className="app-description text-center"></div>
                      <div className="smartphoneScreen">
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-4 m-auto align-self-center">
                    <div className="app-title m-auto"></div>
                    <div className="app-description text-center">Exclusive Members Only</div>
                    <ReactCSSTransitionGroup
                        transitionName="loginform"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        transitionAppear={true}
                        transitionAppearTimeout={500}>
                      <div className="form">
                        <form className="text-center" onSubmit={(e)=>props.handleSubmit(e)}>
                          <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" value={props.username} onChange={(e) => props.handleUsernameChange(e)}/>
                            <small id="emailHelp" className="form-text text-muted">{"We will never share your email with anyone else."}</small>
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" value={props.password} onChange={(e) => props.handlePassChange(e)} />
                          </div>
                          <button type="submit" className="btn loginButton">Submit</button>
                        </form>
                        <CustomError failedLogin={props.failedLogin} />
                      </div>
                    </ReactCSSTransitionGroup>
                  </div>

                  <div className="col-sm-12 col-md-3 col-lg-4 d-none d-lg-block align-self-center">
                    <div className="monitor m-auto">
                      <div className="app-description text-center"></div>
                      <div className="monitorScreen">
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </Col>
        </Row>
  );
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePassChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  failedLogin: PropTypes.bool.isRequired,
}

export default Login;
