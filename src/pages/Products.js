import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../features/productsSlice";

const Products = ({
  products,
  filters,
  setFilters,
  sort,
  setSort,
  page,
  setPage,
  lastPage,
}) => {
  const search = (s) => {
    setFilters(s);
    setPage = 1;
  };
  const load = () => {
    setPage(page + 1);
  };
  const setsort = (sort) => {
    setPage(1);
    setSort(sort);
  };
  const [selected, setSelected] = useState([]);
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: "",
  });
  let button;
  if (page != lastPage) {
    button = (
      <div class="d-flex justify-content-center mt-4">
        <button class="btn btn-primary" onClick={load}>
          Load more
        </button>
      </div>
    );
  }
  const select = (id) => {
    if (selected.some((s) => s == id)) {
      setSelected(selected.filter((s) => s != id));
      return;
    }
    setSelected([...selected, id]);
    console.log(selected);
  };
  const generate = () => {
    axios
      .post("links", {
        products: selected,
      })
      .then(function (response) {
        setNotify({
          show: true,
          error: false,
          message: `Link generated: http://localhost:5000/${response.data.code}`,
        });
      })
      .catch(function (error) {
        setNotify({
          show: true,
          error: true,
          message: "you should be logged in to generate a link",
        });
      })
      .finally(function () {
        setTimeout(() => {
          setNotify({
            show: false,
            error: false,
            message: "",
          });
        }, 3000);
      });
  };
  let generateButton, info;
  if (selected.length > 0) {
    generateButton = (
      <div className="input-group-append">
        <button className="btn btn-info" onClick={generate}>
          Generate Link
        </button>
      </div>
    );
  }
  if (notify.show) {
    info = (
      <div className="col-md-12 mb-4">
        <div
          className={notify.error ? "alert alert-danger" : "alert alert-info"}
          role="alert"
        >
          {notify.message}
        </div>
      </div>
    );
  }
  return (
    <>
      {info}
      <div className="col-md-12 mb-4 input-group">
        <input
          type="text"
          class="form-control"
          placeholder="search"
          onChange={(e) => search(e.target.value)}
        />
        {generateButton}
        <div className="input-group-append">
          <select
            className="form-select"
            onChange={(e) => setsort(e.target.value)}
          >
            <option>Select</option>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
          </select>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map((product) => {
          return (
            <div class="col" key={product.id}>
              <div
                class={
                  selected.some((s) => s == product.id)
                    ? "card shadow-sm selected"
                    : "card shadow-sm"
                }
              >
                <img src={product.image} height={200} />

                <div class="card-body">
                  <p class="card-text">{product.title}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        onClick={() => select(product.id)}
                      >
                        {selected.some((s) => s == product.id)
                          ? "-unadd"
                          : "+add"}
                      </button>
                    </div>
                    <small class="text-muted">${product.price}</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {button}
    </>
  );
};

export default Products;
