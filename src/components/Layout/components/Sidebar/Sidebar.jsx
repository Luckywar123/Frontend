import * as React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../../../img/Logo.svg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ApprovalIcon from '@mui/icons-material/Approval';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import styles from "./style.module.css";

export const Sidebar = () => {
  return (
    <div className={styles.side}>
      <img src={LogoImage} alt='Logo' className={styles.imgLogo} />
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding className={styles.listButton}>
            <ListItemButton component={Link} to="/product-inventory">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Daftar Barang" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={styles.listButton}>
            <ListItemButton component={Link} to="/pengembalian-barang">
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Pengembalian Produk" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={styles.listButton}>
            <ListItemButton component={Link} to="/history">
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={styles.listButton}>
            <ListItemButton component={Link} to="/kasir">
              <ListItemIcon>
                <LocalAtmIcon /> {/* Use LocalAtmIcon for the "Kasir" icon */}
              </ListItemIcon>
              <ListItemText primary="Kasir" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={styles.listButtonLogin}>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </div>
  );
}
