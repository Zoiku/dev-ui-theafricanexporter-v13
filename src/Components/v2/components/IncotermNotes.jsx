import { Stack } from "@mui/material";
import { Tip } from "../components/Tip";

const IncotermNotes = ({ title, children }) => {
  return (
    <Tip>
      <Stack>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>Additional Notes for {title}</div>
        {children}
      </Stack>
    </Tip>
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
