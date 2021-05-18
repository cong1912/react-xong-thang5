import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Rankings = () => {
  const [rankings, setRanks] = useState([]);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    const data = axios
      .get("/rankings")
      .then(function (response) {
        // handle success
        setRanks(response.data);
        console.log(rankings);
        setReset(true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [reset]);
  return (
    <Layout>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map(({ name, revenue }, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{revenue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Rankings;
