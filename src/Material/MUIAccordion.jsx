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
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { searchObjects } from "../Components/Misc";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
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
      summary: "This is the first question",
      details: "Hey first question",
    },
    {
      summary: "This is the second question",
      details: "Hey second question",
    },
    {
      summary: "This is the third question",
      details: "Hey third question",
    },
    {
      summary: "This is the fourth question",
      details: "Hey fourth question",
    },
    {
      summary: "This is the fifth question",
      details: "Hey fifth question",
    },
    {
      summary: "This is the sixth question",
      details: "Hey sixth question",
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
    <div className="MUIAccordion">
      <div className="searchContainer">
        <div className="search">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
            onSubmit={handleSumbit}
          >
            <InputBase
              onChange={oninput}
              name="question"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for keywords eg. Payment Method"
              inputProps={{ "aria-label": "search frequently asked questions" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>

      {faqs.length > 0 ? (
        <div>
          {searchedTerm && (
            <div className="resultsAccordion">
              Results for: "<span className="searchedTerm">{searchedTerm}</span>
              "{" "}
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
                <Typography sx={{ fontWeight: 600 }}>{faq.summary}</Typography>
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
  );
};

export default MUIAccordion;
