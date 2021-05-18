import axios from "axios";
import { set } from "js-cookie";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    const data = axios
      .get("/stats")
      .then(function (response) {
        // handle success
        setStats(response.data);
        console.log(stats);
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
            {stats.map(({ code, revenue }, index) => {
              return (
                <tr key={index}>
                  <td>{`http://localhost:5000/${code}`}</td>
                  <td>{code}</td>
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

export default Stats;
