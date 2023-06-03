import "../Styles/FAQ2.css";
import MUIAccordion from "../Material/MUIAccordion";
import faqImage from "../Assets/FAQs-cuate.svg";

const FAQ2 = () => {
  return (
    <div className="FAQ2ContentContainer">
      <div className="FAQContent">
        <div className="faqHeaderTitleContainer">
          <div className="faqHeaderTitleHelper">FAQs</div>
          <div className="faqHeaderTitle">Frequently Asked Questions</div>
        </div>

        <div className="faqHelper2Container">
          Have questions? We're here to help
        </div>

        <div className="imageFaqBackgroundContainer">
          <div className="imageFaqBackground">
            <img src={faqImage} alt="" className="imageFaq" />
          </div>
        </div>

        <div className="MUIAccordionFaq2Container">
          <div className="MUIAccordionFaq2">
            <MUIAccordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ2;
