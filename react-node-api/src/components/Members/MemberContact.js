import React from 'react';
import PropTypes from 'prop-types';

const Contact = (props) => {

    return(
      <div className="row CustomHeightRow align-items-center justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6">
            <h2 className="profileHeading ">Contact Us</h2>
            <h6 className="profileHeading ">The Select Lagos service team are dedicated to our clients and will endeavour to respond to all queries within 48 hours. Please use the form below for any queries you have.</h6>
            <form className="profileForm m-auto" action="https://formspree.io/genesishexdevs@gmail.com"
                  method="POST">
                <div className="form-group">
                  <label>Your Name:</label>
                  <input type="text" className="form-control" aria-describedby="Enter your name" placeholder="Enter your name" value={`${props.user.first_name} ${props.user.last_name}`} name="_member-name"/>
                </div>
                <div className="form-group">
                  <label>Your Email:</label>
                  <input type="email" className="form-control" aria-describedby="Enter Email" placeholder="Enter Email" value={`${props.user.email}`} name="_member-email"/>
                </div>
                <div className="form-group">
                  <label>Subject (lost card, ad hoc query etc):</label>
                  <input type="text" className="form-control" aria-describedby="Enter Subject" placeholder="Enter Subject" name="_contact-subject"/>
                </div>
                <div className="form-group">
                  <label>Message:</label>
                  <textarea className="form-control" aria-describedby="Enter Message" placeholder="Enter Message" name="_message">
                  </textarea>
                </div>
                <input type="hidden" name="_subject" value="New Contact form Submission on Select Lagos!" />
                <div className="row justify-content-center">
                  <button type="submit" className="btn profileButton">Send</button>
                </div>
            </form>
        </div>
      </div>
    );
}

Contact.propTypes = {
  user: PropTypes.object.isRequired
}

export default Contact;
