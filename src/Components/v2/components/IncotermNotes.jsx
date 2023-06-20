import "../../../Styles/v2/IncotermNotes.css";
import { Stack } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material/";

const CIF = () => {
  return (
    <Stack direction="column" spacing={1} className="incoterm_note_container">
      <Stack
        direction="row"
        alignContent="center"
        className="incoterm_note_title"
        spacing={1}
      >
        <div>
          <ErrorOutline fontSize="small" />
        </div>
        <div>Additional Notes for CIF</div>
      </Stack>
      <div className="incoterm_note">
        <div>Price per Container: CBM x Price per CBM</div>
        <div>Total Price: Price per Container x Quantity</div>
        <div>Insurance: 0.25% of Cargo value (Total Price)</div>
        <div>Total Freight: Freight rate x Quantity</div>
        <div>Total Amount: Total Price + Insurance + Total Freight</div>
      </div>
    </Stack>
  );
};

const FOB = () => {
  return (
    <Stack direction="column" spacing={1} className="incoterm_note_container">
      <Stack
        direction="row"
        alignContent="center"
        className="incoterm_note_title"
        spacing={1}
      >
        <div>
          <ErrorOutline fontSize="small" />
        </div>
        <div>Additional Notes for FOB</div>
      </Stack>
      <div className="incoterm_note">
        <div>Price per Container: CBM x Price per CBM</div>
        <div>Total Price: Price per Container x Quantity</div>
        <div>Total Amount: Total price</div>
      </div>
    </Stack>
  );
};

const CFR = () => {
  return (
    <Stack direction="column" spacing={1} className="incoterm_note_container">
      <Stack
        direction="row"
        alignContent="center"
        className="incoterm_note_title"
        spacing={1}
      >
        <div>
          <ErrorOutline fontSize="small" />
        </div>
        <div>Additional Notes for CFR</div>
      </Stack>
      <div className="incoterm_note">
        <div>Price per Container: CBM x Price per CBM</div>
        <div>Total Price: Price per Container x Quantity</div>
        <div>Total Freight: Freight rate x Quantity</div>
        <div>Total Amount: Total Price + Total Freight</div>
      </div>
    </Stack>
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
