import React from 'react';
import PropTypes from 'prop-types';

const Referral = (props) => {

    return(
      <div className="row CustomHeightRow align-items-center justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6">
            <h2 className="profileHeading ">Refer Someone to The Lounge</h2>
            <h6 className="profileHeading ">Send an email and some details of the person to us and we will select them as the member of the Select Lagos Lounge if possible.</h6>
            <form className="profileForm m-auto" action="https://formspree.io/genesishexdevs@gmail.com"
                  method="POST">
                <div className="form-group">
                  <label>Your Name:</label>
                  <input type="text" className="form-control" aria-describedby="Enter your name" placeholder="Enter your name" value={`${props.user.first_name} ${props.user.last_name}`} name="_referrer-name"/>
                </div>
                <div className="form-group">
                  <label>Your Email:</label>
                  <input type="email" className="form-control" aria-describedby="Enter Email" placeholder="Enter Email" value={`${props.user.email}`} name="_referrer-email"/>
                </div>
                <div className="form-group">
                  <label>Person you are referring{"'"}s Name:</label>
                  <input type="text" className="form-control" aria-describedby="Enter referee name" placeholder="Enter referee name" name="_referee-name"/>
                </div>
                <div className="form-group">
                  <label>Person you are referring{"'"}s Email:</label>
                  <input type="email" className="form-control" aria-describedby="Enter referee Email" placeholder="Enter referee Email" name="_referee-email"/>
                </div>
                <div className="form-group">
                  <label>Rationale:</label>
                  <textarea className="form-control" aria-describedby="Enter Rationale" placeholder="Enter Rationale" name="_rationaleforconsideration">
                  </textarea>
                </div>
                <input type="hidden" name="_subject" value="New Referral Submission on Select Lagos!" />
                <div className="row justify-content-center">
                  <button type="submit" className="btn profileButton">Send</button>
                </div>
            </form>
        </div>
      </div>
    );
}

Referral.propTypes = {
  user: PropTypes.object.isRequired
}

export default Referral;
