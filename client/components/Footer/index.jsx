import React from 'react';

const Footer = React.createClass({
  render() {
    return (
      <div className='ui inverted vertical footer segment' id='footer'>
        <div className='ui center aligned container'>
          <div className='ui stackable inverted divided grid'>
            <div className='three wide column'>
              <h4 className='ui inverted header'>Group 1</h4>
              <div className='ui inverted link list'>
                <a className='item' href=''>Link One</a>
                <a className='item' href=''>Link Two</a>
                <a className='item' href=''>Link Three</a>
                <a className='item' href=''>Link Four</a>
              </div>
            </div>
            <div className='three wide column'>
              <h4 className='ui inverted header'>Group 2</h4>
              <div className='ui inverted link list'>
                <a className='item' href=''>Link One</a>
                <a className='item' href=''>Link Two</a>
                <a className='item' href=''>Link Three</a>
                <a className='item' href=''>Link Four</a>
              </div>
            </div>
            <div className='three wide column'>
              <h4 className='ui inverted header'>Group 3</h4>
              <div className='ui inverted link list'>
                <a className='item' href=''>Link One</a>
                <a className='item' href=''>Link Two</a>
                <a className='item' href=''>Link Three</a>
                <a className='item' href=''>Link Four</a>
              </div>
            </div>
            <div className='seven wide column'>
              <h4 className='ui inverted header'>Footer Header</h4>
              <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
            </div>
          </div>
          <div className='ui inverted section divider'></div>
          <img className='ui centered mini image' src='/images/logo.png'/>
          <div className='ui horizontal inverted small divided link list'>
            <a href='' className='item'>Site Map</a>
            <a href='' className='item'>Contact Us</a>
            <a href='' className='item'>Terms and Conditions</a>
            <a href='' className='item'>Privacy Policy</a>
          </div>
        </div>
      </div>
    )
  }
});

export default Footer;
