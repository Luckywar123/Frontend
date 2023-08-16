import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import {
  TableFooter,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Pagination } from "../../components/Pagination";

export const DetailBarang = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { idBarang } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [newData, setNewData] = useState({
    skuCode: "",
    productionDate: "",
    expiredDate: "",
    inboundDate: "",
    stok: "",
  });

  useEffect(() => {
    if (idBarang) {
      fetchData();
    }
  }, [idBarang]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/${idBarang}/skus`
      );
      const productData = response.data.data;
  
      if (!productData || !productData.skus) {
        setError("No product data available.");
        return;
      }
  
      const formattedProductData = {
        nama: productData.nama,
        skus: productData.skus.map((sku) => ({
          ...sku,
          productionDate: new Date(sku.productionDate).toLocaleDateString(),
          expiredDate: new Date(sku.expiredDate).toLocaleDateString(),
          inboundDate: new Date(sku.inboundDate).toLocaleDateString(),
        })),
      };
      setProduct(formattedProductData);
      setError(null);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Error fetching product. Please try again later.");
    }
  };
  
  

  const handleOpenModal = () => {
    setNewData({
      skuCode: "",
      productionDate: "",
      expiredDate: "",
      inboundDate: "",
      stok: "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNewDataChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/products/${idBarang}/skus`,
        newData
      );
      const newRow = {
        idSKU: response.data.data.idSKU,
        skuCode: newData.skuCode,
        productionDate: newData.productionDate,
        expiredDate: newData.expiredDate,
        inboundDate: newData.inboundDate,
        stok: newData.stok,
      };
      setProduct((prevProduct) => ({
        ...prevProduct,
        skus: [...prevProduct.skus, newRow],
      }));
      handleCloseModal();
    } catch (error) {
      console.error("Error adding new data:", error);
      setError("Error adding new data. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error ? (
          <div>{error}</div>
        ) : product ? (
          <>
            <div className={styles.title}>Product Details</div>
            <div className={styles.bodyContent}>
              <Button
                style={{
                  background: "linear-gradient(#D3EBCD, #B1E9A3)",
                  color: "#000000",
                  fontWeight: "bold",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                  borderRadius: "100px",
                  fontSize: "11px",
                }}
                onClick={handleOpenModal}
              >
                + Tambah Data
              </Button>

              <p>Nama: {product.nama}</p>
              {product.skus && product.skus.length > 0 ? (
                <div>
                  <h3>SKUs:</h3>
                  <TableContainer component={Paper} className={styles.tabel}>
                    <Table>
                      <TableHead className={styles.rowHead}>
                        <TableRow>
                          <TableCell>ID SKU</TableCell>
                          <TableCell>SKU Code</TableCell>
                          <TableCell>Production Date</TableCell>
                          <TableCell>Expired Date</TableCell>
                          <TableCell>Inbound Date</TableCell>
                          <TableCell>Stok</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.skus
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((sku) => (
                            <TableRow key={sku.idSKU}>
                              <TableCell>{sku.idSKU}</TableCell>
                              <TableCell>{sku.skuCode}</TableCell>
                              <TableCell>{sku.productionDate}</TableCell>
                              <TableCell>{sku.expiredDate}</TableCell>
                              <TableCell>{sku.inboundDate}</TableCell>
                              <TableCell>{sku.stok}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>

                      <TableFooter className={styles.rowFooter}>
                        <TableRow>
                          <TableCell colSpan={6} align="right">
                            <Pagination
                              count={product.skus.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={(event, newPage) =>
                                setPage(newPage)
                              }
                              onChangeRowsPerPage={(event) => {
                                setRowsPerPage(
                                  parseInt(event.target.value, 10)
                                );
                                setPage(0);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </div>
             ) : (
              <p>No SKUs available for this product.</p>
            )}

              {openModal && (
                <div className={styles.popup}>
                  <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Tambah Data</DialogTitle>
                    <DialogContent>
                      <div className={styles.formContent}>
                        <TextField
                          label="ID SKU"
                          name="idSKU"
                          value={newData.idSKU}
                          onChange={handleNewDataChange}
                        />
                        <TextField
                          label="SKU Code"
                          name="skuCode"
                          value={newData.skuCode}
                          onChange={handleNewDataChange}
                        />
                        <TextField
                          label="Production Date"
                          name="productionDate"
                          type="date"
                          value={newData.productionDate}
                          onChange={handleNewDataChange}
                        />
                        <TextField
                          label="Expired Date"
                          name="expiredDate"
                          type="date"
                          value={newData.expiredDate}
                          onChange={handleNewDataChange}
                        />
                        <TextField
                          label="Inbound Date"
                          name="inboundDate"
                          type="date"
                          value={newData.inboundDate}
                          onChange={handleNewDataChange}
                        />
                        <TextField
                          label="Stok"
                          name="stok"
                          value={newData.stok}
                          onChange={handleNewDataChange}
                        />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseModal}>Batal</Button>
                      <Button onClick={handleAddData}>Simpan</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default DetailBarang;
