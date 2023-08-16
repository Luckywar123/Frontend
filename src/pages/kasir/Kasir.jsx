import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Paper, Box, Container, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './style.module.css';

export const Kasir = () => {
  const [datarows, setDatarows] = React.useState([]); // State to store fetched data
  const [productOptions, setProductOptions] = React.useState([]); // State to store product options for the select field
  const [selectedProduct, setSelectedProduct] = React.useState(''); // Initialize with an empty string

  const [quantity, setQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  

  // Fetch data when the component mounts
  React.useEffect(() => {
    fetchKasirData();
    fetchProductOptions();
  }, []);

  const fetchKasirData = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/kasir`)
      .then(response => {
        setDatarows(response.data.data);
        console.log('Fetched data:', response.data.data);
      })
      .catch(error => {
        console.error('Error fetching kasir data:', error);
      });
  };
  
  const [transactionData, setTransactionData] =useState({
    idHistory: '',
    tanggal: '',
    idBarang: '',
    jumlah: 0,
    idSKU: '',
    idTransaksi: '',
    jenisTransaksi: 'Penjualan', // Jenis transaksi "transaction"
  });
  const handleBeliClick = async () => {
    try {
      if (datarows.length === 0) {
        console.error('No products in the table to add.');
        return;
      }
      if (response.status === 200) {
        alert("Return item added successfully");
        // Update the frontend display if needed
        // For example, you might refresh the product list or adjust the SKU stock display
      }
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date
      const idTransaksi = await fetchLatestIdTransaksi();

  
      if (idTransaksi === null) {
        console.error('No transactions found.');
        return;
      }
  
      const historyItems = datarows.map(async (row) => {
        const idBarang = await fetchIdSKU(row.Sku.product.nama);
        if (idBarang === null) {
          console.error(`ID SKU not found for product: ${row.Sku.product.nama}`);
          return null;
        }
        return {
          tanggal: currentDate,
          jumlah: row.jumlah,
          idBarang: row.Sku.product.idBarang,
          idSKU:row.idSKU ,
          idTransaksi: row.idTransaksi,
          jenisTransaksi: 'Penjualan',
        };
      });

    
      // console.log(transactionItems);
      const validHistoryItems = await Promise.all(historyItems);
      const filteredHistoryItems = validHistoryItems.filter(item => item !== null); // Remove null items
  
      if (filteredHistoryItems.length === 0) {
        console.error('No valid history items to add.');
        return;
      }
  
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/insert-history`, {
        items: validHistoryItems,
      });
      console.log(response);
  
      if (response.status === 500) {
        console.log('Transaction added to history successfully.', response);
        setDatarows([]); // Clear the table after adding to history
        fetchKasirData(); // Refresh the table
      } else {
        console.error('Error adding transactions to history:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding transactions to history:', error);
    }
  };
  
  const fetchLatestIdTransaksi = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/kasir`);
      const dataArray = response.data.data; // Assuming dataArray is the array of objects
      
      // Extract the "No" values from each object
      const noValues = dataArray.map(item => item.No);
      // console.log(noValues); // This will output an array of "No" values
      
      if (noValues.length > 0) {
        const latestNo = Math.max(...noValues); // Get the latest "No" value
        return latestNo;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching latest idTransaksi:', error);
      return null;
    }
  };
  

  
  const fetchIdSKU = async (productName) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/idSKU/${productName}`);
      const dataArray = response.data.data; 
      const noValues = dataArray.map(item => item.idSKU);
      console.log(productName);
      
      if (noValues.length > 0) {
        const latestNo = Math.max(...noValues); // Get the latest "No" value
        return latestNo;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching latest idTransaksi:', error);
      return null;
    }
  }
  const fetchProductOptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
      const productsData = response.data.data;
      setProductOptions(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  
  const separator = (num) => {
    if (num === undefined) {
      return ''; // Return an empty string if num is undefined
    }
    
    let temp = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return temp;
  };
  
const handleProductChange = (event) => {
  const selectedProductId = event.target.value;
  setSelectedProduct(selectedProductId);

  // Update the idSKU in the transactionData state
  setTransactionData((prevData) => ({
    ...prevData,
    idSKU: selectedProductId,
  }));
};

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  
    // Find the selected product based on its idBarang
    const selectedProductOption = productOptions.find(option => option.idBarang === selectedProduct);
  
    // Calculate the new total price based on the selected product's harga (price)
    const newTotalPrice = selectedProductOption.harga * newQuantity;
    setTotalPrice(newTotalPrice);
  };
  
  

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAddProduct = async () => {
    if (selectedProduct && quantity > 0) {
      try {
        const selectedProductOption = productOptions.find(
          option => option.idBarang === selectedProduct
        );
  
        // Retrieve the oldest idSKU based on inboundDate for the selected product
        const oldestInboundSKU = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/products/oldest/${selectedProduct}`
        );
  
        if (oldestInboundSKU.data.idSKU !== null) {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/kasir`, {
            idKasir: datarows.length + 1,
            jumlah: quantity,
            idSKU: oldestInboundSKU.data.idSKU,
          });
  
          if (response.status === 200) {
            // Close the modal
            handleCloseModal();
  
            // Call fetchKasirData to update the table with the latest data
            fetchKasirData();
          } else {
            console.error('Error adding product to kasir:', response.data.error);
          }
        } else {
          console.error('No available product with inboundDate found.');
        }
      } catch (error) {
        console.error('Error adding product to kasir:', error);
      }
    }
  };
  
  
  
  
  return (
    <Box className={styles.container} position="relative">
    <div className={styles.title}>Kasir</div>

    <div className={styles.addButtonContainer}>
      <Button
        variant="contained"
        style={{
          background: 'linear-gradient(#D3EBCD, #B1E9A3)',
          color: '#000000',
          fontWeight: 'bold',
          paddingLeft: '35px',
          paddingRight: '35px',
          borderRadius: '100px',
        }}
        onClick={handleOpenModal}
      >
        + Tambah
      </Button>
    </div>

    <Box sx={{ minHeight: '40vh' }} classNames={styles.boxTable}>
      <TableContainer component={Paper} sx={{ maxHeight: '56vh', borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
        <Table stickyHeader sx={{
          minWidth: 450, "& .MuiTableCell-head": {
            backgroundColor: "#AEDBCE"
          },
        }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>No</TableCell>
              <TableCell align='center'>Kode Barang</TableCell>
              <TableCell align='center'>Nama Barang</TableCell>
              <TableCell align='center'>Harga Satuan</TableCell>
              <TableCell align='center'>Jumlah</TableCell>
              <TableCell align='center'>Harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datarows.map((row, i) => (
              <TableRow
                key={row.idKasir}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' width="20">{i + 1}</TableCell>
                <TableCell align='center' width="100">{row.Sku.skuCode}</TableCell>
                <TableCell align='center' component="th" scope="row">
                {row.Sku.product.nama}
                </TableCell>
                <TableCell align='center' width="150">
                {row.Sku.product.harga}
                </TableCell>
                <TableCell align='center' width="20">{row.jumlah}</TableCell>
                <TableCell align='center' width="150">
                  {row.Sku.product.harga * row.jumlah ? `Rp. ${separator((row.Sku.product.harga * row.jumlah).toString())}` : ''}
                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    <button className={styles.beli} onClick={handleBeliClick}>
      Beli
    </button>

    <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Tambah Produk Baru</DialogTitle>
        <DialogContent>
          <div className={styles.formContent}>
          <FormControl className={styles.namaBarang}>
            <InputLabel>Nama Barang</InputLabel>
            <Select
              value={selectedProduct}
              onChange={handleProductChange}
            >
              {productOptions.map((option) => (
                <MenuItem key={option.idBarang} value={option.idBarang}>
                  {option.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Jumlah"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />

          <TextField
            label="Harga Total"
            value={`Rp. ${separator(totalPrice)}`}
            disabled
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Batal</Button>
          <Button onClick={handleAddProduct}>Simpan</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};
