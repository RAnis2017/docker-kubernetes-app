import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
  return(
    <div className="current-active-tab">
      <h1>{props.heading}</h1>
      <p>{props.description}</p>
    </div>
  );
};

Heading.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Heading;
