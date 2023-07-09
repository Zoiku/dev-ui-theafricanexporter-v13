import { useEffect, useState } from "react";
import { MuiTableV1 } from "../../v2/components/Table";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import Countdown from "../../Countdown";
import DrawerModal from "../../v2/components/DrawerModal";
import { wideBox } from "../../../Styles/v2/box";
import { Box, Stack } from "@mui/material";
import MerchantService from "../../../Services/Merchant";
import OfferTable from "../../v2/components/OfferTable";
import { capitalizeString } from "../../Functions";
import MuiButton from "../../v2/components/MuiButtons";

const Quotations = () => {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
    totalCount: 0,
  });
  const handlePageChange = (page) => {
    setPaging({ ...paging, page: page + 1 });
  };
  const handlePageSizeChange = (size) => {
    setPaging({ ...paging, size: size });
  };

  const [selectedQuote, setSelectedQuote] = useState(null);
  const [openQuoteView, setOpenQuoteView] = useState(false);
  const toggleOpenQuoteView = (open) => () => {
    setOpenQuoteView(open);
    !open && setSelectedQuote(null);
  };
  const handleOpenQuote = (id) => () => {
    const quote = rows.find((row) => row.id === id);
    setSelectedQuote(quote);
    setOpenQuoteView(true);
  };

  const columns = [
    { field: "index", headerName: "Number", width: 80 },
    { field: "requestNo", headerName: "Request #", width: 100 },
    { field: "productName", headerName: "Product", width: 180 },
    { field: "terms", headerName: "Terms", width: 100 },
    { field: "destination", headerName: "Destination", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "timeLeft",
      headerName: "Time Left",
      width: 100,
      renderCell: ({ row }) => (
        <div className="countdown-table-container">
          <Countdown endDate={row.expiryDate} />
        </div>
      ),
    },
    {
      field: "action",
      headerName: "",
      width: 90,
      renderCell: ({ row }) => (
        <MuiButton
          buttonType="100"
          label="View"
          onClick={handleOpenQuote(row.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setRowsLoading(true);
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getQuotes(
          abortController.signal
        );
        if (errors.length === 0) {
          const filteredData = data.data.data.map((quote, index) => {
            const quotationRequest = quote?.request;
            const quotationProduct = quotationRequest?.quotationProducts.at(0);
            const quotationOfferRows = quote?.buyerQuotationRequestIncoterm;
            return {
              index: index + 1,
              id: quote?._id,
              requestNo: quotationRequest?.requestNo,
              expiryDate: quotationRequest?.expiryDate,
              productName: quotationProduct?.product?.name,
              terms: quotationRequest?.buyerQuotationIncoterm?.label,
              destination: capitalizeString(quotationRequest?.destination),
              origin: quotationProduct?.product?.origin?.country,
              port: quotationRequest?.port,
              quantity: quote?.offerQuantity,
              species: quotationProduct?.product?.species?.label,
              speciesType: quotationProduct?.product?.species?.type?.label,
              validity: quotationRequest?.validity,
              offerRows: quotationOfferRows,
              specifications: {
                containerSize: "20ft Container",
                length: quotationProduct?.specification?.length,
                lengthUnit: quotationProduct?.specification?.lengthUnit,
                diameter: quotationProduct?.specification?.diameter,
                diameterUnit: quotationProduct?.specification?.diameterUnit,
                thickness: quotationProduct?.specification?.thickness,
                thicknessUnit: quotationProduct?.specification?.thicknessUnit,
                width: quotationProduct?.specification?.width,
                widthUnit: quotationProduct?.specification?.widthUnit,
                drying: quotationProduct?.specification?.drying?.label,
              },
            };
          });
          setRows(filteredData);
        }
      } catch (error) {
        throw error;
      }
      setRowsLoading(false);
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  const QuoteView = () => {
    return (
      selectedQuote && (
        <Box>
          <div>
            <SectionItem sectionTitle="Product Information">
              <StackItem title="Product" value={selectedQuote?.productName} />
              <StackItem title="Species" value={selectedQuote?.species} />
              <StackItem
                title="Type Of Species"
                value={selectedQuote?.speciesType}
              />
              <StackItem title="Origin" value={selectedQuote?.origin} />
              <StackItem
                title="Container size"
                value={selectedQuote?.specifications?.containerSize}
              />
            </SectionItem>

            <SectionItem sectionTitle="Specifications">
              <StackItem
                capitalize={false}
                title="Length"
                value={`${selectedQuote?.specifications?.length} ${selectedQuote?.specifications?.lengthUnit}`}
              />

              {selectedQuote?.specifications?.diameter && (
                <StackItem
                  capitalize={false}
                  title="Diameter"
                  value={`${selectedQuote?.specifications?.diameter} ${selectedQuote?.specifications?.diameterUnit}`}
                />
              )}

              {selectedQuote?.specifications?.thickness && (
                <StackItem
                  capitalize={false}
                  title="Thickness"
                  value={`${selectedQuote?.specifications?.thickness} ${selectedQuote?.specifications?.thicknessUnit}`}
                />
              )}

              {selectedQuote?.specifications?.width && (
                <StackItem
                  capitalize={false}
                  title="Width"
                  value={`${selectedQuote?.specifications?.width} ${selectedQuote?.specifications?.widthUnit}`}
                />
              )}

              {selectedQuote?.specifications?.drying && (
                <StackItem
                  title="Drying"
                  value={selectedQuote?.specifications?.drying}
                />
              )}
              <StackItem
                title="Quantity"
                value={`${selectedQuote?.quantity} 20ft Container`}
              />
            </SectionItem>
            <SectionItem sectionTitle="Pricing and Delivery Information">
              <StackItem title="Incoterm" value={selectedQuote?.terms} />
              <StackItem
                title="Destination"
                value={selectedQuote?.destination}
              />
              <StackItem title="Port" value={selectedQuote?.port} />
            </SectionItem>

            <SectionItem sectionTitle="Request Settings">
              <StackItem
                title="Validity"
                value={`${selectedQuote?.validity} Days`}
              />
            </SectionItem>

            <SectionItem sectionTitle="Offer Table">
              <Stack>
                <OfferTable
                  offerRows={selectedQuote?.offerRows}
                  product={selectedQuote?.productName}
                  incoterm={selectedQuote?.terms}
                />
              </Stack>
            </SectionItem>
          </div>
        </Box>
      )
    );
  };

  return (
    <main>
      <DrawerModal
        boxStyle={wideBox}
        openState={openQuoteView}
        toggleOpenState={toggleOpenQuoteView}
        title="Quotation Details"
      >
        <QuoteView />
      </DrawerModal>

      <MuiTableV1
        label="Quotations"
        rows={rows}
        columns={columns}
        paging={paging}
        rowsLoading={rowsLoading}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </main>
  );
};

export default Quotations;
