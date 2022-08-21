import React from 'react'
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import "./Footer.css"
const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>Download our App</h4>
            <p>Download App for android and IOS mobile phone</p>
            <img src={playstore} alt="playstore"/>
            <img src={appstore} alt="Appstore"/>
        </div>
        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High quality is our first priority</p>
            <p>Copyrights 2022 &copy;Pranjal Shah</p>
        </div>
        <div className="rightFooter">
            <h4>Follow us</h4>
            <a href="https://www.instagram.com/_pranjalshah1208">Instagram</a>
        </div>
        
    </footer>
  )
}

export default Footer;