import { useState } from "react";
import "./App.css";
import abi from "../abi.js";
import { ethers } from "ethers";

// 0xD6159A349FDD9d246826E3c46e18ECCBafF194B6
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xD6159A349FDD9d246826E3c46e18ECCBafF194B6";
      const contractABI = abi.abi;

      const { ethereum } = window;

      const account = await ethereum.request({ method: "eth_requestAccounts" });

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
      }

      setState({ provider, signer, contract });
    };

    template();

    const socket = io("http://localhost:3000"); // Backend server URL

    // Listen for connection
    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
    });

    // Listen for messages from the server
    socket.on("response", (data) => {
      console.log("Message from server:", data.message);
      setMessages((prev) => [...prev, data.message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <br />
          <h3>Upload any file</h3>
          <br />
          <div>
            <div className="form-group">
              <label className="custom-file text-left">
                <input type="file" id="file" className="custom-file-input" />
                <span className="custom-file-label">Choose file</span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="owner">Enter owner name</label>
              <input type="text" className="form-control" id="owner" />
            </div>
            <button onClick={submit} className="btn btn-primary">
              Submit
            </button>
            <button onClick={getInfo} className="btn btn-primary">
              Get Info
            </button>
            <br />
            <br />
            <div className="alert alert-info" role="alert" id="message">
              You can either submit file's details or get information about it.
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <br />
          <h3>Live Transactions Mined</h3>
          <br />
          <ol id="events_list">No Transaction Found</ol>
        </div>
      </div>
    </div>
  );
}

export default App;
