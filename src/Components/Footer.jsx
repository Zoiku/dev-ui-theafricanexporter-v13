import "../Styles/Footer.css";
import { NavLink } from "react-router-dom";
import { contactEventTracker } from "./GoogleAnalytics";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const navStyle = {
    color: "inherit",
    textDecoration: "none",
  };

  const handleWhatsapp = () => {
    contactEventTracker("whatsapp");
    window.open("https://wa.me/233508556755?text=Hello there!", "_blank");
  };

  const handleMail = () => {
    contactEventTracker("email");
    window.open("mailto:hello@theafricanexporter.com");
  };

  return (
    <footer className="Footer">
      <div>
        <div>About</div>
        <ul>
          <li>
            <NavLink style={navStyle} to="/about#company">
              Company
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/about#how-it-works">
              How it works
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/about#payment-options">
              Payment Options
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/about#buyers">
              Buyers
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/about#merchants">
              Merchants
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/faq">
              FAQs
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <div>Legal</div>
        <ul>
          <li>
            <NavLink style={navStyle} to="/legal#tos">
              Terms of Service
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/legal#payment-tos">
              Payment Terms
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/legal#payment-tos">
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/legal#cookie-policy">
              Cookie Policy
            </NavLink>
          </li>
          <li>
            <NavLink style={navStyle} to="/legal#sales-and-purchase-agreement">
              Sale and Purchase Agreement
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <div>Contact</div>
        <ul className="footer-contact-container">
          <li onClick={handleMail}>
            <span>
              <EmailIcon fontSize="small" />
            </span>
            <span>hello@theafricanexporter.com</span>
          </li>
          <li onClick={handleWhatsapp}>
            <span>
              <WhatsAppIcon fontSize="small" />
            </span>
            <span>00233508556755</span>
          </li>
        </ul>
      </div>

      <div>
        <span>Copyright © Afrigateway Limited. All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
