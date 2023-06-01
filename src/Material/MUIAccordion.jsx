import { useState } from "react";
import "../Styles/MUIAccordion.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { searchObjects } from "../Components/Misc";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "white" : "white",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  color: "#24252a",
}));

const MUIAccordion = () => {
  const [expanded, setExpanded] = useState(null);
  const handleChange = (panel) => () => {
    if (expanded === panel) {
      setExpanded(null);
    } else {
      setExpanded(panel);
    }
  };
  const mergeStringPanel = (index) => `panel${index}`;
  const initialState = [
    {
      summary: "What is TheAfricanExporter.com",
      details: (
        <div>
          It's a B2B marketplace connecting Global buyers directly to wholesale
          exporters of Agro-based products in Africa
        </div>
      ),
    },

    {
      summary: "How does the platform work?",
      details: (
        <ol type="a">
          <li>Buyer makes a Request for Quotations</li>
          <li>Merchants respond with their respective Quotations</li>
          <li>
            Buyer chooses from one or more Merchants (depending on the quantity
            of containers being requested)
          </li>
          <li>
            Buyer will then provide Proof of Payment by choosing one of our
            Payment Options
          </li>
          <li>Merchant will deliver the goods at the Departure Port</li>
          <li>
            Merchant is issued a cheque (minus our commision) at the Departure
            Port
          </li>
          <li>Goods are shipped to the Buyer</li>
        </ol>
      ),
    },
    {
      summary: "How much is our commision",
      details: (
        <>
          <div>
            Our commision is 4-6% of the of the cost (FOB) of the goods.
          </div>
          <ol type="a">
            <li>4% for transactions above $20,000</li>
            <li>6% for transactions below $20,000</li>
          </ol>
        </>
      ),
    },
    {
      summary: "Do you give Merchants funds to process orders?",
      details: (
        <div>
          No please, Merchants are to use their own funds to process orders and
          deliver the goods at the Departure Port
        </div>
      ),
    },
    {
      summary: "What is the time frame for Merchants to complete orders?",
      details: (
        <div>
          Merchants are expected to complete orders and deliver the goods at the
          Departure Port within 45 days.
        </div>
      ),
    },
    {
      summary:
        "Do Merchants have to prefinance Insurance & Freight on CIF/CFR orders?",
      details: (
        <div>
          No please, our company prefinances these costs (Insurance, and
          Freight) on behalf of the Buyer.
        </div>
      ),
    },
    {
      summary: "Do you give non-collaterised loans to Merchants?",
      details: (
        <div>
          Yes we do so in partnership with Financial Institutions, but it is
          based on a Merchant's transactional record on our platform. This means
          a Merchant should have successfully completed a number of orders on
          our platform.
        </div>
      ),
    },
    {
      summary: "What is a Merchant's monthly Supply Ability?",
      details: (
        <div>
          This refers to the number of containers a Merchant can successfully
          complete within a month based on their production capacity. A Merchant
          cannot accept to process orders that exceed their montly Supply
          Ability.
        </div>
      ),
    },
  ];

  const [faqs, setFaqs] = useState(initialState);
  const [searchedTerm, setSearchTerm] = useState(null);
  const oninput = (e) => {
    setTimeout(() => {
      let searchKeyword = e.target.value;
      setSearchTerm(searchKeyword);
      let matchedObjects = searchObjects(searchKeyword, initialState);
      setFaqs(matchedObjects);
    }, 1000);
  };

  const handleMail = () => {
    window.open("mailto:hello@theafricanexporter.com");
  };

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="MUIAccordionContentContainer">
      <div className="MUIAccordionContent">
        <div className="searchContentContainer">
          <div className="searchContent">
            <Paper
              className="searchBoxMaterial"
              component="form"
              sx={{
                boxShadow: "none",
                border: "1px solid rgb(220, 220, 220)",
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
              onSubmit={handleSumbit}
            >
              <div
                style={{
                  padding: "5px",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <SearchIcon />
              </div>

              <InputBase
                onChange={oninput}
                name="question"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{
                  "aria-label": "search frequently asked questions",
                }}
              />
            </Paper>
          </div>
        </div>

        {faqs.length > 0 ? (
          <div>
            {searchedTerm && (
              <div className="resultsAccordion">
                Results for: "
                <span className="searchedTerm">{searchedTerm}</span>"{" "}
              </div>
            )}
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === mergeStringPanel(index)}
                onChange={handleChange(mergeStringPanel(index))}
                className={
                  expanded === mergeStringPanel(index)
                    ? "AccordionRow ActiveAccordionRow"
                    : "AccordionRow"
                }
              >
                <AccordionSummary>
                  <Typography sx={{ fontWeight: 600 }}>
                    {faq.summary}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.details}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="cantFindQuestion">
            Uh oh, no results. Please send your question to{" "}
            <span onClick={handleMail} className="emailTo">
              hello@theafricanexporter.com
            </span>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default MUIAccordion;
