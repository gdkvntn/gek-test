import { useState } from "react";

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
    }).then((resp) => resp.json());

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
    });
  }

  async getUrl(hash) {
    const { url } = await fetch(`${this.url}/s/${hash}`, {
      method: "GET",
    });

    return url;
  }
}

const apiService = new ApiService("http://79.143.31.216");

export default function Test() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [hash, setHash] = useState("");

  return (
    <div className="App">
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <input value={hash} onChange={(e) => setHash(e.target.value)} />
      <button onClick={() => apiService.register({ username, password })}>
        Register
      </button>
      <button onClick={() => apiService.login({ username, password })}>
        Login
      </button>
      <button onClick={() => apiService.squeeze(url)}>Squeeze</button>
      <button onClick={() => apiService.statistics()}>Statistics</button>
      <button onClick={() => apiService.getUrl(hash)}>Get URL</button>
    </div>
  );
}
