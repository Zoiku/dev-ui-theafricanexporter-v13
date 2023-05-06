import "../Styles/About.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import howitworks1 from "../Assets/1.png";
import howitworks2 from "../Assets/2.png";
import howitworks3 from "../Assets/3.png";
import howitworks4 from "../Assets/4.png";

import globe from "../Assets/t1.webp";
import travel from "../Assets/Charco - Travel International.png";
import we from "../Assets/The Movement - Your World.png";
import trees from "../Assets/Allura - Trees.png";
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

const About = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        setActiveLink(location.hash.substring(1));
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="About">
            <div className="container">
                <div className="quick-links">
                    <span style={{ marginBottom: 20, fontSize: 30, fontWeight: 600, display: "block" }}>Quick Links</span>
                    <ul>
                        <li><a href="#company" className={activeLink === "company" ? "active-link" : ""}>Company</a></li>
                        <li><a href="#how-it-works" className={activeLink === "how-it-works" ? "active-link" : ""}>How It Works</a></li>
                        <li><a href="#payment-options" className={activeLink === "payment-options" | activeLink.substring(0, 15) === "payment-options" ? "active-link" : ""}>Payment Options</a></li>
                        <li><a href="#buyers" className={activeLink === "buyers" ? "active-link" : ""}>Buyers</a></li>
                        <li><a href="#merchants" className={activeLink === "merchants" ? "active-link" : ""}>Merchants</a></li>
                    </ul>
                </div>
                <div className="section-containers">
                    {
                        activeLink === "company" &&
                        <section id="company">
                            <div className="about-section-primary-title">Democratising <span className="special-text-style">access to global supply chain</span> systems</div>
                            <div className="section-content">
                                <Zoom>
                                    <div className="company-tiles-container">
                                        <div className="tiles-icon">
                                            <img src={globe} alt="" />
                                        </div>
                                        <div className="tiles-text"><span className="first-words">TheAfricanExporter.com</span> is a B2B marketplace connecting Global buyers directly to wholesale exporters of Agro – based products in Africa.</div>
                                    </div>

                                    <div className="company-tiles-container">
                                        <div className="tiles-icon">
                                            <img src={travel} alt="" />
                                        </div>
                                        <div className="tiles-text"><span className="first-words">Our raison d’etre</span> is to champion and facilitate the diversification of Africa’s exports through a fanatical focus on Agro – based products.</div>
                                    </div>

                                    <div className="company-tiles-container">
                                        <div className="tiles-icon">
                                            <img src={trees} alt="" />
                                        </div>
                                        <div className="tiles-text"><span className="first-words">Africa</span>with its enormous natural resources and a population of 1.2 people contributes a paltry 3% to global trade. Intra – continental trade is only 17%, compared with 59% for Asia and 68% for Europe.</div>
                                    </div>

                                    <div className="company-tiles-container">
                                        <div className="tiles-icon">
                                            <img src={we} alt="" />
                                        </div>
                                        <div className="tiles-text"><span className="first-words">We</span>are on an avowed mission to rewrite Africa’s narrative, thereby exponentially increasing intra – continental trade as well as its contribution to global trade.</div>
                                    </div>
                                </Zoom>
                            </div>
                        </section>
                    }

                    {
                        activeLink === "how-it-works" &&
                        <section id="how-it-works">
                            <div className="about-section-primary-title">Gain access to <span className="special-text-style">unlimited Supply</span> in 4 simple steps</div>
                            <div className="section-content">
                                <Fade right>
                                    <div className="hiw-container">
                                        <div className="hiw-desc-container">
                                            <div className="hiw-numbering">01</div>
                                            <div className="hiw-text">Place a Request for Quotations from Merchants.</div>
                                        </div>
                                        <div className="hiw-image-container">
                                            <img src={howitworks1} alt="" />
                                        </div>
                                    </div>

                                    <div className="hiw-container">
                                        <div className="hiw-desc-container">
                                            <div className="hiw-numbering">02</div>
                                            <div className="hiw-text">Choose preferred offer from quotations provided by Merchants.</div>
                                        </div>
                                        <div className="hiw-image-container">
                                            <img src={howitworks2} alt="" />
                                        </div>
                                    </div>

                                    <div className="hiw-container">
                                        <div className="hiw-desc-container">
                                            <div className="hiw-numbering">03</div>
                                            <div className="hiw-text">Confirm your Order by providing Proof of Payment.</div>
                                        </div>
                                        <div className="hiw-image-container">
                                            <img src={howitworks3} alt="" />
                                        </div>
                                    </div>

                                    <div className="hiw-container">
                                        <div className="hiw-desc-container">
                                            <div className="hiw-numbering">04</div>
                                            <div className="hiw-text">Your Order is processed and delivered to Destination Port.</div>
                                        </div>
                                        <div className="hiw-image-container">
                                            <img src={howitworks4} alt="" />
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </section>
                    }

                    {
                        activeLink === "payment-options" |
                            activeLink === "payment-options-cash-against-document" |
                            activeLink === "payment-options-letter-of-credit" |
                            activeLink === "payment-options-cash-bank-transfer"
                            ?
                            <section id="payment-options">
                                <div className="about-section-primary-title">Any of the following <span className="special-text-style">Payment Options</span> are accepted</div>
                                <div className="section-content">
                                    <Zoom>
                                        <div id="payment-options-cash-against-document" className="payment-section-container non-alternate">
                                            <div className="payment-option-title-container">Documentary Collections
                                                <div style={{ fontSize: "small", color: "#efefef" }}>( Cash against Document )</div>
                                                <br />
                                                <span className="material-symbols-rounded">
                                                    content_copy
                                                </span>
                                            </div>
                                            <div className="payment-option-text">
                                                <div>
                                                    With this option, 10% of the total amount payable has to be deposited into an Escrow account, before the Order will be fulfilled by the Merchant. The remaining amount (90%) will be paid by Bank transfer once scanned copies of shipping douments have been sent to the Buyer. The funds in the Escrow account will also be released into our account simultaneously. Once 100% payment has been recieved, original copies of the shipping documents will be sent via courier to the Buyer.
                                                    <div className="proof-of-payment-update">Proof of payment will constitute the Buyer depositing 10% of the total transaction amount into an Escrow account.</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="payment-options-cash-bank-transfer" className="payment-section-container alternate">
                                            <div className="payment-option-title-container">Bank Transfer
                                                <br />
                                                <br />
                                                <span className="material-symbols-rounded">
                                                    account_balance
                                                </span>
                                            </div>
                                            <div className="payment-option-text">
                                                <div>
                                                    An initial deposit of 10% of the total amount payable has to be deposited into our account, before the Order will be fulfilled by the Merchant. The remaining amount (90%) will be paid once scanned copies of shipping documents have been sent to the Buyer. Once 100% payment has been recieved, original copies of the shipping documents will be sent via courier to the Buyer.
                                                    <div className="proof-of-payment-update">Proof of payment will constitute the Buyer depositing 10% of the total transaction amount into our Bank account.</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="payment-options-letter-of-credit" className="payment-section-container non-alternate">
                                            <div className="payment-option-title-container">Letters of Credit
                                                <br />
                                                <br />
                                                <span className="material-symbols-rounded">
                                                    receipt
                                                </span>
                                            </div>
                                            <div className="payment-option-text">
                                                <div>
                                                    We only accept Irrevocable Letters of Credit with payment at Sight.
                                                    <div className="proof-of-payment-update">Proof of payment will constitute the receipt and confirmation of the Buyer’s Letter of Credit by our Bank.</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="payment-section-container alternate">
                                            <div className="payment-option-title-container">Bank Details
                                                <br />
                                                <br />
                                                <span className="material-symbols-rounded">
                                                    account_balance_wallet
                                                </span>
                                            </div>
                                            <div className="payment-option-text">
                                                <div>
                                                    <div><span>Company Name</span>: <span style={{ fontWeight: 500 }}>AFRIGATEWAY LIMITED</span></div>
                                                    <div><span>Branch Name</span>: <span style={{ fontWeight: 500 }}>FIDELITY BANK GHANA</span></div>
                                                    <div><span>Bank Account Number</span>: <span style={{ fontWeight: 500 }}>1951191585112</span></div>
                                                    <div><span>Bank Branch</span>: <span style={{ fontWeight: 500 }}>HAATSO</span></div>
                                                    <div><span>Swift Code</span>: <span style={{ fontWeight: 500 }}>FBLIGHAC</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Zoom>
                                </div>
                            </section>
                            : null
                    }

                    {
                        activeLink === "buyers" &&
                        <section id="buyers">
                            <div className="about-section-primary-title">Benefits for <span className="special-text-style">Buyers</span></div>
                            <div className="section-content">
                                <div className="benefits-cards-container">
                                    <div className="benefits-card">
                                        <div className="card-title">Unlimited Supply</div>
                                        <div className="card-content">
                                            Gain access to continuous streams of Quotations and subsequent Supply from Merchants across Africa
                                        </div>
                                        <div className="background-icon">
                                            <span className="material-symbols-rounded">
                                                flight
                                            </span>
                                        </div>
                                    </div>
                                    <div className="benefits-card">
                                        <div className="card-title">Verified & Vetted Merchants</div>
                                        <div className="card-content">
                                            Source directly and at wholesale prices from credible and reliable Merchants
                                        </div>
                                        <div className="background-icon">
                                            <span className="material-symbols-rounded">
                                                support_agent
                                            </span>
                                        </div>
                                    </div>
                                    <div className="benefits-card">
                                        <div className="card-title">Buyer Protection</div>
                                        <div className="card-content">
                                            All exports are insured under a Product Liability / Guarantee policy. Buyers are assured of 100% returns of their funds in case products do not meet the agreed terms / standards
                                        </div>
                                        <div className="background-icon">
                                            <span className="material-symbols-rounded">
                                                admin_panel_settings
                                            </span>
                                        </div>
                                    </div>
                                    <div className="benefits-card">
                                        <div className="card-title">Seamless Procurement</div>
                                        <div className="card-content">
                                            A One – stop marketplace to aggregate and coordinate procurement of Agro – based products in unlimited quantities from Merchants across Africa
                                        </div>
                                        <div className="background-icon">
                                            <span className="material-symbols-rounded">
                                                local_shipping
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }

                    {
                        activeLink === "merchants" &&
                        <section id="merchants">
                            <div className="about-section-primary-title">Benefits for <span className="special-text-style">Merchants</span></div>
                            <div className="section-content">
                                <div className="benefits-cards-container">
                                    <div className="benefits-card">
                                        <div className="card-title">Unlimited Demand</div>
                                        <div className="card-content">
                                            Gain access to continuous streams of Business Leads from across the world, leading to more clients and increased revenue
                                        </div>
                                        <div className="background-icon">
                                            <span className="material-symbols-rounded">
                                                monitoring
                                            </span>
                                        </div>
                                    </div>
                                    <div className="benefits-card">
                                        <div className="card-title">Guaranteed Payment</div>
                                        <div className="card-content">
                                            Instant and upfront payment once goods are delivered to the Departure Port. No more payment worries
                                        </div>
                                        <div className="background-icon">
                                            <span className="material-symbols-rounded">
                                                monetization_on
                                            </span>
                                        </div>
                                    </div>
                                    <div className="benefits-card">
                                        <div className="card-title">Non – collaterized Loans</div>
                                        <div className="card-content">
                                            Get working capital loans sans collateral at competitive rates
                                        </div>
                                        <div className="background-icon">
                                            <span className="material-symbols-rounded">
                                                credit_score
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }

                </div>
            </div>
        </div>
    )
}

export default About;