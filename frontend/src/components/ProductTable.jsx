import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, CircularProgress, Typography, Box
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import RefreshIcon from "@mui/icons-material/Refresh";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
      setError("");
    } catch (error) {
      setError("Failed to fetch products.");
    }
    setLoading(false);
  };

  const syncProducts = async () => {
    setSyncing(true);
    try {
      await axios.post(`${API_BASE_URL}/sync-shopify`);
      alert("Products synced successfully!");
      await fetchProducts();
    } catch (error) {
      alert("Sync failed. Try again.");
    }
    setSyncing(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        padding: 3,
      }}
    >
      <Paper elevation={5} sx={{ padding: 3, width: "90vw", maxWidth: "1200px" }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          🛒 Prodify
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={fetchProducts}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SyncIcon />}
            onClick={syncProducts}
            disabled={syncing}
          >
            {syncing ? "Syncing..." : "Sync Shopify"}
          </Button>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {!loading && products.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!loading && products.length === 0 && (
          <Typography align="center" color="textSecondary">
            No products found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ProductTable;
