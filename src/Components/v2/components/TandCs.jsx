import React from "react";

const TandCs = () => {
  return (
    <div>
      <div>
        This document is a binding legal agreement between the two parties,
        Buyer and Merchant, who are users (<b>Members</b>) on the websites and
        applications of Afrigateway Limited (collectively,{" "}
        <b>the Afrigateway Platform</b>). The Afrigateway Platform facilitates
        transactions between Members. Members who post requests for quotations
        are “<b>Buyers</b>” and Members who provide quotations to these requests
        are “<b>Merchants</b>”. The Buyers and Merchants also purchase and
        supply physical products requested and quoted for, respectively.
        <div className="margin-bottom-20"></div>
        This legal agreement emanates from a transactional arrangement between
        both parties on the Afrigateway Platform, guided by the{" "}
        <a href="#tos">Terms of Service</a>.
        <div className="margin-bottom-20"></div>
        Afrigateway’s role in this agreement is to act as the Merchant’s Payment
        Collection agent solely for the purpose of accepting and processing
        funds from Buyer on the Merchant’s behalf. This role is adequately spelt
        out in the <a href="#payment-tos">Payment Terms</a>.
      </div>

      <div className="margin-bottom-30"></div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Bank Details
        </div>
        <div>
          <div>
            <span>Company Name</span>:{" "}
            <em style={{ fontWeight: 500 }}>AFRIGATEWAY LIMITED</em>
          </div>
          <div>
            <span>Branch Name</span>:{" "}
            <em style={{ fontWeight: 500 }}>FIDELITY BANK GHANA</em>
          </div>
          <div>
            <span>Bank Account Number</span>:{" "}
            <em style={{ fontWeight: 500 }}>1951191585112</em>
          </div>
          <div>
            <span>Bank Branch</span>:{" "}
            <em style={{ fontWeight: 500 }}>HAATSO</em>
          </div>
          <div>
            <span>Swift Code</span>:{" "}
            <em style={{ fontWeight: 500 }}>FBLIGHAC</em>
          </div>
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Date
        </div>
        <div>
          This agreement entered into force on the date that the Buyer and
          Merchant confirmed and accepted the order respectively.
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Address
        </div>
        <div>
          The addresses of both parties are those linked to their respective
          Afrigateway accounts.
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Description of the Product
        </div>
        <div>
          The specifications of the product being purchased and supplied are
          those captured in the order agreed upon by both parties on the
          Afrigateway Platform.
          <div className="margin-bottom-10"></div>
          The quantity of the product is also captured in the order agreed upon
          by both parties on the Afrigateway Platform.
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Contract Price and Delivery Terms (Incoterm)
        </div>
        <div>
          The Total amount (including Freight and Insurance) to be paid is
          captured in the order agreed upon by both parties on the Afrigateway
          Platform.
          <div className="margin-bottom-10"></div>
          The delivery term to be applied is captured in the order agreed upon
          by both parties on the Afrigateway Platform.
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Payment Options and Conditions
        </div>
        <div>
          One of the Payment Options coupled with their respective conditions,
          below will be used in this agreement:
        </div>
        <div>
          <ol className="order-lists-legal">
            <li>
              Documentary Collection and Escrow: Proof of Payment will require
              deposit of ten percent (10%) of the Total amount in an agreed
              Escrow account. The Merchant will only be notified to commence
              fulfilment of the order once agreed upon deposit has been made by
              the Buyer.
            </li>
            <li>
              Irrevocable Letters of Credit with Payment at Sight: The
              presentation of the Letter of Credit to Afrigateway’s bank will
              constitute Proof of Payment. The Merchant will then be notified to
              commence fulfilment of the order.{" "}
            </li>
            <li>
              Bank Transfer: The Buyer is required to pay an initial deposit of
              thirty percent (30%) of the Total amount (including Freight and
              Insurance) into the bank account of Afrigateway. The initial
              deposit will constitute Proof of Payment; the Merchant will be
              notified to commence fulfilment of the order.
            </li>
          </ol>
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Insurance
        </div>
        <div>
          The product being purchased and supplied has been insured under
          Product Liability / Guarantee policy. In the event the product
          supplied do not meet the agreed terms or standards, the Buyer is
          assured of 100% returns of their funds, once the claims have been
          verified and approved by the Insurance company.
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Documents
        </div>
        <div>
          Some or all of the following documents will provided by the Merchant
          to the Buyer
        </div>
        <div>
          <ul className="order-lists-legal">
            <li>Original Bill of Landing</li>
            <li>Commercial invoice</li>
            <li>Packing List</li>
            <li>Certificate of Origin </li>
            <li>Certificate of Phytosanitary </li>
          </ul>
        </div>
      </div>

      <div className="sandpa-sub-section-containers">
        <div style={{ fontWeight: 700 }} className="large-large-large-heading">
          Acceptance
        </div>
        <div>
          Both parties accept all of the terms and conditions contained herein,
          which become effective, and binding herein after. This agreement duly
          entered into force by both parties shall have validity, significance
          and implication.
        </div>
      </div>
    </div>
  );
};

export default TandCs;
