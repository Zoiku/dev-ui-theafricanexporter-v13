import "../Styles/Legal.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Legal = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        setActiveLink(location.hash.substring(1));
        window.scrollTo(0, 0);
    }, [location])

    return (
        <div className="Legal">
            <div className="container">
                <div className="quick-links">
                    <span style={{ marginBottom: 20, fontSize: 30, fontWeight: 600, display: "block" }}>Quick Links</span>
                    <ul>
                        <li><a href="#tos" className={activeLink === "tos" | activeLink.substring(0, 3) === "tos" ? "active-link" : ""}>Terms of Service</a></li>
                        <li><a href="#payment-tos" className={activeLink === "payment-tos" | activeLink.substring(0, 3) === "pos" ? "active-link" : ""}>Payment Terms</a></li>
                        <li><a href="#privacy-policy" className={activeLink === "privacy-policy" ? "active-link" : ""}>Privacy Policy</a></li>
                        <li><a href="#cookie-policy" className={activeLink === "cookie-policy" ? "active-link" : ""}>Cookie Policy</a></li>
                        <li><a href="#sales-and-purchase-agreement" className={activeLink === "sales-and-purchase-agreement" ? "active-link" : ""}>Sale and Purchase Agreement</a></li>
                    </ul>
                </div>
                <div className="section-containers">
                    {
                        activeLink === "tos" |
                            activeLink === "tos-the-service" |
                            activeLink === "tos-requesting-for-quotations-and-orders" |
                            activeLink === "tos-providing-quotations-and-orders" |
                            activeLink === "tos-content" |
                            activeLink === "tos-fees" |
                            activeLink === "tos-africagateway-platform-rules" |
                            activeLink === "tos-termination-suspension-and-other-measures" |
                            activeLink === "tos-modification" |
                            activeLink === "tos-africagateway-role" |
                            activeLink === "tos-member-accounts" |
                            activeLink === "tos-disclaimer-of-warranties" |
                            activeLink === "tos-limitations-on-liability" |
                            activeLink === "tos-indemnification" |
                            activeLink === "tos-miscellaneous"

                            ?

                            <section id="tos">
                                <div className="about-section-primary-title">Terms of Service</div>
                                <div className="section-content">
                                    <div>
                                        Please read these Terms of Service ("<b>Terms</b>" or "<b>Terms of Service</b>") carefully before using the website, platform and other offerings at <a style={{ fontWeight: 500 }} href="/">www.theafricanexporter.com</a> (together, or individually, the "<b>Service</b>") operated by Afrigateway Limited ("<b>Afrigateway</b>", "<b>us</b>", "<b>we</b>", or "<b>our</b>"). For purposes of these Terms, “<b>you</b>” and “<b>your</b>” means you as the user of the Service. These Terms are a binding legal agreement between you and Afrigateway that govern your right to use the Service.
                                        <div className="margin-bottom-10"></div>
                                        Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms.
                                        <div className="margin-bottom-10"></div>
                                        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the Terms, then you do not have permission to access the Service. If you are accessing or using the Service on behalf of a business or entity, then your business or entity is legally and financially responsible for your access to and use of the Service as well as for the use of your account by others affiliated with your entity, including any employees, agents or contractors.
                                        Our Service offers an online platform that enables users (“<b>Members</b>”) to post requests for quotations (“<b>Requests</b>”) for products (“<b>Agro – based products</b>”) as well as provide quotations (“<b>Quotations</b>”) to these requests. Members who post requests for quotations are “<b>Buyers</b>” and Members who provide quotations to these requests are “<b>Merchants</b>”. The Buyers and Merchants also purchase and supply products requested and quoted for, respectively.
                                        <div className="margin-bottom-10"></div>
                                        As the provider of the Service, Afrigateway does not post requests, provide quotes, purchase or supply products. Afrigateway is not a party to the contracts entered into directly between Buyers and Merchant, nor is Afrigateway a commodities broker or sales agency. Afrigateway is not acting as an agent in any capacity for any Member, except as specified in the <a style={{ fontWeight: 500 }} href="#payment-tos">Payments Terms of Service</a> (“<b>Payment Terms</b>”).
                                        <div className="margin-bottom-10"></div>
                                        In order to access the Service, you will be required to create an online account ("Account"). We may refuse to let you register or use the Service in our sole discretion, and we are not obliged to provide you with any reasons for such refusal. We may do this even if you complete the signing up process and agree to these Terms.
                                        <div className="margin-bottom-10"></div>
                                        You may not use sign up for the Service if you are younger than 18 years of age. By using the Service, you represent and warrant that you are over the age of 18. You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                                        <div className="margin-bottom-10"></div>
                                        All information you give us must be truthful, accurate and complete. This includes the information that you provide during signing up, vetting and at any time after that.
                                    </div>

                                    <div>
                                        <div className="large-large-large-heading" style={{ margin: "20px 0 10px 0" }}><b>Table of Contents</b></div>
                                        <div className="toc" style={{ marginBottom: 25 }}>
                                            <div>
                                                <span><a href="#tos-the-service">1. The Service</a></span>
                                                <span>Buyer Terms</span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-requesting-for-quotations-and-orders">2. Requesting for Quotations and Orders</a></span>
                                                <span>Merchant Terms</span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-providing-quotations-and-orders">3.	Providing Quotations and Orders</a></span>
                                                <span>General Terms</span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-content">4.	Content</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-fees">5.	Fees</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-africagateway-platform-rules">6.	Afrigateway Platform Rules</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-termination-suspension-and-other-measures">7.	Termination, Suspension and other Measures</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-modification">8.	Modification</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-africagateway-role">9.	Afrigateway’s Role</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-member-accounts">10.	Member Accounts</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-disclaimer-of-warranties">11.	Disclaimer of Warranties</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-limitations-on-liability">12.	Limitations on Liability</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-indemnification">13.	Indemnification</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#tos-miscellaneous">14.	Miscellaneous</a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-the-service">
                                    <div className="large-large-large-heading">1. The Service</div>
                                    <div>
                                        The Service constitute a technology platform that enables users of Afrigateway’s mobile applications or websites provided as part of the Services to request and order the supply of physical products or goods with independent third party suppliers of such products or goods (Merchants) under agreement with Afrigateway.
                                        <b>
                                            YOU ACKNOWLEDGE THAT AFRIGATEWAY DOES NOT SUPPLY PHYSICAL PRODUCTS OR GOODS AND THAT ALL SUCH PRODUCTS OR GOODS ARE SUPPLIED BY INDEPENDENT THIRD PARTY SUPPLIERS WHO ARE NOT EMPLOYED BY AFRIGATEWAY OR ANY OF ITS AFFILIATES.

                                        </b>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-requesting-for-quotations-and-orders">
                                    <div className="buyer-terms">Buyer Terms</div>

                                    <div className="large-large-large-heading">2. Requesting for Quotations and Orders</div>
                                    <div>
                                        <div className="large-large-large-large-heading">2.1 Requests.</div>
                                        <div>
                                            You can place a Request for Quotation for products indicated or displayed on the platform. You can indicate the specifications, quantities, incoterm and validity periods.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.2 Orders.</div>
                                        <div>
                                            We collect personal information about you when you use the Afrigateway Platform. Without it, we may not be able to provide all services requested. This information includes:

                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.3 Sales and Purchase Agreement.</div>
                                        <div>
                                            As part of the process of confirming an order, you will have to agree to a <a href="legal#sales-and-purchase-agreement">Sale and Purchase Agreement</a> between you and the Merchant. You will be bound by the terms of this Agreement. It is your responsibility to read and understand these terms prior to confirming the order.
                                        </div>
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="tos-providing-quotations-and-orders">
                                    <div className="buyer-terms">Merchant Terms</div>

                                    <div className="large-large-large-heading">3.	Providing Quotations and Orders</div>
                                    <div>
                                        <div className="large-large-large-large-heading">3.1 Quotations.</div>
                                        <div>
                                            You can choose to provide quotations to a request by a buyer that is sent to your Feed. You may have to fill in more details regarding your quotation. Quotations are to be quoted in United States Dollars. You must do so taking cognizance of your supply ability. Your quotation to a request means that you have the ability to fulfil it.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.2 Orders.</div>
                                        <div>
                                            You can place a Request for Quotation for products indicated or displayed on the platform. You can indicate the specifications, quantities, incoterm and validity periods.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.3 Sales and Purchase Agreement.</div>
                                        <div>
                                            Your acceptance to fulfil an order and subsequent fulfilment of that order will constitute consent to the <a href="legal#sales-and-purchase-agreement">Sale and Purchase Agreement</a> between you and the Buyer.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.4 Independence of Merchants.</div>
                                        <div>
                                            Your relationship with Afrigateway is that of an independent entity and not an employee, agent, joint venturer, or partner of Afrigateway, except that Afrigateway acts as a payment collection agent as described in the Payments Terms. Afrigateway does not direct or control your supply ability, and you agree that you have complete discretion whether and when to offer your products, and at what price to offer them.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.5 Independence of Merchants.</div>
                                        <div>
                                            You warrant that all goods to be supplied will be as requested and ordered by the Buyer. You warrant that under no circumstances will you supply any goods that are substandard and not matching what was requested and ordered by the Buyer.
                                        </div>
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="tos-content">
                                    <div className="buyer-terms">General Terms</div>
                                    <div className="large-large-large-heading">4.	Content</div>
                                    <div>
                                        Parts of the Afrigateway Platform enable you to provide feedback, text, information, and other content (collectively, “Content”). By providing Content, in whatever form and through whatever means, you grant Afrigateway a non-exclusive, worldwide, royalty-free, irrevocable, perpetual, sub-licensable and transferable license to copy, modify, prepare derivative works of, distribute, publish and otherwise exploit, that Content, without limitation. If Content includes personal information, our Privacy Policy describes how we use that personal information. Where Afrigateway pays for the creation of Content or facilitates its creation, Afrigateway may own that Content, in which case supplemental terms or disclosures will say that. You are solely responsible for all Content that you provide and warrant that you either own it or are authorized to grant Afrigateway the rights described in these Terms. You are responsible and liable if any of your Content violates or infringes the intellectual property or privacy rights of any third party. You agree that Afrigateway may make available services or automated tools to translate Content and that your Content may be translated using such services or tools. Afrigateway does not guarantee the accuracy or quality of translations and Members are responsible for confirming the accuracy of such translations.
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-fees">
                                    <div className="large-large-large-heading">5.	Fees</div>
                                    <div>
                                        To help Afrigateway run smoothly and to cover the cost of services, we charge Merchants a commission when a transaction is completed via our platform. The commission is 6% of the value of the products (excluding freight and insurance costs), which is deducted from the Merchant payout. Except as otherwise provided on the Afrigateway Platform, commissions are non-refundable. Afrigateway reserves the right to change the service fees at any time, and will provide Members notice of any fee changes before they become effective. Fee changes will not affect bookings made prior to the effective date of the fee change. If you disagree with a fee change you may terminate this agreement at any time pursuant to Section 7.2.
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-africagateway-platform-rules">
                                    <div className="large-large-large-heading">6.	Afrigateway Platform Rules</div>
                                    <div>
                                        You must follow these rules and must not help or induce others to break or circumvent these rules
                                    </div>
                                    <div>
                                        <div>Do not scrape, hack, reverse engineer, compromise or impair the Afrigateway Platform</div>
                                        <ul>
                                            <li>Do not use bots, crawlers, scrapers, or other automated means to access or collect data or other content from or otherwise interact with the Afrigateway Platform.</li>
                                            <li>Do not hack, avoid, remove, impair, or otherwise attempt to circumvent any security or technological measure used to protect the Afrigateway Platform or Content.</li>
                                            <li>Do not decipher, decompile, disassemble, or reverse engineer any of the software or hardware used to provide the Afrigateway Platform.</li>
                                            <li>Do not take any action that could damage or adversely affect the performance or proper functioning of the Afrigateway Platform.</li>
                                        </ul>
                                        <div style={{ margin: "20px 0", fontWeight: "bold", fontSize: "large" }}>Only use the Afrigateway Platform as authorized by these Terms or another agreement with us</div>
                                        <ul>
                                            <li>You may only use another Member’s personal information as necessary to facilitate a transaction using the Afrigateway Platform as authorized by these Terms.</li>
                                            <li>Do not use the Afrigateway Platform or Members’ personal information to send commercial messages without the recipient’s express consent. </li>
                                            <li>You may use Content made available through the Afrigateway Platform solely as necessary to enable your use of the Afrigateway Platform as a Merchant or Buyer.</li>
                                            <li>Do not use Content unless you have permission from the Content owner or the use is authorized by us in these Terms or another agreement you have with us.</li>
                                            <li>Do not request, provide quote, or accept an order or any payment outside of the Afrigateway Platform to avoid paying fees, taxes or for any other reason. </li>
                                            <li>Do not engage in any sale and purchase transaction outside our  platform with any user previously engaged on the Afrigateway Platform </li>
                                            <li>Do not supply defective, substandard or wrong product or goods to a buyer</li>
                                            <li>Do not request or confirm an order unless you are actually ready to make a purchase.</li>
                                            <li>Do not provide quote or confirm order unless you are actually ready to make a sale.</li>
                                            <li>Do not use, copy, display, mirror or frame the Afrigateway Platform, any Content, any Afrigateway branding, or any page layout or design without our consent.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-termination-suspension-and-other-measures">
                                    <div className="large-large-large-heading">7.	Termination, Suspension and other Measures</div>
                                    <div>
                                        <div className="large-large-large-large-heading">7.1 Term.</div>
                                        <div>
                                            The agreement between you and Afrigateway reflected by these Terms is effective when you access the Afrigateway Platform (for example to create an account) and remains in effect until either you or we terminate the agreement in accordance with these Terms.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">7.2 Termination.</div>
                                        <div>
                                            You may terminate this agreement at any time by sending us an email or by deleting your account. Afrigateway may terminate this agreement and your account for any reason by giving you 30 days’ notice via email or using any other contact information you have provided for your account. Afrigateway may also terminate this agreement immediately and without notice and stop providing access to the Afrigateway Platform if you breach these Terms, you violate applicable laws, or we reasonably believe termination is necessary to protect Afrigateway, its Members, or third parties. If your account has been inactive for more than two years, we may terminate your account without prior notice.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">7.3 Member Violations.</div>
                                        <div>
                                            If (i) you breach these Terms, (ii) you violate applicable laws, regulations, or third-party rights, or (iii) Afrigateway believes it is reasonably necessary to protect Afrigateway, its Members, or third parties; Afrigateway may, with or without prior notice:
                                        </div>
                                        <div>
                                            <ul>
                                                <li>suspend or limit your access to or use of the Afrigateway Platform and/or your account;</li>
                                                <li>suspend or remove Requests, Quotes, or other Content;</li>
                                                <li>cancel pending or confirmed requests or orders; or</li>
                                                <li>suspend or revoke any special status associated with your account.</li>
                                            </ul>
                                        </div>
                                        <div style={{ margin: "20px 0" }}>
                                            For minor violations or where otherwise appropriate as Afrigateway determines in its sole discretion, you will be given notice of any intended measure by Afrigateway and an opportunity to resolve the issue. You may appeal actions taken by us under this Section by contacting customer service.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">7.4 Legal Mandates.</div>
                                        <div>
                                            Afrigateway may take any action it determines is reasonably necessary to comply with applicable law, or the order or request of a court, law enforcement, or other administrative agency or governmental body, including the measures described above in Section 7.3.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">7.5 Effect of Termination.</div>
                                        <div>
                                            If you are a Merchant and terminate your Afrigateway account, any confirmed order(s) will be automatically cancelled. If you terminate your account as a Buyer, any confirmed order(s) will be automatically cancelled and all deposit(s) made prior to Merchant(s) commencing fulfilment of your order(s) will be forfeited. When this agreement has been terminated, you are not entitled to a restoration of your account or any of your Content. If your access to or use of the Afrigateway Platform has been limited, or your Afrigateway account has been suspended, or this agreement has been terminated by us, you may not register a new account or access or use the Afrigateway Platform through an account of another Member.
                                        </div>
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="tos-modification">
                                    <div className="large-large-large-heading">8.	Modification</div>
                                    <div>
                                        Afrigateway may modify these Terms at any time. When we make material changes to these Terms, we will post the revised Terms on the Afrigateway Platform and update the “Last Updated” date at the top of these Terms. We will also provide you with notice of any material changes by email at least 30 days before the date they become effective. If you disagree with the revised Terms, you may terminate this agreement immediately as provided in these Terms. If you do not terminate your agreement before the date the revised Terms become effective, your continued access to or use of the Afrigateway Platform will constitute acceptance of the revised Terms.
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-africagateway-role">
                                    <div className="large-large-large-heading">9.	Afrigateway’s Role</div>
                                    <div>
                                        We offer you the right to use a platform that enables Members to place requests, provide quotes or offers, and make orders and payments. While we work hard to ensure our Members have great experiences using Afrigateway, we do not and cannot control the conduct of Buyers and Merchants. You acknowledge that Afrigateway has the right, but does not have any obligation, to monitor the use of the Afrigateway Platform and verify information provided by our Members. For example, we may review, disable access to, remove, or edit Content to: (i) operate, secure and improve the Afrigateway Platform (including for fraud prevention, risk assessment, investigation and customer support purposes); (ii) ensure Members’ compliance with these Terms; (iii) comply with applicable law or the order or requirement of a court, law enforcement or other administrative agency or governmental body; (iv) address Content that we determine is harmful or objectionable; and (v) take actions set out in these Terms. Members agree to cooperate with and assist Afrigateway in good faith, and to provide Afrigateway with such information and take such actions as may be reasonably requested by Afrigateway with respect to any investigation undertaken by Afrigateway regarding the use or abuse of the Afrigateway Platform. Afrigateway is not acting as an agent for any Member except for where we acts as a collection agent as provided in the Payments Terms.
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-member-accounts">
                                    <div className="large-large-large-heading">10.	Member Accounts</div>
                                    <div>
                                        You must register an account to access and use many features of the Afrigateway Platform. Registration is only permitted for legal entities, partnerships and natural persons who are 18 years or older. You represent and warrant that you are not a person or entity barred from using the Afrigateway Platform under the laws of Ghana, your place of residence, or any other applicable jurisdiction. You must provide accurate, current, and complete information during registration and keep your account information up-to-date. You may not register more than one account or transfer your account to someone else. You are responsible for maintaining the confidentiality and security of your account credentials and may not disclose your credentials to any third party. You are responsible and liable for activities conducted through your account and must immediately notify Afrigateway if you suspect that your credentials have been lost, stolen, or your account is otherwise compromised. If and as permitted by applicable law, we may, but have no obligation to (i) ask you to provide identification or other information, (ii) undertake checks designed to help verify your identity or background, (iii) screen you against third-party databases or other sources and request reports from service providers, and (iv) obtain reports from public records of criminal convictions or sex offender registrations or their local equivalents.
                                        All information you give us must be truthful, accurate and complete. This includes the information that you provide in the vetting process, the registration process and at any time after that.
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-disclaimer-of-warranties" style={{ fontWeight: 600 }}>
                                    <div className="large-large-large-heading">11.	Disclaimer of Warranties</div>
                                    <div>
                                        We provide the Afrigateway Platform and all Content “as is” without warranty of any kind and we disclaim all warranties, whether express or implied. For example: (i) we do not warrant the performance or non-interruption of the Afrigateway Platform; and (ii) we do not warrant that verification, identity or background checks conducted on Members will identify past misconduct or prevent future misconduct. The disclaimers in these Terms apply to the maximum extent permitted by law. If you have statutory rights or warranties we cannot disclaim, the duration of any such statutorily required rights or warranties, will be limited to the maximum extent permitted by law.
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="tos-limitations-on-liability" style={{ fontWeight: 600 }}>
                                    <div className="large-large-large-heading">12.	Limitations on Liability</div>
                                    <div>
                                        Neither Afrigateway (including its affiliates and personnel) nor any other party involved in creating, producing, or delivering the Afrigateway Platform or any Content will be liable for any incidental, special, exemplary or consequential damages, including lost profits, loss of data or loss of goodwill, service interruption, computer damage or system failure or the cost of substitute products or services arising out of or in connection with (i) these Terms, (ii) the use of or inability to use the Afrigateway Platform or any Content, (iii) any communications or interactions you may have with someone you interact with through, or as a result of, your use of the Afrigateway Platform.
                                        <br />
                                        <br />
                                        Except for our obligation to transmit payments to Merchants under these Terms, or make payments under the Afrigateway Product Liability / Product Guarantee / Financial Loss Insurance, in no event will Afrigateway’s aggregate liability for any claim or dispute arising out of or in connection with these Terms, your interaction with any Members, or your use of or inability to use the Afrigateway Platform or any Content, exceed: (A) to Buyers, the amount you paid as a Buyer during the 12-month period prior to the event giving rise to the liability, (B) to Merchants, the amount paid to you as a Merchant in the 12-month period prior to the event giving rise to the liability, or (C) to anyone else, one hundred U.S. dollars (US$100).
                                        <br />
                                        <br />
                                        These limitations of liability and damages are fundamental elements of the agreement between you and Afrigateway. If applicable law does not allow the limitations of liability set out in these Terms, the above limitations may not apply to you.
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="tos-indemnification" style={{ fontWeight: 600 }}>
                                    <div className="large-large-large-heading">13.	Indemnification</div>
                                    <div>
                                        To the maximum extent permitted by applicable law, you agree to release, defend (at Afrigateway’s option), indemnify, and hold Afrigateway (including other affiliates, and their personnel) harmless from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with: (i) your breach of these Terms (ii) your improper use of the Afrigateway Platform, or (iv) your breach of any laws, regulations or third party rights such as intellectual property or privacy rights.
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="tos-miscellaneous">
                                    <div className="large-large-large-heading">14.	Miscellaneous</div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.1 Interpreting these Terms.</div>
                                        <div>
                                            Except as they may be supplemented by additional terms, conditions, policies, guidelines, standards, and in-product disclosures, these Terms (including those items incorporated by reference) constitute the entire agreement between Afrigateway and you pertaining to your access to or use of the Afrigateway Platform and supersede any and all prior oral or written understandings or agreements between Afrigateway and you. These Terms do not and are not intended to confer any rights or remedies upon anyone other than you and Afrigateway. If any provision of these Terms is held to be invalid or unenforceable, such provision will be struck and will not affect the validity and enforceability of the remaining provisions. Where the word “will” is used in these Terms it connotes an obligation with the same meaning as “shall.”
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.2 No Waiver.</div>
                                        <div>
                                            Afrigateway’s failure to enforce any right or provision in these Terms will not constitute a waiver of such right or provision unless acknowledged and agreed to by us in writing. Except as expressly set forth in these Terms, the exercise by either party of any of its remedies under these Terms will be without prejudice to its other remedies under these Terms or otherwise permitted under law.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.3 Assignment.</div>
                                        <div>
                                            You may not assign, transfer or delegate this agreement or your rights and obligations hereunder without Afrigateway's prior written consent. Afrigateway may without restriction assign, transfer or delegate this agreement and any rights and obligations hereunder, at its sole discretion, with 30 days’ prior notice.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.4 Notice.</div>
                                        <div>
                                            Unless specified otherwise, any notices or other communications to Members permitted or required under this agreement, will be provided electronically and given by Afrigateway via email, Afrigateway Platform notification, messaging service (including SMS), or any other contact method we enable and you provide.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.5 Third-Party Services.</div>
                                        <div>
                                            The Afrigateway Platform may contain links to third-party websites, applications, services or resources (“Third-Party Services”) that are subject to different terms and privacy practices. Afrigateway is not responsible or liable for any aspect of such Third-Party Services.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.6 Afrigateway Platform Content.</div>
                                        <div>
                                            Content made available through the Afrigateway Platform may be protected by copyright, trademark, and/or other laws of Ghana and other countries. You acknowledge that all intellectual property rights for that Content are the exclusive property of Afrigateway and/or its licensors and agree that you will not remove, alter or obscure any copyright, trademark, service mark or other proprietary rights notices. You may not use, copy, adapt, modify, prepare derivative works of, distribute, license, sell, transfer, publicly display, publicly perform, transmit, broadcast or otherwise exploit any Content accessed through the Afrigateway Platform except to the extent you are the legal owner of that Content or as expressly permitted in these Terms. Subject to your compliance with these Terms, Afrigateway grants you a limited, non-exclusive, non-sublicensable, revocable, non-transferable license to (i) access and use the Application on your personal device(s); and (ii) access and view the Content made available on or through the Afrigateway Platform and accessible to you, solely for your personal and commercial use.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.7 Force Majeure.</div>
                                        <div>
                                            Afrigateway shall not be liable for any delay or failure to perform resulting from causes outside its reasonable control, including, but not limited to, acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, epidemics or disease, strikes or shortages of transportation facilities, fuel, energy, labor or materials.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.8 Emails and SMS.</div>
                                        <div>
                                            You will receive administrative communications from us using the email address or other contact information you provide for your Afrigateway account. Enrollment in additional email subscription programs will not affect the frequency of these administrative emails, though you should expect to receive additional emails specific to the program(s) to which you have subscribed. You may also receive promotional emails from us. No fee is charged for these promotional emails, but third-party data rates could apply.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">14.9 Contact Us.</div>
                                        <div>
                                            If you have any questions about these Terms, <a href="mailto:hell0@theafricanexporter.com">please email us</a>.
                                        </div>
                                    </div>
                                </div>

                            </section>
                            : null
                    }

                    {
                        activeLink === "payment-tos" |
                            activeLink === "pos-service" |
                            activeLink === "pos-buyer-terms" |
                            activeLink === "pos-merchant-terms" |
                            activeLink === "pos-afrigateway" |
                            activeLink === "pos-general-terms" |
                            activeLink === "pos-prohibited-activities" |
                            activeLink === "pos-force-majeure" |
                            activeLink === "pos-modification" |
                            activeLink === "pos-liability" |
                            activeLink === "pos-indemnification" |
                            activeLink === "pos-modification-term-termination" |
                            activeLink === "pos-miscellaneous" |
                            activeLink === "pos-contacting-afrigaateway"

                            ?

                            <section id="payment-tos">
                                <div className="about-section-primary-title">Payment Terms of Service</div>
                                <div className="section-content">
                                    <div>
                                        These Payments Terms of Service (“<b>Payments Terms</b>”) are a binding legal agreement between you and Afrigateway that govern the Payment Services (defined below) conducted through or in connection with the Afrigateway Platform. When these Payments Terms mention “<b>Afrigateway</b>,” “<b>we</b>,” “<b>us</b>,” or “<b>our</b>,” it refers to the Afrigateway Limited company you are contracting with for Payment Services.
                                        Afrigateway provides payments services to Members posting requests, providing quotes, supplying physical products and other current and future services provided via the Afrigateway Platform. These payment services may include (if available) the following (collectively, “<b>Payment Services</b>”):
                                        <div className="margin-bottom-10"></div>
                                        <ul>
                                            <li>Collecting payments from Buyers (“<b>Paying</b>”), using the payment option  chosen during the process of confirming their Orders, such as bank account or Escrow account (“<b>Payment Option</b>”);</li>
                                            <li>Effecting payments to Merchants (“<b>Payout</b>”) to a financial instrument associated with their Afrigateway account, such as a bank account (“<b>Payout Method</b>”);</li>
                                            <li>Effecting payments to a third-party service provided designated by a Merchant.</li>
                                        </ul>
                                        <div className="margin-bottom-20"></div>
                                        In order to use the Payment Services, you must be at least 18 years old, must have an Afrigateway account in good standing in accordance with the Afrigateway <a href="legal#tos">Terms of Service</a> (“<b>Terms</b>”), and must keep your payment, personal and company information accurate and complete.
                                    </div>

                                    <div>
                                        <div className="large-large-large-heading" style={{ margin: "20px 0 10px 0" }}><b>Table of Contents</b></div>
                                        <div className="toc" style={{ marginBottom: 30 }}>
                                            <div>
                                                <span><a href="#pos-service">1. Your use of the Payment Services</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-buyer-terms">2.	Buyer Terms</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-merchant-terms">3.	Merchant Terms</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-afrigateway">4.	Appointment of Afrigateway as Limited Payment Collection Agent</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-general-terms">5.	General Terms</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-prohibited-activities">6.	Prohibited Activities</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-force-majeure">7.	Force Majeure</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-modification">8.	Disclaimers</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-liability">9.	Liability</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-indemnification">10.	Indemnification</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-modification-term-termination">11.	Modification, Term, Termination, and other Measures</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-miscellaneous">12.	Miscellaneous</a></span>
                                            </div>
                                            <div>
                                                <span><a href="#pos-contacting-afrigaateway">13.	Contacting Afrigateway</a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="pos-service">
                                    <div className="large-large-large-heading">1.	Your use of the Payment Services</div>
                                    <div>
                                        <div className="large-large-large-large-heading">1.1	Afrigateway Payment Services</div>
                                        <div>
                                            By using the Payments Services, you agree to comply with these Payments Terms. Afrigateway Payments may temporarily limit or suspend your access to or use of the Payment Services, or its features, to carry out maintenance measures that ensure the proper functioning of the Payment Services. Afrigateway Payments may improve, enhance and modify the Payment Services and introduce new Payment Services from time to time. Afrigateway will provide notice to Members of any changes to the Payment Services, unless such changes do not materially increase the Members’ contractual obligations or decrease the Members’ rights under these Payments Terms.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">1.2 Third Party Services.</div>
                                        <div>
                                            The Payment Services may contain links to third-party websites or resources (“Third-Party Services”). Such Third-Party Services are subject to different terms of service and privacy policies, and Members should review them. Afrigateway is not responsible or liable for the use of such Third-Party Services. Links to any Third-Party Services are not an endorsement by Afrigateway Payments of those Third-Party Services.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">1.3 Your Afrigateway Account.</div>
                                        <div>
                                            Afrigateway may enable features that allow you to authorize other Members or third parties to take certain actions that affect your Afrigateway account. You may authorize a third party to use your Afrigateway account if the feature is enabled for your Afrigateway account. You acknowledge and agree that anyone you authorize to use your Afrigateway account may use the Payment Services on your behalf and that you will be responsible for any payments made by such person.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">1.4 Verification.</div>
                                        <div>
                                            You authorize Afrigateway, directly or through third parties, to make any inquiries we consider necessary to verify your identity and information you provide. This may include (i) screening you against third-party databases or other sources, (ii) requesting reports from service providers, (iii) asking you to provide a form of government identification (e.g., driver’s license or passport), your date of birth, your address, and other information; or (iv) requiring you to take steps to confirm ownership of your email address, Payment Option(s) or Payout Option(s). Afrigateway reserves the right to terminate, suspend, or limit access to the Payment Services in the event we are unable to obtain or verify any of this information.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">1.5 Additional Terms.</div>
                                        <div>
                                            Your access to or use of certain Payment Services may be subject to, or require you to accept, additional terms and conditions. If there is a conflict between these Payments Terms and terms and conditions applicable to a specific Payment Service, the latter terms and conditions will take precedence with respect to your use of or access to that Payment Service, unless specified otherwise.
                                        </div>
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="pos-buyer-terms">
                                    <div className="large-large-large-heading">2.	Buyer Terms</div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.1 Payment Options.</div>
                                        <div>Afrigateway accepts any of the following Payment Options:</div>

                                        <div>
                                            <div className="large-large-large-large-large-heading">2.1.1 Documentary Collection and Escrow.</div>
                                            <div>
                                                A Documentary collection is a process in which a Merchant instructs their bank to forward documents related to the export of goods to a Buyer's bank with a request to present these documents to the Buyer for payment, indicating when and on what conditions these documents can be released to the buyer.
                                                <br />
                                                <div className="margin-bottom-10"></div>
                                                An Escrow is a contractual arrangement in which a third party (the Escrow agent) receives and disburses money for the primary transacting parties, with the disbursement dependent on conditions agreed to by the transacting parties.
                                                <div className="margin-bottom-10"></div>
                                                With this Payment Option, ninety percent (90%) of the Total amount (including Freight and Insurance) will be paid through bank transfer, with the other ten percent (10%) paid via Escrow. The Escrow deposit will constitute Proof of Payment, before the Merchant(s) will be notified to commence fulfilment of the order. Since Afrigateway is the Payment Collection agent, Afrigateway’s bank will act on its behalf regarding this Payment Option.
                                            </div>
                                        </div>

                                        <div>
                                            <div className="large-large-large-large-large-heading">2.1.2 Irrevocable Letters of Credit (LC) with Payment at Sight. </div>
                                            <div>
                                                A Letter of Credit, also known as a Documentary credit or bankers’ commercial credit is a payment mechanism used to provide an economic guarantee from a creditworthy bank to an exporter of goods. The Buyer’s bank is obligated to pay after inspecting the shipping documents from the Merchant. The Letter of Credit will cover the Total amount payable (including Freight and Insurance). The presentation of the Letter of Credit will constitute Proof of Payment, before the Merchant(s) will be notified to commence fulfilment of the order. Afrigateway’s bank will act on its behalf regarding this Payment Option.
                                            </div>
                                        </div>

                                        <div>
                                            <div className="large-large-large-large-large-heading">2.1.3 Bank Transfer.</div>
                                            <div>
                                                Bank transfer is a method of electronic funds transfer from one person or entity to another. A Bank transfer can be made from one bank account to another bank account.
                                                With this Payment Option, the Buyer is required to pay an initial deposit of ten percent (10%) of the Total amount (including Freight and Insurance), with the remaining ninety percent (90%) paid after submitting scanned copies of shipping documents to the Buyer. The initial deposit will constitute Proof of Payment, before the Merchant(s) will be notified to commence fulfilment of the order. Afrigateway’s bank will act on its behalf regarding this Payment Option.
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.2 Choosing a Payment Option. </div>
                                        <div>
                                            When you choose a Payment Option when confirming your order, you will be asked to provide information such as personal name, company name, address, contact details and financial instrument information either to Afrigateway, banks or third-party payment processor(s). You authorize Afrigateway and its payment service providers to collect and store your Payment Option information.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.3 Payment Authorization. </div>
                                        <div>
                                            You allow Afrigateway to charge your Payment Option (including charging more than one payment option), either directly or indirectly, for all fees due (including any applicable taxes) in connection with your Afrigateway account in accordance with the Terms.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.4 Automatic Update of Payment Option. </div>
                                        <div>
                                            If your Payment Option’s account information changes (e.g., account number, routing number, expiration date) as a result of re-issuance or otherwise, we may acquire that information from our financial services partners or your bank and automatically update your Payment Option on file.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.5 Timing of Payment. </div>
                                        <div>
                                            Irrespective of the Payment Option, you are liable to pay for the Total amount based on the quotation(s) from the Merchant(s) you ordered from:
                                        </div>

                                        <div>
                                            <div className="large-large-large-large-large-heading">2.5.1 Documentary Collections and Escrow. </div>
                                            <div>
                                                Payment will have to be made once shipping documents have been submitted to your bank and the Escrow service provider.
                                            </div>
                                        </div>

                                        <div>
                                            <div className="large-large-large-large-large-heading">2.5.2 Irrevocable Letters of Credit with Payment at Sight. </div>
                                            <div>
                                                Payment will have to be made once shipping documents have been submitted to your bank.
                                            </div>
                                        </div>

                                        <div>
                                            <div className="large-large-large-large-large-heading">2.5.3 Bank Transfer.</div>
                                            <div>
                                                After initial deposit, remaining payment will have to be made once shipping documents have been submitted to your bank.
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.6 Currency. </div>
                                        <div>
                                            All transactions on the Afrigateway Platform will be in United States Dollar. This may attract certain fees from your bank if the United States Dollar is not your country’s currency. Afrigateway is not responsible for any such fees and disclaims all liability in this regard. Please contact your bank if you have any questions about these fees or the applicable exchange rate.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.7 Pre-payment.</div>
                                        <div>
                                            Afrigateway pays Merchant(s) on behalf of the Buyer for every transaction. The total amount (including Freight and Insurance) is paid to the Merchant(s) when the physical goods are delivered at the Departure Port. The Buyer is not charged any interest or fee for this prepayment arrangement.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.8 Payment Restrictions. </div>
                                        <div>
                                            Afrigateway reserves the right to decline or limit payments that we believe (i) may violate Afrigateway’s risk management policies or procedures, (ii) may violate these Payments Terms or the Terms, (iii) are unauthorized, fraudulent or illegal; or (iv) expose you, Afrigateway or others to risks unacceptable to Afrigateway.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.9 Payment Service Providers. </div>
                                        <div>
                                            Payment Options may involve the use of banks or third-party payment service providers. These payment service providers may charge you additional fees when processing payments in connection with the Payment Services, and Afrigateway is not responsible for any such fees and disclaims all liability in this regard. Your Payment Method may also be subject to additional terms of use. Please review them before using your Payment Method.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.10 Your Payment Option, Your Responsibility. </div>
                                        <div>
                                            Afrigateway is not responsible for any loss suffered by you as a result of incorrect Payment Method information provided by you.
                                        </div>
                                    </div>

                                </div>


                                <div className="section-sub-content-container" id="pos-merchant-terms">
                                    <div className="large-large-large-heading">3.	Merchant Terms</div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.1 Payment Collection. </div>
                                        <div>
                                            Afrigateway generally collects the Total amount (including Freight and Insurance) for every transaction.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.2 Valid Payout Method. </div>
                                        <div>
                                            In order to receive a Payout you must have a valid Payout Method linked to your Afrigateway account. The only acceptable and valid Payment Method for a Merchant is a company or corporate bank account. The bank account must be the same as the company name that is linked to the Afrigateway account. Regarding your Payout Method, you will be asked to provide information such as personal name, name on the account, account type, routing number, account number, email address to Afrigateway. You authorize Afrigateway to collect and store your Payout Method information. Afrigateway may also share your information with governmental authorities as required by applicable law.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.3 Timing of Payout. </div>
                                        <div>
                                            Afrigateway will generally initiate Payouts to your selected bank account via a cheque or direct transfer, once you have delivered the physical products ordered by the Buyer to the Departure Port. The physical goods must meet the specifications, quantity and any agreed on condition according to the Buyer’s order before Afrigateway will initiate the Payout. This Payout will be made by Afrigateway with or without full payment of the Total amount by the Buyer.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.4 Payout. </div>
                                        <div>
                                            Your Payout for a transaction will be the Total amount less applicable fees like Afrigateway service fees.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.5 Payout Restrictions.</div>
                                        <div>
                                            Afrigateway may temporarily place a hold, suspend, or cancel any Payout for purposes of preventing unlawful activity or fraud, risk assessment, security, or completing an investigation; or if we are unable to verify your identity, or to obtain or verify requested information. Furthermore, Afrigateway may temporarily place a hold on, suspend, or delay initiating or processing any Payout due to you under the Terms or modifications arising from a Force Majeure Event.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.6 Currency Conversion.</div>
                                        <div>
                                            Afrigateway will remit your Payouts in your country’s local currency at the prevailing foreign exchange rates stated by the country’s Central Bank.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.7 Your Payout Method, Your Responsibility.</div>
                                        <div>
                                            Afrigateway is not responsible for any loss suffered by you as a result of incorrect Payout Method information provided by you.
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="pos-afrigateway">
                                    <div className="large-large-large-heading">4.	Appointment of Afrigateway as Limited Payment Collection Agent</div>

                                    <div style={{ margin: "10px 0" }}>
                                        4.1 Each Merchant hereby appoints Afrigateway as the Merchant’s payment collection agent solely for the limited purpose of accepting and paying out funds from Buyers purchasing physical products from Merchant, on the Merchant’s behalf.
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        4.2 Each Merchant agrees that payment made by a Buyer through Afrigateway, shall be considered the same as a payment made directly to the Merchant, and the Merchant will supply the physical products ordered by the Buyer in the agreed-upon manner as if the Merchant has received the payment directly from the Buyer. Afrigateway guarantees payments to Merchant(s) only for such amounts that have been agreed upon with the Buyer, and for which the Buyer has provided Proof of Payment as evidence to confirm the order. In accepting appointment as the limited payment collection agent of the Merchant, Afrigateway assumes no liability for any acts or omissions of the Merchant.
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        4.3 Each Buyer acknowledges and agrees that, notwithstanding the fact that Afrigateway is not a party to the agreement between you and the Merchant(s), Afrigateway acts as each Merchant’s payment collection agent for the limited purpose of accepting payments from you on behalf of the Merchant(s). Upon a Buyer’s payment of the funds to Afrigateway, the Buyer’s payment obligation to the Merchant(s) for the agreed upon amount is extinguished, and Afrigateway is responsible for remitting the funds successfully received by Afrigateway to the Merchant(s) in the manner described in these Payments Terms. In the event that Afrigateway does not remit any such amounts, the Merchant(s) will have recourse only against Afrigateway and not the Buyer directly.
                                    </div>
                                </div>



                                <div className="section-sub-content-container" id="pos-general-terms">
                                    <div className="large-large-large-heading">5.	General Terms</div>
                                    <div>
                                        <div className="large-large-large-large-heading">5.1 Fees</div>
                                        <div>
                                            Every Payment option chosen by a Buyer attracts a corresponding fee by third party service providers such as Banks and Escrow companies. The Buyer will have to bear all the fees associated with the Payment option, especially with regards to the Escrow payment arrangement.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">5.2 Payment Authorizations. </div>
                                        <div>
                                            You authorize Afrigateway to collect from you amounts due pursuant to these Payment Terms and/or the Terms  by either (i) charging the Payment Method associated with the relevant booking, or any other Payment Method on file that you authorize in your Afrigateway account or (ii) by withholding the amount from your future Payout. Specifically, you authorize Afrigateway to collect from you:
                                        </div>
                                        <ul>
                                            <li>Any amount due to Afrigateway (e.g., as a result of your transactions or other actions as a Buyer, Merchant or user of the Afrigateway Platform), including reimbursement for expenses prepaid by Afrigateway on your behalf. Any funds collected by Afrigateway will set off the amount owed by you to Afrigateway and extinguish your obligation to Afrigateway.</li>
                                            <li>Any amount due to a Merchant from a Buyer which Afrigateway collects as the Merchant’s payment collection agent as further set out in Section 4 above.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">5.3 Payment Processing Errors.</div>
                                        <div style={{ margin: "10px 0" }}>
                                            5.3.1 Afrigateway will take the necessary steps to rectify any payment processing errors that we become aware of. These steps may include crediting or debiting (as appropriate) the original Payout Method or Payment Method used or selected by you, so that you end up receiving or paying the correct amount. This may be performed by Afrigateway or a third party such as your financial institution. We may also take steps to recover funds sent to you in error (including but not limited to an event of duplicate payments made to you due to a processing error), by reducing, setting off and/or debiting the amount of such funds from any future Payouts owed to you.
                                        </div>
                                        <div style={{ margin: "10px 0" }}>
                                            5.3.2 To the extent you receive any funds in error, you agree to immediately return such funds to Afrigateway.
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="pos-prohibited-activities">
                                    <div className="large-large-large-heading">6.	Prohibited Activities</div>

                                    <div style={{ margin: "10px 0" }}>
                                        6.1 You are solely responsible for compliance with any and all laws, rules, regulations, and tax obligations that may apply to your use of the Payment Services. In connection with your use of the Payment Services, you may not and you agree that you will not and will not assist or enable others to:
                                        <ul style={{ marginTop: "10px" }}>
                                            <li>breach or circumvent any applicable laws or regulations;</li>
                                            <li>breach or circumvent any agreements with third parties, third-party rights, or the Terms.</li>
                                            <li>use the Payment Services for other purposes that are not expressly permitted by these Payments Terms;</li>
                                            <li>register or use any Payment Method or Payout Method with your Afrigateway account that is not yours or you do not have authorization to use;</li>
                                            <li>avoid, bypass, remove, deactivate, impair, descramble, or otherwise circumvent any technological measure implemented by Afrigateway or any other third party to protect the Payment Services;</li>
                                            <li>take any action that damages or adversely affects, or could damage or adversely affect, the performance or proper functioning of the Payment Services;</li>
                                            <li>attempt to decipher, decompile, disassemble, or reverse engineer any of the software used to provide the Payment Services; or</li>
                                            <li>violate or infringe anyone else’s rights or otherwise cause harm to anyone.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="pos-force-majeure">
                                    <div className="large-large-large-heading">7.	Force Majeure</div>
                                    <div>
                                        Afrigateway shall not be liable for any delay or failure to fulfill any obligation under these Payments Terms resulting from causes outside the reasonable control of Afrigateway including, but not limited to, acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, epidemics or disease, strikes or shortages of transportation facilities, fuel, energy, labor or materials (“Force Majeure Event”).
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="pos-modification" style={{ fontWeight: "bold" }}>
                                    <div className="large-large-large-heading">8. Disclaimers</div>

                                    <div style={{ margin: "10px 0" }}>
                                        8.1 If you choose to use the Payment Services, you do so voluntarily and at your sole risk. To the maximum extent permitted by law, the Payment Services are provided “as is”, without warranty of any kind, either express or implied.
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        8.2 Notwithstanding Afrigateway’s appointment as the limited payment collection agent of Merchants pursuant to Section 4, Afrigateway explicitly disclaims all liability for any act or omission of any Member or other third party. Afrigateway does not have any duties or obligations as agent for each Merchant except to the extent expressly set forth in these Payments Terms, and any additional duties or obligations as may be implied by law are, to the maximum extent permitted by applicable law, expressly excluded.
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        8.3 If we choose to conduct identity verification on any Member, to the extent permitted by applicable law, we disclaim warranties of any kind, either express or implied, that such checks will identify prior misconduct by a Member or guarantee that a Member will not engage in misconduct in the future.
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        8.4 The foregoing disclaimers apply to the maximum extent permitted by law. You may have other statutory rights or warranties which cannot lawfully be excluded. However, the duration of any statutorily required warranties shall be limited to the maximum extent (if any) permitted by law.
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="pos-liability" style={{ fontWeight: "bold" }}>
                                    <div className="large-large-large-heading">9. Liability</div>

                                    <div style={{ margin: "10px 0" }}>
                                        9.1 You acknowledge and agree that, to the maximum extent permitted by law, the entire risk arising out of your access to and use of the Payment Services remains with you. If you permit or authorize another person to use your Afrigateway account in any way, you are responsible for the actions taken by that person. Neither Afrigateway nor any other party involved in creating, producing, or delivering the Payment Services will be liable for any incidental, special, exemplary, or consequential damages, including lost profits, loss of data or loss of goodwill, service interruption, computer damage or system failure or the cost of substitute products or services, or for any damages for personal or bodily injury or emotional distress arising out of or in connection with (i) these Payments Terms, (ii) from the use of or inability to use the Payment Services, or (iii) from any communications, interactions, or meetings with other Members or other persons with whom you communicate, interact, or transact with as a result of your use of the Payment Services, whether based on warranty, contract, tort (including negligence), product liability, or any other legal theory, and whether or not Afrigateway has been informed of the possibility of such damage, even if a limited remedy set forth herein is found to have failed of its essential purpose. In no event will Afrigateway’s aggregate liability arising out of or in connection with these Payments Terms and your use of the Payment Services including, but not limited to, from your use of or inability to use the Payment Services, exceed (i) the amounts you have paid or owe for transacting via the Afrigateway Platform as a Buyer in the twelve (12) month period prior to the event giving rise to the liability, or if you are a Merchant, the amounts paid by Afrigateway to you in the twelve (12) month period prior to the event giving rise to the liability, or (ii) one hundred U.S. dollars (US$100), if no such payments have been made, as applicable. The limitations of damages set forth above are fundamental elements of the basis of the bargain between Afrigateway and you. Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you.
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="pos-indemnification">
                                    <div className="large-large-large-heading">10. Indemnification</div>
                                    <div>
                                        To the maximum extent permitted by applicable law, you agree to release, defend (at Afrigateway’s option), indemnify, and hold Afrigateway and its affiliates and subsidiaries, and their officers, directors, employees, and agents, harmless from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with (i) your breach of these Payments Terms; (ii) your improper use of the Payment Services; (iii) your failure, or our failure at your direction, to accurately report, collect or remit taxes; or (iv) your breach of any laws, regulations, or third-party rights.
                                    </div>
                                </div>


                                <div className="section-sub-content-container" id="pos-modification-term-termination">
                                    <div className="large-large-large-heading">11. Modification, Term, Termination, and other Measures</div>
                                    <div>
                                        <div className="large-large-large-large-heading">11.1 Modification. </div>
                                        <div>
                                            Except as otherwise required by applicable law, Afrigateway may modify these Payments Terms at any time. If we make material changes to these Payment Terms, we will post the revised Payment Terms on the Afrigateway Platform and update the “Last Updated” date at the top of these Payment Terms. If you are affected by the modification, we will also provide you with notice of the modifications at least thirty (30) days before the date they become effective. If you do not terminate your agreement before the date the revised Payment Terms become effective, your continued use of the Payment Services will constitute acceptance of any changes to the revised Payments Terms.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">11.2 Term. </div>
                                        <div>
                                            This agreement between you and Afrigateway reflected by these Payment Terms is effective when you create an Afrigateway account or use the Payment Services and remains in effect until either you or we terminate this agreement in accordance with Section 11.3.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">11.3 Termination. </div>
                                        <div>
                                            You may terminate this agreement at any time by sending us an email or by deleting your Afrigateway account. Terminating this agreement will also serve as notice to cancel your Afrigateway account pursuant to the Terms. Without limiting our rights specified below, Afrigateway may terminate this agreement for convenience at any time by giving you thirty (30) days' notice via email to your registered email address. Afrigateway may also terminate this agreement immediately without notice if (i) you have materially breached your obligations under this agreement; (ii) you have provided inaccurate, fraudulent, outdated, or incomplete information; (iii) you have violated applicable laws, regulations, or third-party rights; or (iv) Afrigateway believes in good faith that such action is reasonably necessary to protect other Members, Afrigateway, or third parties.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">11.4 Suspension and Other Measures.</div>
                                        <div>
                                            Afrigateway may limit or temporarily or permanently suspend your use of or access to the Payment Services (i) to comply with applicable law, or the order or request of a court, law enforcement, or other administrative agency or governmental body, (ii) if you have breached these Payments Terms, the Terms, applicable laws, regulations or third-party rights, (iii) if you have provided inaccurate, fraudulent, outdated, or incomplete information regarding a Payment Method or Payout Method, (iv) for any amounts you owe under these Payments Term that are overdue or in default, or (v) if Afrigateway believes in good faith that such action is reasonably necessary to protect the personal safety or property of Afrigateway, its Members or third parties, or to prevent fraud or other illegal activity.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">11.5 Appeal. </div>
                                        <div>
                                            If Afrigateway takes any of the measures described in Section 11.3 and 11.4 you may appeal such a decision by contacting <a href="mailto:hello@theafricanexporter.com">customer service</a>.
                                        </div>
                                    </div>


                                    <div>
                                        <div className="large-large-large-large-heading">11.6 Effect of Termination. </div>
                                        <div>
                                            If you cancel your Afrigateway account as a Merchant or Afrigateway takes any of the measures described above, any confirmed orders that are being fulfilled will be abrogated, and any prepayment made by Afrigateway will be recouped from the Merchant. If you cancel your Afrigateway account as a Buyer, Afrigateway will cancel any confirmed orders. If your access to or use of the Payment Services has been suspended or limited or this agreement has been terminated by us, you may not register a new Afrigateway account or attempt to access and use the Payment Services through an Afrigateway account of another Member.
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="pos-miscellaneous">
                                    <div className="large-large-large-heading">12. Miscellaneous</div>
                                    <div>
                                        <div className="large-large-large-large-heading">12.1 Interpreting these Payments Terms. </div>
                                        <div>
                                            These Payments Terms constitute the entire agreement between Afrigateway and you regarding the subject matter hereof, and supersede any and all prior oral or written understandings or agreements between Afrigateway and you regarding the Payment Services. If any provision of these Payments Terms is held to be invalid or unenforceable, such provision will be struck and will not affect the validity and enforceability of the remaining provisions.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">12.2 No Waiver.</div>
                                        <div>
                                            Afrigateway’s failure to enforce any right or provision in these Payments Terms will not constitute a waiver of such right or provision unless acknowledged and agreed to by us in writing. Except as expressly set forth in these Payments Terms, the exercise by either party of any of its remedies under these Payments Terms will be without prejudice to its other remedies under these Payments Terms or otherwise permitted under law.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">12.3 Assignment. </div>
                                        <div>
                                            You may not assign, transfer, or delegate this agreement or your rights and obligations hereunder without Afrigateway’s prior written consent. Afrigateway may without restriction assign, transfer, or delegate this agreement and any rights and obligations, at its sole discretion, with thirty (30) days’ prior notice.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">12.4 Notices.</div>
                                        <div>
                                            Unless specified otherwise, any notices or other communications permitted or required under this agreement, will be in writing and given by Afrigateway via email or Afrigateway Platform notification, and depending on your notification setting, messaging service (including SMS). The date of receipt will be deemed the date on which Afrigateway transmits the notice.
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container" id="pos-contacting-afrigaateway">
                                    <div className="large-large-large-heading">13. Contacting Afrigateway.</div>
                                    <div>
                                        You may contact Afrigateway regarding the Payment Services using the information below:
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        <div><span></span><span style={{ fontWeight: 500 }}>Afrigateway Limited</span></div>
                                        <div><span></span><span style={{ fontWeight: 500 }}>Premier Point Building</span></div>
                                        <div><span></span><span style={{ fontWeight: 500 }}>Ndabaningi Sithole Road</span></div>
                                        <div><span></span><span style={{ fontWeight: 500 }}>North – Labone</span></div>
                                        <div><span></span><span style={{ fontWeight: 500 }}>Ghana</span></div>
                                        <div><span></span><span style={{ fontWeight: 500 }}><a style={{ textDecoration: "none" }} href="mailto:hello@theafricanexporter.com">hello@theafricanexporter.com</a> </span></div>
                                    </div>
                                </div>

                            </section>
                            :
                            null
                    }


                    {
                        activeLink === "privacy-policy" &&
                        <section id="privacy-policy">
                            <div className="about-section-primary-title">Privacy Policy</div>
                            <div className="section-content">
                                <div>
                                    This Privacy Policy describes how Afrigateway Limited and its affiliates (“<b>we</b>,” “<b>us</b>,” or “<b>Afrigateway</b>”), process personal information in relation to your use of the Afrigateway Platform.
                                </div>

                                <div className="section-sub-content-container">
                                    <div className="large-large-large-heading">1. Definitions</div>
                                    <div>Undefined terms in this Privacy Policy have the same definition as in our <a href="#tos">Terms of Service</a> (“<b>Terms</b>”).</div>
                                </div>

                                <div className="section-sub-content-container">
                                    <div className="large-large-large-heading">2. PERSONAL INFORMATION WE COLLECT</div>
                                    <div>
                                        <div className="large-large-large-large-heading">2.1 Information needed to use the Afrigateway Platform.</div>
                                        <div>
                                            We collect personal information about you when you use the Afrigateway Platform. Without it, we may not be able to provide all services requested. This information includes:
                                        </div>
                                        <div>
                                            <ul>
                                                <li><span className="bold">Contact Information, Account, Profile Information</span>. <span>Such as your first name, last name, phone number, email address, company name and address, some of which will depend on the features you use.</span></li>
                                                <li><span className="bold">Payment Information</span>. <span>Such as bank account or payment account information.</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">2.2 Information Automatically Collected by Using the Afrigateway Platform and our Payment Services.</div>
                                        <div>
                                            When you use the Afrigateway Platform and Payment Services, we automatically collect personal information. This information may include:                                        </div>
                                        <div>
                                            <ul>
                                                <li><span className="bold">Geo-location Information</span>. <span>Such as precise or approximate location determined from your IP address or mobile device’s GPS depending on your device settings.</span></li>
                                                <li><span className="bold">Usage Information</span>. <span>Such as the pages you view, requests for Quotations, orders you have made, and other actions on the Afrigateway Platform.</span></li>
                                                <li><span className="bold">Log Data and Device Information</span>. <span>Such as details about how you’ve used the Afrigateway Platform, IP address, access dates and times, hardware and software information, device information, device event information, unique identifiers, crash data, and cookie data.</span></li>
                                                <li><span className="bold">Cookies and Similar Technologies as described in our <a href="legal#cookie-policy">Cookie Policy</a>.</span></li>
                                                <li><span className="bold">Payment Transaction Information</span><span>Such as payment instrument used, date and time, payment amount, payment instrument expiration date and billing postcode, your address, and other related transaction details.</span> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div className="section-sub-content-container">
                                    <div className="large-large-large-heading">3. HOW WE USE INFORMATION WE COLLECT</div>
                                    <div>
                                        <div className="large-large-large-large-heading">3.1 Provide, Improve, and Develop the Afrigateway Platform.</div>
                                        <div>
                                            Such as to:
                                        </div>
                                        <div>
                                            <ul>
                                                <li>enable you to access the Afrigateway Platform and make and receive payments</li>
                                                <li>enable you to transact with other Members</li>
                                                <li>perform analytics, debug and conduct research</li>
                                                <li>provide customer service, training</li>
                                                <li>send you messages, updates, security alerts, and account notifications</li>
                                                <li>personalize and customize your experience based on your interactions with the Afrigateway Platform, your request and order history, your profile information and preferences, and other content you submit</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.2 Create and Maintain a Trusted and Safer Environment.</div>
                                        <div>Including:</div>
                                        <div>
                                            <ul>
                                                <li>detect and prevent fraud, spam, abuse, security incidents, and other harmful activity</li>
                                                <li>conduct security investigations and risk assessments</li>
                                                <li>verify or authenticate information provided by you</li>
                                                <li>conduct checks against databases and other information sources, including background or police checks</li>
                                                <li>enforce our agreements with third parties</li>
                                                <li>comply with law, respond to legal requests, and protect our rights</li>
                                                <li>enforce our <a href="#tos">Terms</a> and other policies and</li>
                                                <li>in connection with the activities above, we may conduct profiling based on your interactions with the Afrigateway Platform, your profile information and other content you submit to Afrigateway, and information obtained from third parties.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.3 Provide, Personalize, Measure, and Improve our Advertising and Marketing.</div>
                                        <div>For Example to:</div>
                                        <div>
                                            <ul>
                                                <li>send you promotional messages, marketing, advertising, and other information based on your preferences</li>
                                                <li>personalize, measure, and improve our advertising</li>
                                                <li>administer referral programs, rewards, surveys, contests, or other promotional activities or events sponsored or managed by Afrigateway or its third-party partners,</li>
                                                <li>analyze characteristics and preferences to send you promotional messages, marketing, advertising, and other information that we think might be of interest to you, and</li>
                                                <li>invite you to events and relevant opportunities.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">3.4 Provide Payment services.</div>
                                        <div>Personal information is used to enable, or authorize third parties to use, Payment Services such as to:</div>
                                        <div>
                                            <ul>
                                                <li>detect and prevent money laundering, fraud, abuse, and security incidents,</li>
                                                <li>conduct security investigations and risk assessments,</li>
                                                <li>comply with legal obligations (such as anti-money laundering regulations),</li>
                                                <li>enforce the <a href="#payment-tos">Payment Terms</a> and other payment policies,</li>
                                                <li>with your consent, send you messages and other information that may be of interest to you based on your preferences, and</li>
                                                <li>provide and improve Payment Services.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container">
                                    <div className="large-large-large-heading">4. SHARING & DISCLOSURE</div>
                                    <div>
                                        <div className="large-large-large-large-heading">4.1 Sharing With Your Consent or at Your Direction.</div>
                                        <div>
                                            Where you provide consent, we share your information as described at the time of consent, such as when authorizing a third-party application or website to access your Afrigateway account.
                                            <br />
                                            <br />
                                            Where permissible under applicable law, we may use certain information about you such as your email address, de-identify it, and share it with social media platforms to generate leads, drive traffic to Afrigateway, or otherwise promote our products and services.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">4.2 Sharing Between Members.</div>
                                        <div>To help facilitate transactions between Members, we may need to share certain information such as:</div>
                                        <div>
                                            <ul>
                                                <li>When a request for quotations is made, and there are corresponding offers or quotes. Also, when an order is confirmed by both parties.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">4.3 Complying with Law, Responding to Legal Requests, Preventing Abuse and Protecting our Rights.</div>
                                        <div>
                                            We may disclose your information to courts, law enforcement, governmental or public authorities, tax authorities, or authorized third parties, if and to the extent we are required or permitted to do so by law or where disclosure is reasonably necessary to: (i) comply with our legal obligations, (ii) comply with a valid legal request (such as a subpoena or court order) or to respond to claims asserted against Afrigateway, (iii) respond to a valid legal request relating to a criminal investigation to address alleged or suspected illegal activity, or to respond to or address any other activity that may expose us, you, or any other of our users to legal or regulatory liability, (iv) enforce and administer our agreements with Members, including our <a href="#tos">Terms</a> or (v) protect the rights, property or personal safety of Afrigateway, its employees, its Members, or members of the public.
                                            <br />
                                            <br />
                                            Where appropriate, we may notify Members about legal requests unless: (i) providing notice is prohibited by the legal process itself, by court order we receive, or by applicable law, or (ii) we believe that providing notice would be futile, ineffective, or create or increase a risk of fraud upon or harm to Afrigateway, our Members, or expose Afrigateway to a claim of obstruction of justice.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">4.4 Service Providers.</div>
                                        <div>
                                            We share personal information with affiliated and unaffiliated service providers to help us run our business and for their compliance purposes, including service providers that help us: (i) verify your identity or authenticate your identification documents, (ii) check information against public databases, (iii) conduct background or police checks, fraud prevention and risk assessment, (iv) perform product development, maintenance and debugging, (v) provide customer service or payments services, or (vi) process, handle or assess insurance claims or similar claims. These providers are contractually bound to protect your personal information and have access to your personal information to perform these tasks.
                                        </div>
                                    </div>

                                    <div>
                                        <div className="large-large-large-large-heading">4.5 Business Transfers.</div>
                                        <div>
                                            If Afrigateway undertakes or is involved in any merger, acquisition, reorganization, sale of assets, bankruptcy, or insolvency event, then we may sell, transfer, or share some or all of our assets, including your information in connection with such transaction or in contemplation of such transaction (e.g., due diligence). In this event, we will notify you before your personal information is transferred and becomes subject to a different privacy policy.
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container">
                                    <div className="large-large-large-heading">5. OTHER IMPORTANT INFORMATION</div>
                                    <div>
                                        <div className="large-large-large-large-heading">5.1 Information needed to use the Afrigateway Platform.</div>
                                        <div>
                                            Parts of Afrigateway may link to third-party services, not owned or controlled by Afrigateway. Afrigateway does not own or control these third parties and when you interact with them you are providing your information to them.
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container">
                                    <div className="large-large-large-heading">6. YOUR RIGHTS</div>
                                    <div>You can exercise any of the rights described in this section consistent with applicable law. We may ask you to verify your identity and request before taking further action on your request.</div>
                                    <div>
                                        <div className="large-large-large-large-heading">6.1 Managing Your Information.</div>
                                        <div>
                                            You can access and update some of your personal information through your Account settings. You are responsible for keeping your personal information up to date.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">6.2 Data Access and Portability.</div>
                                        <div>
                                            In some jurisdictions, applicable law may entitle you to request certain copies of your personal information or information about how we handle your personal information, request copies of personal information that you have provided to us in a structured, commonly used, and machine-readable format, and/or request that we transmit this information to another service provider (where technically feasible).
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-large-large-large-heading">6.3 Data Erasure.</div>
                                        <div>In some jurisdictions, you can request that your personal information be deleted. Please note that if you request deletion of your personal information, or if your account is suspended, terminated, or voluntarily closed:</div>
                                        <div>
                                            <ul>
                                                <li>We may retain your personal information as necessary for our legitimate business interests, such as prevention of money laundering, fraud detection and prevention, and enhancing safety. For example, if we suspend an Afrigateway Account for fraud or safety reasons, we may retain information from that Afrigateway Account to prevent that Member from opening a new Afrigateway Account in the future.</li>
                                                <li>We may retain and use your personal information to the extent necessary to comply with our legal obligations. For example, we may keep information for tax, legal reporting, and auditing obligations.</li>
                                                <li>Because we take measures to protect data from accidental or malicious loss and destruction, residual copies of your personal information may not be removed from our backup systems for a limited period of time.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="section-sub-content-container">
                                    <div className="large-large-large-heading">7. SECURITY</div>
                                    <div>
                                        While no organization can guarantee perfect security, we are continuously implementing and updating administrative and technical security measures to help protect your information against unauthorized access, loss, destruction, or alteration.
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-heading">8. CHANGES TO THIS PRIVACY POLICY</div>
                                    <div>
                                        We reserve the right to modify this Privacy Policy at any time in accordance with applicable law. If we do so, we will post the revised Privacy Policy and update the “Last Updated” date at the top. In case of material changes, we will also provide you with notice of the modification by email at least thirty (30) days before the effective date. If you disagree with the revised Privacy Policy, you can cancel your Account. If you do not cancel your Account before the date the revised Privacy Policy becomes effective, your continued access to or use of the Afrigateway Platform will be subject to the revised Privacy Policy.                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-heading">9. CONTACT INFORMATION</div>
                                    <div>
                                        For questions or complaints about this Privacy Policy or Afrigateway’s handling of personal information, please contact us at:
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <ul style={{ margin: 0 }}>
                                            <li style={{ fontWeight: 500, listStyleType: "none" }}>Afrigateway Limited</li>
                                            <li style={{ fontWeight: 500, listStyleType: "none" }}>Premier Point Building</li>
                                            <li style={{ fontWeight: 500, listStyleType: "none" }}>Ndabaningi Sithole Road</li>
                                            <li style={{ fontWeight: 500, listStyleType: "none" }}>North – Labone</li>
                                            <li style={{ fontWeight: 500, listStyleType: "none" }}>Ghana</li>
                                            <li style={{ fontWeight: 500, listStyleType: "none" }}>hello@theafricanexporter.com</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </section>
                    }

                    {
                        activeLink === "cookie-policy" &&
                        <section id="cookie-policy">
                            <div className="about-section-primary-title">Afrigateway Cookie Policy</div>
                            <div className="section-content">
                                <div>
                                    Afrigateway uses cookies, mobile identifiers, tracking URLs, log data and similar technologies to help provide, protect, and improve the Afrigateway Platform. This Cookie Policy (“<b>Policy</b>”) supplements the <a href="#privacy-policy">Afrigateway Privacy Policy</a> and explains how and why we use these technologies and the choices you have.
                                </div>

                                <div>
                                    <div className="large-large-large-heading-special">Why Afrigateway Uses These Technologies</div>
                                    <div>
                                        We use these technologies for a number of purposes, such as:
                                        <ul>
                                            <li>to enable you to use and access the Afrigateway Platform and the Payment Services</li>
                                            <li>to enable, facilitate and streamline the functioning of and your access to the Afrigateway Platform</li>
                                            <li>to better understand how you navigate through and interact with the Afrigateway Platform and to improve the Afrigateway Platform</li>
                                            <li>to serve you tailored advertising (such as on the Afrigateway Platform, emails and on third-party websites)</li>
                                            <li>to show you content (e.g., advertisements) that is more relevant to you</li>
                                            <li>to monitor and analyze the performance, operation, and effectiveness of the Afrigateway Platform and Afrigateway advertisements</li>
                                            <li>to enforce legal agreements that govern use of the Afrigateway Platform</li>
                                            <li>for fraud detection and prevention, trust and safety, and investigations</li>
                                            <li>for purposes of our own customer support, analytics, research, product development, and regulatory compliance.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-large-heading">Cookies</div>
                                    <div>
                                        When you visit the Afrigateway Platform we may place cookies on your device. Cookies are small text files that websites send to your computer or other Internet-connected device to uniquely identify your browser or to store information or settings in your browser. Cookies allow us to recognize you when you return. They also help us provide a customized experience and can enable us to detect certain kinds of fraud. In many cases the information we collect using cookies and other tools is only used in a non-identifiable manner without reference to personal information. For example, we may use information we collect to better understand website traffic patterns and to optimize our website experience. In some cases we associate the information we collect using cookies and other technology with your personal information. Our business partners may also use these tracking technologies on the Afrigateway Platform or engage others to track your behavior on our behalf.
                                        <div className="margin-bottom-20"></div>
                                        There are two types of cookies used on the Afrigateway Platform: (1) “session cookies” and (2) “persistent cookies.” Session cookies normally expire when you close your browser, while persistent cookies remain on your device after you close your browser, and can be used again the next time you access the Afrigateway Platform.
                                        <div className="margin-bottom-20"></div>
                                        In many cases you can manage cookie preferences and opt-out of having cookies and other data collection technologies used by adjusting the settings on your browser. All browsers are different so visit the “help” section of your browser when to learn about cookie preferences and other privacy settings that may be available. Please note that if you choose to remove or reject cookies or clear local storage this could affect the features, availability, and functionality of the Afrigateway Platform.
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-large-heading">Flash Cookies</div>
                                    <div>
                                        We may use Flash Cookies, also known as Local Stored Objects, and similar technologies to personalize and enhance your online experience. A Flash cookie is a small data file placed on a computer using Adobe Flash technology. The Adobe Flash Player is an application that allows rapid development of dynamic content, such as video clips and animation.
                                        We use Flash cookies to personalize and enhance your online experience and to deliver content for Flash players. We may also use Flash cookies for security purposes, to gather certain website metrics and to help remember settings and preferences. Flash cookies are managed through a different interface than the one provided by your web browser.
                                        If you disable Flash cookies or other similar technologies, please note that you may not have access to certain content and product features such as your device remembering a Listing that you viewed during a previous visit.
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-large-heading">Pixel Tags, Web Beacons, and Trackers</div>
                                    <div>
                                        Pixel tags, web beacons, and tracking urls are tiny graphic images and/or small blocks of code placed on website pages, ads, or in our emails that allow us to determine whether you performed a specific action. When you access these pages, or when you open an email, let us know you have accessed the web page or opened the email. These tools help us measure response to our communications and improve our web pages and promotions.
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-large-heading">Server Logs and Other Technologies</div>
                                    <div>
                                        We collect many different types of information from server logs and other technologies. For example, we collect information about the device you use to access the Afrigateway Platform, your operating system type, browser type, domain, and other system settings, as well as the language your system uses and the country and time zone where your device is located. Our server logs also record the IP address of the device you use to connect to the Internet. An IP address is a unique identifier that devices require to identify and communicate with each other on the Internet. We may also collect information about the website you were visiting before you came to the Afrigateway Platform and the website you visit after you leave the Afrigateway Platform.
                                        We may also collect information about your use of the Afrigateway Platform such as when we provide accessibility tools. The tools described help us improve user experience and deliver our services.
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-large-heading">Device Information</div>
                                    <div>
                                        We may use device-related information to authenticate users. For example, we may use your IP address, browser information, or other data provided by your browser or device to identify the device being used to access our platform. We may also use these device-related techniques for associating you with different devices that you may use to access our content including for fraud-protection purposes and to better target advertising.
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-large-heading">Your Choices</div>
                                    <div>
                                        Afrigateway permits third parties to collect the information described above through our Service and discloses such information to third parties for business purposes as described in this Privacy Policy, including but not limited to providing advertising on our Service and elsewhere based on users’ online activities over time and across different sites, services, and devices.
                                        <br />
                                        <br />
                                        Third parties place technologies such as pixels and SDKs on the Afrigateway Platform. These technologies (1) help us analyze how you use the Afrigateway Platform, such as by noting the third party services from which you arrived, (2) market and advertise Afrigateway services to you on the Afrigateway Platform and third party websites, (3) help us detect or prevent fraud or conduct risk assessments, and (4) collect information about your activities on the Afrigateway Platform, other sites, and/or the ads you have clicked on. For example, to help us better understand how people use the Afrigateway Platform, we work with a number of analytics partners, including Google Analytics. To prevent Google Analytics from using your information for analytics, you may install the Google Analytics Opt-Out Browser. In some cases, cookies are placed if certain criteria is met, such as being logged into the third party service on the same browser.
                                        <br />
                                        <br />
                                        Targeting and advertising cookies we use may include Google, and other advertising networks and services we use from time to time.  To the extent advertising technology is integrated into the Afrigateway Platform and you opt-out of tailored advertising, you may still receive advertising content. In that case, the advertising content will just not be tailored to your interests.
                                    </div>
                                </div>

                                <div>
                                    <div className="large-large-large-large-heading">Third Parties</div>
                                    <div>
                                        Most browsers automatically accept cookies, but you can modify your browser setting to decline cookies by visiting the Help portion of your browser’s toolbar. While you may disable cookies through your browser settings, the Afrigateway Platform currently does not respond to a “Do Not Track” signal in the HTTP header from your browser or mobile application due to lack of standardization regarding how that signal should be interpreted.
                                        <br />
                                        <br />
                                        Flash cookies operate differently than browser cookies, and cookie management tools available in a web browser will not remove flash cookies.
                                        <br />
                                        <br />
                                        Your mobile device may allow you to control cookies through its settings function. Refer to your device manufacturer’s instructions for more information.
                                        <br />
                                        <br />
                                        If you choose to decline cookies, some parts of the Afrigateway Platform may not work as intended or may not work at all.
                                    </div>
                                </div>
                            </div>
                        </section>
                    }

                    {
                        activeLink === "sales-and-purchase-agreement" &&
                        <section id="sales-and-purchase-agreement">
                            <div className="about-section-primary-title">Sale and Purchase Agreement</div>
                            <div className="section-content">
                                <div>
                                    This document is a binding legal agreement between the two parties, Buyer and Merchant, who are users (<b>Members</b>) on the websites and applications of Afrigateway Limited (collectively, <b>the Afrigateway Platform</b>). The Afrigateway Platform facilitates transactions between Members. Members who post requests for quotations are “<b>Buyers</b>” and Members who provide quotations to these requests are “<b>Merchants</b>”. The Buyers and Merchants also purchase and supply physical products requested and quoted for, respectively.
                                    <div className="margin-bottom-20"></div>
                                    This legal agreement emanates from a transactional arrangement between both parties on the Afrigateway Platform, guided by the <a href="#tos">Terms of Service</a>.
                                    <div className="margin-bottom-20"></div>
                                    Afrigateway’s role in this agreement is to act as the Merchant’s Payment Collection agent solely for the purpose of accepting and processing funds from Buyer on the Merchant’s behalf. This role is adequately spelt out in the <a href="#payment-tos">Payment Terms</a>.
                                </div>

                                <div className="margin-bottom-30"></div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Bank Details</div>
                                    <div>
                                        <div><span>Company Name</span>: <em style={{ fontWeight: 500 }}>AFRIGATEWAY LIMITED</em></div>
                                        <div><span>Branch Name</span>: <em style={{ fontWeight: 500 }}>FIDELITY BANK GHANA</em></div>
                                        <div><span>Bank Account Number</span>: <em style={{ fontWeight: 500 }}>1951191585112</em></div>
                                        <div><span>Bank Branch</span>: <em style={{ fontWeight: 500 }}>HAATSO</em></div>
                                        <div><span>Swift Code</span>: <em style={{ fontWeight: 500 }}>FBLIGHAC</em></div>
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Date</div>
                                    <div>
                                        This agreement entered into force on the date that the Buyer and Merchant confirmed and accepted the order respectively.
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Address</div>
                                    <div>
                                        The addresses of both parties are those linked to their respective Afrigateway accounts.
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Description of the Product</div>
                                    <div>
                                        The specifications of the product being purchased and supplied are those captured in the order agreed upon by both parties on the Afrigateway Platform.
                                        <div className="margin-bottom-10"></div>
                                        The quantity of the product is also captured in the order agreed upon by both parties on the Afrigateway Platform.
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Contract Price and Delivery Terms (Incoterm)</div>
                                    <div>
                                        The Total amount (including Freight and Insurance) to be paid is captured in the order agreed upon by both parties on the Afrigateway Platform.
                                        <div className="margin-bottom-10"></div>
                                        The delivery term to be applied is captured in the order agreed upon by both parties on the Afrigateway Platform.
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Payment Options and Conditions</div>
                                    <div>
                                        One of the Payment Options coupled with their respective conditions, below will be used in this agreement:
                                    </div>
                                    <div>
                                        <ol>
                                            <li>Documentary Collection and Escrow: Proof of Payment will require deposit of ten percent (10%) of the Total amount in an agreed Escrow account. The Merchant will only be notified to commence fulfilment of the order once agreed upon deposit has been made by the Buyer.</li>
                                            <li>Irrevocable Letters of Credit with Payment at Sight: The presentation of the Letter of Credit to Afrigateway’s bank will constitute Proof of Payment. The Merchant will then be notified to commence fulfilment of the order. </li>
                                            <li>Bank Transfer: The Buyer is required to pay an initial deposit of thirty percent (30%) of the Total amount (including Freight and Insurance) into the bank account of Afrigateway. The initial deposit will constitute Proof of Payment; the Merchant will be notified to commence fulfilment of the order.</li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Insurance</div>
                                    <div>
                                        The product being purchased and supplied has been insured under Product Liability / Guarantee policy. In the event the product supplied do not meet the agreed terms or standards, the Buyer is assured of 100% returns of their funds, once the claims have been verified and approved by the Insurance company.
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Documents</div>
                                    <div>
                                        Some or all of the following documents will provided by the Merchant to the Buyer
                                    </div>
                                    <div>
                                        <ul>
                                            <li>Original Bill of Landing</li>
                                            <li>Commercial invoice</li>
                                            <li>Packing List</li>
                                            <li>Certificate of Origin  </li>
                                            <li>Certificate of Phytosanitary </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="sandpa-sub-section-containers">
                                    <div className="large-large-large-heading">Acceptance</div>
                                    <div>
                                        Both parties accept all of the terms and conditions contained herein, which become effective, and binding herein after. This agreement duly entered into force by both parties shall have validity, significance and implication.
                                    </div>
                                </div>


                            </div>
                        </section>
                    }
                </div>
            </div>
        </div >
    )
}

export default Legal;