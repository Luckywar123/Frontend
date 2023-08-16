import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import {
  TableFooter,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

export const PengembalianBarang = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [skusForSelectedProduct, setSkusForSelectedProduct] = useState(null); // Change the initial state
  const [jumlah, setJumlah] = useState("");
  const [alasan, setAlasan] = useState("");
  const [selectedSkuCode, setSelectedSkuCode] = useState("");
  const [selectedSkuId, setSelectedSkuId] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
      const productsData = response.data.data;
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductChange = async (event) => {
    const selectedProductId = event.target.value;
    setSelectedProduct(selectedProductId);
    const product = products.find((p) => p.idBarang === selectedProductId);
    if (product) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/products/${selectedProductId}/skus`
        );
        const skusData = response.data.data;
        console.log("skusData:", skusData); // Debug statement
        setSkusForSelectedProduct(skusData || []); // Initialize to empty array if null
        setSelectedSkuCode(skusData.length > 0 ? skusData[0]?.skuCode : "");
        setSelectedSkuId(skusData.length > 0 ? skusData[0]?.idSKU : "");
      } catch (error) {
        console.error("Error fetching SKUs:", error);
        setSkusForSelectedProduct([]); // Set to empty array in case of error
        setSelectedSkuCode("");
        setSelectedSkuId("");
      }
    } else {
      setSkusForSelectedProduct([]); // Set to empty array if no product is selected
      setSelectedSkuCode("");
      setSelectedSkuId("");
    }
  };
  

  const handleJumlahChange = (event) => {
    setJumlah(event.target.value);
  };

  const handleAlasanChange = (event) => {
    setAlasan(event.target.value);
  };
  const handleReturn = async () => {
    try {
      if (skusForSelectedProduct.length === 0) {
        alert("No SKUs available for this product.");
        return;
      }
  
      if (skusForSelectedProduct[0]?.stock <= 0) {
        alert("Insufficient stock for return.");
        return;
      }
  
      const requestData = {
        idBarang: selectedProduct,
        idSKU: selectedSkuId,
        jumlah: jumlah,
        alasan: alasan,
      };
  
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/return-items`,
        requestData
      );
  
      if (response.status === 200) {
        alert("Return item added successfully");
        // Update the frontend display if needed
        // For example, you might refresh the product list or adjust the SKU stock display
      }
    } catch (error) {
      console.error("Error adding return item:", error);
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        console.log("Failed data:", responseData);
        console.log("Failed message:", responseData.message);
        // You can display the error message or take any other action as needed.
      }
      alert("Error adding return item. Please try again later.");
    }
  };
  
  
  
  return (
    <div className={styles.content}>
      <div className={styles.title}>Pengembalian Barang</div>
      <div className={styles.bodyContent}>
        <div className={styles.buttonTambah}>
          <Button
            style={{
              background: 'linear-gradient(#D3EBCD, #B1E9A3)',
              color: '#000000',
              fontWeight: 'bold',
              paddingLeft: '35px',
              paddingRight: '35px',
              borderRadius: '100px',
            }}
          >
            + Tambah
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className={styles.rowHead}>
              <TableRow>
                <TableCell className={styles.headContent}>ID Barang</TableCell>
                <TableCell>Nama Barang</TableCell>
                <TableCell>SKU Code</TableCell>
                <TableCell align="center">Jumlah&nbsp;(Box)</TableCell>
                <TableCell align="center">Alasan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {selectedProduct}
                </TableCell>
                <TableCell component="th" scope="row">
                  <FormControl sx={{ minWidth: 200 }}>
                    <Select
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      style={{
                        borderRadius: '150px',
                        height: '35px',
                        backgroundColor: '#D3EBCD',
                      }}
                      value={selectedProduct}
                      onChange={handleProductChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {products.map((product) => (
                        <MenuItem key={product.idBarang} value={product.idBarang}>
                          {product.nama}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell component="th" scope="row">
                <FormControl sx={{ minWidth: 200 }}>
  <Select
    displayEmpty
    inputProps={{ 'aria-label': 'Without label' }}
    style={{
      borderRadius: '150px',
      height: '35px',
      backgroundColor: '#D3EBCD',
    }}
    value={selectedSkuCode}
    onChange={(event) => setSelectedSkuCode(event.target.value)}
  >
    {skusForSelectedProduct && skusForSelectedProduct.skus ? (
      skusForSelectedProduct.skus.length === 0 ? (
        <MenuItem disabled>No SKUs added</MenuItem>
      ) : (
        skusForSelectedProduct.skus.map((sku) => (
          <MenuItem
            key={sku.idSKU}
            name={sku.idSKU}
            value={sku.skuCode}
            onClick={() => setSelectedSkuId(sku.idSKU)}
          >
            {sku.skuCode}
          </MenuItem>
        ))
      )
    ) : (
      <MenuItem disabled>Loading SKUs...</MenuItem>
    )}
  </Select>
</FormControl>



      </TableCell>
                <TableCell align="center">
                  <input type="text" value={jumlah} onChange={handleJumlahChange} />
                </TableCell>
                <TableCell align="center">
                  <FormControl sx={{ minWidth: 350 }}>
                    <Select
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      style={{
                        borderRadius: '150px',
                        height: '35px',
                        backgroundColor: '#D3EBCD',
                      }}
                      value={alasan}
                      onChange={handleAlasanChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Kadaluarsa">Kadaluarsa</MenuItem>
                      <MenuItem value="Rusak">Rusak</MenuItem>
                      <MenuItem value="Salah Barang">Salah Barang</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className={styles.rowFooter}>
              <TableCell colSpan={6} align="right">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#04D700',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    paddingLeft: '25px',
                    paddingRight: '25px',
                    borderRadius: '12px',
                  }}
                  onClick={handleReturn}
                >
                  Return
                </Button>
              </TableCell>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
