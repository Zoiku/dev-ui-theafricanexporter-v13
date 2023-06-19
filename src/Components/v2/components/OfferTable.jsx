import { Box } from "@mui/material";
import "../../../Styles/v2/OfferTable.css";
import { PRODUCTS } from "./Products";
import { INCOTERMS } from "./IncotermNotes";
import { useEffect } from "react";

export const OfferTableV1 = ({
  product,
  incoterm,
  offerRows,
  setQuotation,
  quotation,
}) => {
  const quotationRows = quotation?.incotermArray;
  const quantity = quotation.quantity;

  useEffect(() => {
    const event = {
      target: {
        name: "quantity",
        value: quantity,
      },
    };
    handleQuotationChange(true)(event);
    // eslint-disable-next-line
  }, [quantity]);

  const handleQuotationChange = (complex_type, index) => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const updatedQuotationRows = [...quotationRows];
    let updatedQuotationRow = {};
    if (name === "quantity") {
      const updatedQuotationRowsQuantity = updatedQuotationRows.map((offer) => {
        const price = offer.price ?? 0;
        const totalPrice = price * value;
        const freightRate = offer.freightRate ?? 0;
        const freight = freightRate * value;
        offer.totalPrice = totalPrice;
        if (incoterm === "FOB") {
          offer.totalAmount = price * value;
        } else if (incoterm === "CFR") {
          const totalAmount = totalPrice + freight;
          offer.freight = freight;
          offer.totalAmount = totalAmount;
        } else if (incoterm === "CIF") {
          const insurance = price * 0.0025 * value;
          const totalAmount = freight + insurance + totalPrice;
          offer.insurance = insurance;
          offer.freight = freight;
          offer.totalAmount = totalAmount;
        }
        return offer;
      });
      setQuotation({
        ...quotation,
        incotermArray: updatedQuotationRowsQuantity,
      });
    } else {
      if (complex_type) {
        if (incoterm === "FOB") {
          if (name === "cbm") {
            const price = updatedQuotationRows[index].cbmprice
              ? updatedQuotationRows[index].cbmprice * value
              : 0;
            const totalPrice = price * quantity;
            const totalAmount = totalPrice;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              price,
              totalPrice,
              totalAmount,
            };
          } else if (name === "cbmprice") {
            const price = updatedQuotationRows[index].cbm
              ? updatedQuotationRows[index].cbm * value
              : 0;
            const totalPrice = price * quantity;
            const totalAmount = totalPrice;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              price,
              totalPrice,
              totalAmount,
            };
          }
        } else if (incoterm === "CFR") {
          if (name === "cbm") {
            const price = updatedQuotationRows[index].cbmprice
              ? updatedQuotationRows[index].cbmprice * value
              : 0;
            const totalPrice = price * quantity;
            const freight = updatedQuotationRows[index].freight ?? 0;
            const totalAmount = freight + totalPrice;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              price,
              totalPrice,
              totalAmount,
            };
          } else if (name === "cbmprice") {
            const price = updatedQuotationRows[index].cbm
              ? updatedQuotationRows[index].cbm * value
              : 0;
            const totalPrice = price * quantity;
            const freight = updatedQuotationRows[index].freight ?? 0;
            const totalAmount = freight + totalPrice;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              price,
              totalPrice,
              totalAmount,
            };
          } else if (name === "freightRate") {
            const freight = value * quantity;
            const totalPrice = updatedQuotationRows[index].totalPrice ?? 0;
            const totalAmount = totalPrice + freight;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              freight,
              totalAmount,
            };
          }
        } else if (incoterm === "CIF") {
          if (name === "cbm") {
            const price = updatedQuotationRows[index].cbmprice
              ? updatedQuotationRows[index].cbmprice * value
              : 0;
            const totalPrice = price * quantity;
            const insurance = totalPrice * 0.0025;
            const freight = updatedQuotationRows[index].freight ?? 0;
            const totalAmount = totalPrice + insurance + freight;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              price,
              totalPrice,
              insurance,
              totalAmount,
            };
          } else if (name === "cbmprice") {
            const price = updatedQuotationRows[index].cbm
              ? updatedQuotationRows[index].cbm * value
              : 0;
            const totalPrice = price * quantity;
            const insurance = totalPrice * 0.0025;
            const freight = updatedQuotationRows[index].freight ?? 0;
            const totalAmount = totalPrice + insurance + freight;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              price,
              totalPrice,
              insurance,
              totalAmount,
            };
          } else if (name === "freightRate") {
            const freight = value * quantity;
            const totalPrice = updatedQuotationRows[index].totalPrice ?? 0;
            const insurance = updatedQuotationRows[index].insurance ?? 0;
            const totalAmount = totalPrice + freight + insurance;
            updatedQuotationRow = {
              ...updatedQuotationRows[index],
              [name]: value,
              freight,
              totalAmount,
            };
          }
        }
      } else {
        updatedQuotationRow = {
          ...updatedQuotationRows[index],
          [name]: value,
        };
      }
      updatedQuotationRows.splice(index, 1, updatedQuotationRow);
      setQuotation({ ...quotation, incotermArray: updatedQuotationRows });
    }
  };

  return (
    <Box className="OfferTableComponent">
      <Box className="offer_table_container">
        <table className="offer_table">
          <thead>
            <tr>
              <th>Number</th>
              {product === PRODUCTS.TEAK_ROUND_LOGS && <th>Diameter</th>}
              <th>Pieces/container</th>
              <th>CBM</th>
              <th>Price per CBM</th>
              <th>Price/container</th>
              <th>Total price</th>
              {incoterm === INCOTERMS.CIF && <th>Insurance</th>}
              {incoterm !== INCOTERMS.FOB && <th>Freight Rate</th>}
              {incoterm !== INCOTERMS.FOB && <th>Total Freight</th>}
              <th>Total amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(offerRows)).map((_row, index) => (
              <tr key={index}>
                <td>
                  <input value={index + 1} disabled />
                </td>
                {product === PRODUCTS.TEAK_ROUND_LOGS && (
                  <td>
                    <input
                      name="diameter"
                      type="text"
                      placeholder="eg 40-50"
                      onChange={handleQuotationChange(false, index)}
                      required
                    />
                  </td>
                )}
                <td>
                  <input
                    name="noOfPieces"
                    type="text"
                    placeholder="eg 40-50"
                    onChange={handleQuotationChange(false, index)}
                    required
                  />
                </td>
                <td>
                  <input
                    name="cbm"
                    type="number"
                    placeholder="eg 40"
                    min={1}
                    onChange={handleQuotationChange(true, index)}
                    required
                  />
                </td>
                <td>
                  <input
                    name="cbmprice"
                    type="number"
                    placeholder="eg 40"
                    min={1}
                    onChange={handleQuotationChange(true, index)}
                    required
                  />
                </td>
                <td>
                  <input value={quotationRows[index]?.price ?? 0} disabled />
                </td>
                <td>
                  <input
                    value={quotationRows[index]?.totalPrice ?? 0}
                    disabled
                  />
                </td>
                {incoterm === INCOTERMS.CIF && (
                  <td>
                    <input
                      value={quotationRows[index]?.insurance ?? 0}
                      disabled
                    />
                  </td>
                )}
                {incoterm !== INCOTERMS.FOB && (
                  <td>
                    <input
                      name="freightRate"
                      type="number"
                      placeholder="eg 40"
                      min={1}
                      onChange={handleQuotationChange(true, index)}
                      required
                    />
                  </td>
                )}
                {incoterm !== INCOTERMS.FOB && (
                  <td>
                    <input
                      value={quotationRows[index]?.freight ?? 0}
                      disabled
                    />
                  </td>
                )}
                <td>
                  <input
                    value={quotationRows[index]?.totalAmount ?? 0}
                    disabled
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <small style={{ margin: "0 0 0 15px", color: "gray" }}>
        Kindly note that all prices are quoted in ($)
      </small>
    </Box>
  );
};

