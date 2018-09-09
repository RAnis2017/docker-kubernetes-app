import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';
import {perks} from './perks.json';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../images/perks', false, /\.(png|jpe?g|svg)$/));
// const perksList = JSON.parse(perks);

const Perk = (props) => {
    const SinglePerk = perks.map((perk,index)=>{
        if(perk.link==props.match.params.perkname){
          return(
            <div className="col-sm-12 col-md-8 col-lg-6 text-center" key={index}>
                <div className="perkimg m-auto" style={{
                      backgroundImage: 'url('+images[perk.imgName]+')',
                      width: '200px',
                      height: '200px',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'none'
                    }}>
                  </div>
                  <h2 className="profileHeading">{perk.heading}</h2>
                  <p className="profileHeading" dangerouslySetInnerHTML={{__html: perk.content.replace("membername", props.memberName).replace("memberemail", props.memberEmail)}}></p>
            </div>
          );
        }
    });
    return(
      <div className="row CustomHeightRow align-items-center justify-content-center">
        { SinglePerk }
      </div>
    );
}

Perk.propTypes = {
  memberName: PropTypes.string.isRequired,
  memberEmail: PropTypes.string.isRequired
}

export default Perk;
