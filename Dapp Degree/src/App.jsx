import { useState } from 'react';
import { Contract, BrowserProvider } from 'ethers';
import { abi, contractAddress } from './Membership.json';

function App() {
  const [output, setOutput] = useState("");
  const [queryID, setQueryID] = useState(0);
  const [Data, setData] = useState({
    id: 0,
    name: "",
    rollNumber: "",
    clubName: "",
    date: ""
  });

  const provider = new BrowserProvider(window.ethereum);

  // Connect to MetaMask
  const connectMetamask = async () => {
    const signer = await provider.getSigner();
    alert(`Connected to Metamask with address: ${signer.address}`);
  };

  // Reset input fields
  const resetData = () => {
    setData({
      id: 0,
      name: "",
      rollNumber: "",
      clubName: "",
      date: ""
    });
  };

  // Issue a new membership card
  const handleSubmit = async (event) => {
    event.preventDefault();

    const signer = await provider.getSigner();
    const instance = new Contract(contractAddress, abi, signer);

    try {
      const trx = await instance.issueMembership(
        Data.id,
        Data.name,
        Data.rollNumber,
        Data.clubName,
        Data.date
      );
      console.log('Transaction Hash:', trx.hash);
      alert('Membership Card Issued Successfully!');
    } catch (error) {
      console.error('Error issuing membership:', error);
      alert('Error issuing membership. Check the console for details.');
    }
  };

  // Fetch membership details by ID
  const getMembership = async () => {
    const signer = await provider.getSigner();
    const instance = new Contract(contractAddress, abi, signer);

    try {
      const result = await instance.memberships(queryID);
      if (result) {
        setOutput(
          `Name: ${result[0]}, Roll Number: ${result[1]}, Club Name: ${result[2]}, Date: ${result[3]}`
        );
      } else {
        setOutput("Membership not found.");
      }
    } catch (error) {
      console.error('Error fetching membership:', error);
      alert('Error fetching membership. Check the console for details.');
    }
  };

  return (
    <div className="container">
      <div className="sidebar left">
        <img src="/club1.png" alt="Club 1 Logo" />
        <img src="/club8.png" alt="Club 2 Logo" />
        <img src="/club3.png" alt="Club 3 Logo" />
        <img src="/club4.png" alt="Club 4 Logo" />
      </div>

      <main>
        <h1>Membership Card DApp</h1>
        <button className="connect one" onClick={connectMetamask}>
          Connect to MetaMask
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input
              type="number"
              value={Data.id}
              onChange={(e) => setData({ ...Data, id: e.target.value })}
            />
            <br />
            <label>Name:</label>
            <input
              type="text"
              value={Data.name}
              onChange={(e) => setData({ ...Data, name: e.target.value })}
            />
            <br />
            <label>Roll Number:</label>
            <input
              type="text"
              value={Data.rollNumber}
              onChange={(e) => setData({ ...Data, rollNumber: e.target.value })}
            />
            <br />
            <label>Club Name:</label>
            <input
              type="text"
              value={Data.clubName}
              onChange={(e) => setData({ ...Data, clubName: e.target.value })}
            />
            <br />
            <label>Date:</label>
            <input
              type="date"
              value={Data.date}
              onChange={(e) => setData({ ...Data, date: e.target.value })}
            />
          </div>
          <div>
            <button class="inside" type="submit">Issue Membership</button>
            <button class="inside" type="button" onClick={resetData}>
              Reset
            </button>
          </div>
        </form>
        <div>
          <label className='ID'>ID:</label>
          <input
            type="number"
            value={queryID}
            onChange={(e) => setQueryID(e.target.value)}
          />
        </div>
        <button className="one"onClick={getMembership} >Get Membership Details</button>
        <p>{output}</p>
      </main>

      <div className="sidebar right">
        <img src="/club5.png" alt="Club 5 Logo" />
        <img src="/club6.png" alt="Club 6 Logo" />
        <img src="/club7.png" alt="Club 7 Logo" />
        <img src="/club2.png" alt="Club 2 Logo" />
      </div>
    </div>
  );
}

export default App;
