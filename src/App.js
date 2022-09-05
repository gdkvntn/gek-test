import Register from "./components/Register";
import styles from "./app.module.css";
import Login from "./components/Login";
import Main from "./components/Main";
import { useState } from "react";
import Pagination from "./components/Pagination";

let stats = [];

class ApiService {
  constructor(url) {
    this.url = url;
  }

  registrate({ username, password }) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return fetch(`${this.url}/register?${params.toString()}`, {
      headers: {
        Accept: "application/json",
      },
      method: "POST",
    });
  }

  async login({ username, password }) {
    const params = new FormData();
    params.append("grant_type", "");
    params.append("username", username);
    params.append("password", password);
    params.append("scope", "");
    params.append("client_id", "");
    params.append("client_secret", "");
    const { access_token } = await fetch(`${this.url}/login`, {
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      body: params,
    }).then((resp) => {
      if (resp.ok) {
        resp.json();

        this.statistics();
      } else {
        resp.json();
        alert("you are not logged in or the data you entered is incorrect");
      }
    });

    this.accessToken = access_token;
  }

  squeeze(link) {
    const params = new URLSearchParams();
    params.set("link", link);

    return fetch(`${this.url}/squeeze?${params.toString()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  statistics() {
    return fetch(`${this.url}/statistics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => (stats = data));
  }

  async getUrl(hash) {
    // const { url } = await fetch(`${this.url}/s/${hash}`, {
    //   method: "GET",
    // });

    // blocks CORS

    alert(`${this.url}/s/${hash}`);
  }
}

const apiService = new ApiService("http://79.143.31.216");

function App() {
  const [statsState, setStatsState] = useState(stats);
  const [url, setUrl] = useState("");
  const [hash, setHash] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [PerPage] = useState(10);
  const [Filter, setFilter] = useState(false);

  const lastStatsInd = currentPage * PerPage;
  const firstStatsInd = lastStatsInd - PerPage;
  const currentStats = statsState.slice(firstStatsInd, lastStatsInd);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function sortData(field) {
    const copyData = statsState.concat();
    if (Filter) {
      copyData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    } else {
      copyData.sort((a, b) => (a[field] < b[field] ? 1 : -1));
    }

    setFilter(!Filter);
    setStatsState(copyData);
    console.log(Filter);
  }

  return (
    <div className={styles.App}>
      <Register apiService={apiService} />
      <Login apiService={apiService} />
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={() => apiService.squeeze(url)}>Squeeze</button>
      <input value={hash} onChange={(e) => setHash(e.target.value)} />
      <button onClick={() => apiService.getUrl(hash)}>Get URL</button>

      <button onClick={() => setStatsState(stats)}>Stats</button>
      <Main apiService={apiService} stats={currentStats} sortData={sortData} />
      <Pagination
        PerPage={PerPage}
        totalStats={statsState.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
