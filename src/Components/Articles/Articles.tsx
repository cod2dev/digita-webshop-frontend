import ContentHeader from "../PanelProducts/ContentHeader/ContentHeader";
import Pagination from "../PanelProducts/Pagination/Pagination";
import { useState } from "react";
import GridHeader from "./GridHeader/GridHeader";
import { Grid, SelectChangeEvent, Divider, Box } from "@mui/material";
import { paginationStyle } from "../../Styles/PanelProducts";
import Article from "./Article/Article";
import { productData } from "../../Services/Utils/Data/data";

const Articles = () => {
    const [list, setList] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = list.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [selectedStatus, setSelectedStatus] = useState("status");
  const [selectedAmount, setSelectedAmount] = useState("20");

  const selectedStatusHandler = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };
  const selectedAmountHandler = (event: SelectChangeEvent) => {
    setSelectedAmount(event.target.value);
  };

  function handleRemove(id: number) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <ContentHeader title="Articles" />
      </Grid>

      <Grid item xs={12}>
        <DashWrapper
          sx={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        >
          <GridHeader
            selectedStatus={selectedStatus}
            selectedAmount={selectedAmount}
            selectedStatusHandler={selectedStatusHandler}
            selectedAmountHandler={selectedAmountHandler}
          />
        </DashWrapper>
        <Divider
          sx={{ borderColor: "common.panelBorderGrey", opacity: ".1" }}
        />
        
          <Grid container spacing={2}>
            {currentProducts.map(({ id, name, price, image }) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
                <Article
                  id={id}
                  name={name}
                  price={price}
                  image={image}
                  onRemove={handleRemove}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={paginationStyle}>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={list.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Box>
      </Grid>
    </Grid>
  );
};

export default Articles;
