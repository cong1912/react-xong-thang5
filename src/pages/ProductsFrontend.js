import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "./Products";

const ProductsFrontend = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const perPage = 9;
  useEffect(() => {
    axios
      .get(`products/frontend`)
      .then(function (response) {
        setFilteredProducts(response.data);
        setAllProducts(response.data);
        setLastPage(Math.ceil(response.data.length / perPage));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    let products = allProducts.filter(
      (p) =>
        p.title.toLowerCase().indexOf(filters.toLowerCase()) >= 0 ||
        p.description.toLowerCase().indexOf(filters.toLowerCase()) >= 0
    );
    if (sort === "asc") {
      products.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    } else if (sort === "desc") {
      products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
    }
    setLastPage(Math.ceil(products.length / perPage));
    setFilteredProducts(products.slice(0, page * perPage));
  }, [filters, sort, filteredProducts]);
  return (
    <Layout>
      <Products
        products={filteredProducts}
        filters={filters}
        sort={sort}
        setSort={setSort}
        setFilters={setFilters}
        page={page}
        setPage={setPage}
        lastPage={lastPage}
      />
    </Layout>
  );
};

export default ProductsFrontend;
