import React from 'react';
import PropTypes from 'prop-types';

const CustomError = (props) => {
    return(
      <div className={`loginError text-center ${props.passwordUnmatch == 1 ? "active" : ""}`}>The Information Old Password do not match!</div>
    );
}
const Member = (props) => {

    return(
      <div className="row CustomHeightRow align-items-center justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6">
            <h2 className="profileHeading ">Profile Information</h2>
            <form className="profileForm m-auto" onSubmit={(e)=>props.handleMemberFormSubmit(e)}>
              <div className="row justify-content-center">
                  <div className="col-sm-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" aria-describedby="Enter first Name" placeholder="Enter first name" value={props.user.first_name} onChange={(e)=>props.handleMemberFieldChange(e,"first_name")}/>
                      </div>
                      <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" aria-describedby="Enter user Name" placeholder="Enter user name" value={props.user.username} onChange={(e)=>props.handleMemberFieldChange(e,"username")} />
                      </div>
                      <div className="form-group">
                        <label>Password Old:</label>
                        <input type="password" className="form-control" aria-describedby="Enter old password" placeholder="Enter old password"  value={props.user.old_password} onChange={(e)=>props.handleMemberFieldChange(e,"old_password")} />
                      </div>
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" aria-describedby="Enter last Name" placeholder="Enter last name"  value={props.user.last_name} onChange={(e)=>props.handleMemberFieldChange(e,"last_name")} />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" aria-describedby="Enter email" placeholder="Enter email"  value={props.user.email} onChange={(e)=>props.handleMemberFieldChange(e,"email")} />
                      </div>
                      <div className="form-group">
                        <label>Password New:</label>
                        <input type="password" className="form-control" aria-describedby="Enter new password" placeholder="Enter new password"  value={props.user.new_password} onChange={(e)=>props.handleMemberFieldChange(e,"new_password")} />
                      </div>

                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-8">
                      <div className="form-group">
                        <label>Personal/Business/Secretary Address:</label>
                        <input type="text" className="form-control" aria-describedby="Enter address" placeholder="Enter address"  value={props.user.address} onChange={(e)=>props.handleMemberFieldChange(e,"address")} />
                      </div>
                  </div>
              </div>
              <div className="row justify-content-center">
                <button type="submit" className="btn profileButton">{props.infoSaveStatus}</button>
              </div>
              <CustomError passwordUnmatch={props.passwordUnmatch} />
            </form>
        </div>
      </div>
    );
}

Member.propTypes = {
  handleMemberFieldChange: PropTypes.func.isRequired,
  handleMemberFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  infoSaveStatus: PropTypes.string.isRequired,
}

export default Member;
