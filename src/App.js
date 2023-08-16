import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login, DaftarToko,  ProductInventory, Kasir, PengembalianBarang, History, DetailBarang } from './pages'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Layout />}>
          <Route path="product-inventory" element={<ProductInventory />} />
          <Route path="detailBarang/:idBarang" element={<DetailBarang />} /> {/* Updated the path here */}
          <Route path="kasir" element={<Kasir />} />
          <Route path="pengembalian-barang" element={<PengembalianBarang />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
