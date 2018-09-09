import React from 'react';
import PropTypes from 'prop-types';

const MemberItem = (props) => {
  const member = ()=>{
    var status1;
    if(props.member.status == 0){
      status1 = <h4>Status: <span>New</span></h4>;
    }else if (props.member.status == 1) {
      status1 = <h4>Status: <span>Email Sent</span></h4>;
    }else {
      status1 = <h4>Status: <span>Active</span></h4>;
    }
    return(
      <li>
        <div className="memberDetails row">
          <div className="col-md-8">
          { props.member.isEditting
            ? <input type="text" className="form-control" value={props.member.email} onChange={(e,id,email)=>props.handleEditEmailChange(e,props.member.id,props.member.email)}/>
            : <h4>Email: <span>{props.member.email}</span></h4>
          }
            <h4>Date Added: <span>{props.member.dateAdded}</span></h4>
            {status1}
          </div>
          <div className="col-md-4">
            { props.member.isEditting
              ? <button className="btn btn-primary" type="button" onClick={(e,id)=>props.handleEdit(e,props.member.id)}>Save</button>
              : <button className="btn btn-primary" type="button" onClick={(e,id)=>props.handleEdit(e,props.member.id)}>Edit</button>

            }
            <button className="btn btn-danger" type="button" onClick={(e,id)=>props.handleDelete(e,props.member.id)}>Delete</button>
            <button className="btn btn-info" type="button" onClick={(e,id)=>props.handleEmail(e,props.member.id)}>Send Email</button>
          </div>
        </div>
      </li>
    );
  };
  return(
      member()
  );
};

MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleEditEmailChange: PropTypes.func.isRequired,
  handleEmail: PropTypes.func.isRequired,
}

export default MemberItem;
