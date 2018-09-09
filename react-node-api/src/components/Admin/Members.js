import React from 'react';
import PropTypes from 'prop-types';
import MemberItem from './MemberItem';
import GhostMemberItem from './GhostMemberItem';

const Members = (props) => {
  return(
    <div className="memberBox">
      <form>
          <div className="form-group">
            <div className="input-group">
              <input type="text" className="form-control" value={props.memberEmail} onChange={(e)=>props.handleEmailChange(e)}/>
              <span className="input-group-btn">
                <button className="btn btn-primary memberaddbutton" type="button" onClick={(e)=>props.handleAdd(e)}>Add Member</button>
              </span>
            </div>
          </div>
      </form>
      <div className="memberList">
        <ul>
          {
            props.isTyping
            ? <GhostMemberItem memberEmail={props.memberEmail}/>
            : null
          }
          { props.members.map((member,index)=>{
            return(
              <MemberItem
                key={index}
                member={member}
                index={index}
                handleDelete={props.handleDelete}
                handleEdit={props.handleEdit}
                isTyping={props.isTyping}
                handleEditEmailChange={props.handleEditEmailChange}
                handleEmail={props.handleEmail}/>
            );
          })
          }
        </ul>
      </div>
    </div>
  );
};

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleEditEmailChange: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  handleEmail: PropTypes.func.isRequired,
}

export default Members;
