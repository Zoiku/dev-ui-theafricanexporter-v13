import "../../../Styles/v2/IncotermNotes.css";
import { Stack } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material/";

const IncotermNotes = ({ title, children }) => {
  return (
    <Stack direction="column" spacing={1} className="incoterm_note_container">
      <Stack
        direction="row"
        alignItems="center"
        className="incoterm_note_title"
        spacing={2}
      >
        <ErrorOutline fontSize="small" />
        <div>Additional Notes for {title}</div>
      </Stack>
      <div className="incoterm_note">{children}</div>
    </Stack>
  );
};

const CIF = () => {
  return (
    <IncotermNotes title="CIF">
      <div>Price per Container: CBM x Price per CBM</div>
      <div>Total Price: Price per Container x Quantity</div>
      <div>Insurance: 0.25% of Cargo value (Total Price)</div>
      <div>Total Freight: Freight rate x Quantity</div>
      <div>Total Amount: Total Price + Insurance + Total Freight</div>
    </IncotermNotes>
  );
};

const FOB = () => {
  return (
    <IncotermNotes title="FOB">
      <div>Price per Container: CBM x Price per CBM</div>
      <div>Total Price: Price per Container x Quantity</div>
      <div>Total Amount: Total price</div>
    </IncotermNotes>
  );
};

const CFR = () => {
  return (
    <IncotermNotes title="CFR">
      <div>Price per Container: CBM x Price per CBM</div>
      <div>Total Price: Price per Container x Quantity</div>
      <div>Total Freight: Freight rate x Quantity</div>
      <div>Total Amount: Total Price + Total Freight</div>
    </IncotermNotes>
  );
};

const INCOTERM_NOTES = {
  CIF: <CIF />,
  FOB: <FOB />,
  CFR: <CFR />,
};

export const INCOTERMS = {
  CIF: "CIF",
  FOB: "FOB",
  CFR: "CFR",
};

export const incotermNote = (term) => INCOTERM_NOTES[term];
