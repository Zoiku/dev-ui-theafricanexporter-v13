import MUIAccordion from "../Material/MUIAccordion";
import "../Styles/FAQ.css";
import backgroundSvgArt from "../Assets/FAQs-cuate.svg";

const FAQ = () => {
  const handleMail = () => {
    window.open("mailto:hello@theafricanexporter.com");
  };

  return (
    <div className="FAQContainer">
      <div className="FAQ">
        <div className="pageInformationContentContainer">
          <div className="pageInformationContent">
            <div
              data-aos-duration="1000"
              data-aos="fade-right"
              className="titleContainer"
            >
              <div className="titleHelper">
                <strong>The FAQs</strong>
              </div>
              <div className="title">Help Centre</div>
              <div className="titleExtra">
                Eveything you need to know about TheAfricanExporter
              </div>
            </div>
          </div>
        </div>

        <section className="FAQSectionContainer">
          <div className="FAQSection">
            <div className="FAQSectionLeftContainer">
              <div className="backgroundArtSvgContainer">
                <img
                  src={backgroundSvgArt}
                  className="backgroundArtSvg"
                  alt=""
                />
              </div>
              <div className="FAQSectionLeft">
                <div className="titleFAQLeftContainer">
                  <div className="titleHelper">
                    <strong>Support</strong>
                  </div>
                  <div className="titleFAQLeft">FAQs</div>
                  <div className="titleFAQExtra">
                    Everything you need to know about our products, billing, and
                    more. Can't find what you are looking for? Please send an
                    email to{" "}
                    <span className="handleClickButton" onClick={handleMail}>
                      hello@theafricanexporter.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="FAQSectionRightContainer">
              <div className="FAQSectionRight">
                <div className="accordionContainer">
                  <MUIAccordion />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
