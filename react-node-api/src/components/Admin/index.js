import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import TabHeading from './TabHeading';
import Members from './Members';
import { Redirect } from 'react-router-dom';
import {CSVLink} from 'react-csv';

const Admin = (props) => {

  if (props.isAdmin === 1) {
    return(
      <div className="AdminApp">
        <div className="row">
          <Menu title={props.title} handleSignOut={props.handleSignOut}/>
          <div className="col-sm-12 col-md-7 col-lg-9 content">
            <TabHeading heading={"Members"} description={"Add/Delete/Edit Members"} />
            <div className="current-active-content">
              <Members members={props.members}
                       handleDelete={props.handleDeleteMember}
                       handleEdit={props.handleEditMember}
                       handleAdd={props.handleAddMember}
                       memberEmail={props.memberEmail}
                       handleEmailChange={props.handleMemberEmailChange}
                       handleEditEmailChange={props.handleEditEmailChange}
                       isTyping={props.isTyping}
                       handleEmail={props.handleEmail}/>
              <CSVLink data={props.members}
                       filename={"selectlagosmembers.csv"}
                       className="btn btn-primary float-right">Download CSV</CSVLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else if (props.isAdmin === 0) {
    return <Redirect to='/login'/>;
  }
  else {
    return <Redirect to='/login'/>;
  }

}

Admin.propTypes = {
  title: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleMemberEmailChange: PropTypes.func.isRequired,
  handleAddMember: PropTypes.func.isRequired,
  handleEditMember: PropTypes.func.isRequired,
  handleEditEmailChange: PropTypes.func.isRequired,
  handleDeleteMember: PropTypes.func.isRequired,
  memberEmail: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  isAdmin: PropTypes.number.isRequired,
  handleEmail: PropTypes.func.isRequired,
}

export default Admin;
