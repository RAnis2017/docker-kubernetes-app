import React from 'react';
import PropTypes from 'prop-types';

const GhostMemberItem = (props) => {
  const member = ()=>{
    return(
      <li>
        <div className="memberDetails ghostMemberDetails row">
          <div className="col-md-8">
            <h4>Email: <span>{props.memberEmail}</span></h4>
            <h4>Date Added: <span className="ghostBox"></span></h4>
            <h4>Status: <span className="ghostBox"></span></h4>
          </div>
        </div>
      </li>
    );
  };
  return(
      member()
  );
};

GhostMemberItem.propTypes = {
  memberEmail: PropTypes.string.isRequired,
}

export default GhostMemberItem;
