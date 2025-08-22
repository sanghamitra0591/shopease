import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const categories = ['Fashion', 'Electronics', 'Books', 'Home'];
const locations = ['New York', 'Mumbai', 'London', 'Berlin'];

const FilterPanel = ({ filters, setFilters }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  // Sync search box if filters change externally
  useEffect(() => {
    setLocalSearch(filters.search || '');
  }, [filters.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: localSearch }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      subcategory: '',
      location: '',
      priceMin: '',
      priceMax: '',
      search: '',
    });
    setLocalSearch('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Subcategory"
            name="subcategory"
            value={filters.subcategory}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} sm={3} md={1.5}>
          <TextField
            label="Min Price"
            name="priceMin"
            type="number"
            value={filters.priceMin}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={3} md={1.5}>
          <TextField
            label="Max Price"
            name="priceMax"
            type="number"
            value={filters.priceMax}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search Products"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
          >
            Search
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearFilters}
            fullWidth
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterPanel;
