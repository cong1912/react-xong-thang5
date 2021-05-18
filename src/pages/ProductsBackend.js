import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { getProducts } from "../features/productsSlice";
import Products from "./Products";

const ProductsBackend = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    const arr = [];
    if (filters) {
      arr.push(`s=${filters}`);
    }
    if (sort) {
      arr.push(`sort=${sort}`);
    }
    if (page) {
      arr.push(`page=${page}`);
    }
    axios
      .get(`products/backend?${arr.join("&")}`)
      .then(function (response) {
        setProducts(
          page === 1 ? response.data.data : [...products, ...response.data.data]
        );
        setLastPage(response.data.meta.last_page);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [filters, sort, page]);
  return (
    <Layout>
      <Products
        page={page}
        setPage={setPage}
        products={products}
        filters={filters}
        sort={sort}
        setSort={setSort}
        setFilters={setFilters}
        lastPage={lastPage}
      />
    </Layout>
  );
};

export default ProductsBackend;
