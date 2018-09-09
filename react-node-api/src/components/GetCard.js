import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {Link} from 'react-router-dom';

const GetCard = (props) => {

    return(
      <div className="MemberApp">
        <div className="mask">
          <div className="row CustomHeightRow getCardRow align-items-center justify-content-center">
            <div className="col-sm-12 col-md-8 col-lg-6">
                <h4 className="profileHeading text-center">Do you deserve a card?</h4>
                <p className="profileHeading text-justify" style={{
                  fontSize: "1.1em"
                }}>Select Lagos prides itself in privacy and secrecy for the comfort and exclusivity of our clients.The card has no set requirements it isn{"'"}t linked to wealth or followers and each member has been individually considered. However, we do understand there are certain individuals who deserve a card that we have not been able to reach out to. For this reason we have created this page to accommodate to these nuances. Please use the form below to tell us why you deserve a card. This could be anything from I am an angel investor for the top 3 entertainment businesses in Lagos or can be as simple as “I am Burna Boy”. Of course, we would like as much information as possible and we have prepared a space for you to upload evidence to support your statement. Please note, due to the volume this inbox is <b>rarely monitored</b> and we suggest if you know an existing member get them to refer you so we can consider their claim. </p>
                <form className="profileForm m-auto"
                      method="POST" onSubmit={(e)=>props.handleGetCardFormSubmit(e)}>
                    <div className="form-group">
                      <label>Your Name:</label>
                      <input type="text" className="form-control" aria-describedby="Enter your name" placeholder="Enter your name" name="name" value={props.name} onChange={(e,field)=>props.handleGetCardFieldChange(e,"getcardname")}/>
                    </div>
                    <div className="form-group">
                      <label>Your Email:</label>
                      <input type="email" className="form-control" aria-describedby="Enter Email" placeholder="Enter Email" name="email" value={props.email} onChange={(e,field)=>props.handleGetCardFieldChange(e,"getcardemail")}/>
                    </div>
                    <div className="form-group">
                      <label>Occupation:</label>
                      <input type="text" className="form-control" aria-describedby="Enter Occupation" placeholder="Enter Occupation" name="occupation" value={props.occupation} onChange={(e,field)=>props.handleGetCardFieldChange(e,"getcardoccupation")}/>
                    </div>
                    <div className="form-group">
                      <label>Rationale:</label>
                      <textarea className="form-control" aria-describedby="Enter Rationale" placeholder="Enter Rationale" name="rationale" value={props.rationale} onChange={(e,field)=>props.handleGetCardFieldChange(e,"getcardrationale")}>
                      </textarea>
                    </div>
                    <div className="form-group">
                      <label>Upload Images:</label>
                      <Dropzone
                      className="dropzone"
                      activeClassName="dropzoneActive"
                      accept="image/jpeg, image/png"
                      onDrop={(accepted)=>props.onDrop(accepted)}
                      maxSize={16000000}>
                        <p>Drop some images here. Max Size 16 MBs (16000000 Bytes)</p>
                      </Dropzone>
                      <h5>Dropped files</h5>
                      <ul>
                        {
                          props.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                        }
                      </ul>
                    </div>
                    <div className="row justify-content-center">
                      <button type="submit" className="btn profileButton">Send</button>
                    </div>
                    <div className="text-center">
                      <p>You will be redirected when information is sent. Please wait until then.</p>
                    </div>
                </form>
                <div className="text-center">
                  <Link to="/" className=" cardLink">Go back</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
}

GetCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  rationale: PropTypes.string.isRequired,
  handleGetCardFieldChange: PropTypes.func.isRequired,
  handleGetCardFormSubmit: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  files: PropTypes.array,
}

export default GetCard;
