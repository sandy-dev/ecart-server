import React from 'react'
import ArrowUpward from '@material-ui/icons/ArrowUpward'

export default function Footer(props) {


  function topFunction(event, page) {
    document.body.scrollTop = 10;
    document.documentElement.scrollTop = 10;
  }

  return (
    <div className="footer" style={{ marginLeft: props.isSignedIn ? '15%' : 0 }}>


      <span> Contacts: confik.lab@gmail.com </span>

      <span>© Copyright 2019 Confik Lab - All Rights Reserved</span>

      <div className='dot scrolltop' id='dvScollTop' onClick={(event) => topFunction(event, `contact`)}>
        <ArrowUpward />
      </div>


    </div>
  );
}
