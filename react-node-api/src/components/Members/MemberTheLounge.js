import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {perks} from './perks.json';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../images/perks', false, /\.(png|jpe?g|svg)$/));
// const perksList = JSON.parse(perks);
console.log(perks)
const perkslist = perks.map((perk,index)=>{

    return(
      <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className="perkbox hvr-grow-shadow">
            <Link to={'/perks/'+perk.link} className="perkboxlink">
              <div className="perkimg m-auto" style={{
                  backgroundImage: 'url('+images[perk.imgName]+')',
                  width: '200px',
                  height: '200px',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'none'
                }}>
              </div>
              <h2 className="perkheading text-center">{perk.heading}</h2>
            </Link>
          </div>
      </div>
    );
});

const Referral = (props) => {

    return(
      <div className="row CustomHeightRow align-items-center justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6 text-center" style={{
          marginTop: "30px"
        }}>
          <h2 className="profileHeading">Welcome to your dedicated Select Lagos Lounge.</h2>
          <p className="profileHeading">Select Lagos is a private, prestigious membership group of individuals who we are dedicated to provide unique and elite services to. We have developed strong relationships with vendors on an international basis allowing us to serve Lagos’ elites at the click of a button. There is no set criteria to being a member - you have been selected as your success and brilliance has been recognised. Being an invite-only group allows us to carefully hand pick our members – ranging from athletes to influencers to DJs. Privacy is one of our core values and we maintain this to protect both the brand and our members alike. Not only will you receive your coveted Select Lagos membership card but you will also benefit from perks detailed below in your lounge below. </p>
        </div>
        <div className="row align-items-center justify-content-center allperks">
          {perkslist}
        </div>
      </div>
    );
}

Referral.propTypes = {
}

export default Referral;
