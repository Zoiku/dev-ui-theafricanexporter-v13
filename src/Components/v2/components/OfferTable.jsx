import { Stack } from "@mui/material";
import "../../../Styles/v2/OfferTable.css";

const OfferTable = ({ offerRows }) => {
  return (
    <Stack className="OfferTableComponent">
      <Stack className="offer_table_container">
        <table className="offer_table">
          <thead>
            <tr>
              <th>Number</th>
              <th>CMB</th>
              <th>Price per CBM</th>
              <th>No of Pieces</th>
              <th>Price/container</th>
              <th>Total Price</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {offerRows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row?.cbm}</td>
                <td>{row?.cbmprice}</td>
                <td>{row?.price}</td>
                <td>{row?.noOfPieces}</td>
                <td>{row?.totalPrice}</td>
                <td>{row?.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Stack>

      <small style={{ margin: "0 0 0 10px", color: "GrayText" }}>
        Kindly note that all prices are quoted in ($)
      </small>
    </Stack>
  );
};

export default OfferTable;