const OfferTable = ({ offerRows, product, incoterm }) => {
  return (
    <Box className="OfferTableComponent">
      <Box className="offer_table_container">
        <table className="offer_table">
          <thead>
            <tr>
              <th>Number</th>
              {product === PRODUCTS.TEAK_ROUND_LOGS && <th>Diameter</th>}
              <th>Pieces/container</th>
              <th>CBM</th>
              <th>Price per CBM</th>
              <th>Price/container</th>
              <th>Total price</th>
              {incoterm === INCOTERMS.CIF && <th>Insurance</th>}
              {incoterm !== INCOTERMS.FOB && <th>Total Freight</th>}
              <th>Total amount</th>
            </tr>
          </thead>
          <tbody>
            {offerRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <div>{index + 1}</div>
                </td>
                {product === PRODUCTS.TEAK_ROUND_LOGS && (
                  <td>
                    <div>{row?.diameter}</div>
                  </td>
                )}
                <td>
                  <div>{row?.noOfPieces}</div>
                </td>
                <td>
                  <div>{row?.cbm}</div>
                </td>
                <td>
                  <div>{row?.cbmprice}</div>
                </td>
                <td>
                  <div>{row?.price}</div>
                </td>
                <td>
                  <div>{row?.totalPrice}</div>
                </td>
                {incoterm === INCOTERMS.CIF && (
                  <td>
                    <div>{row?.insurace}</div>
                  </td>
                )}
                {incoterm !== INCOTERMS.FOB && (
                  <td>
                    <div>{row?.costOfFreight}</div>
                  </td>
                )}
                <td>
                  <div>{row?.totalAmount}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <small style={{ margin: "0 0 0 15px", color: "gray" }}>
        Kindly note that all prices are quoted in ($)
      </small>
    </Box>
  );
};

export default OfferTable;
