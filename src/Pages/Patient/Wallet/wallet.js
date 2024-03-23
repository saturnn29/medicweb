import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Web3 from "web3";
import PaymentContractABI from '../../../contract/build/contracts/PaymentContract.json';
import axios from "axios";
import "./wallet.scss";

function Wallet() {
  const [bills, setBills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardBalance, setCardBalance] = useState(0);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [showMetaMaskButton, setShowMetaMaskButton] = useState(false);
  const [showConnectButton, setShowConnectButton] = useState(true); 
  const [transactionHistory, setTransactionHistory] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const userId = sessionStorage.getItem('userId');

  
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(accounts);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = PaymentContractABI.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            PaymentContractABI.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(contractInstance);

          // Fetch initial account balance
          accountChanged(accounts[0]);

          // Set up interval to periodically fetch balance
          // const intervalId = setInterval(() => {
          //   getAccountBalance(defaultAccount);
          // }, 10000); // Refresh balance every 10 seconds

          // // Clean up interval on component unmount
          // return () => clearInterval(intervalId);
        } catch (error) {
          console.error('Error initializing Web3:', error);
          setErrorMessage('Error initializing Web3. Please check your MetaMask connection.');
        }
      } else {
        console.error('Web3 not detected');
        setErrorMessage('Please install MetaMask to use this application.');
      }
    }



  // Function to handle deposit funds
  const depositFunds = async (fromAddress, toAddress) => {
    try {
      const amount = cardBalance; // Amount in Wei (1 Ether)
      const gasPrice = await web3.eth.getGasPrice();
      const result = await contract.methods.depositFunds().send({
        to: toAddress,
        from: fromAddress,
        value: amount.toString(),
        gasPrice: gasPrice.toString()
      });
      console.log('Deposit successful:', result);
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };
  

  useEffect(() => {
    
    const fetchBills = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/billcreation`);
            const unpaidBills = response.data.filter(bill => bill.payment_confirmation === 0);
            console.log(unpaidBills);
            console.log(userId);
            setBills(unpaidBills);
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
    };

    // Fetch unpaid bills initially
    fetchBills();

    // Set up interval to periodically fetch updated list of unpaid bills
    const intervalId = setInterval(() => {
        fetchBills();
    }, 5000); 

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
}, []);



  const connectToDigitalWallet = () => {
    setShowCreditCardForm(!showCreditCardForm);
    setShowConnectButton(false); // Hide "Connect to Digital Wallet" button
  };
  

  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChanged(result[0]);
          setShowMetaMaskButton(false); 
          // Call initWeb3 after connecting to MetaMask
          initWeb3();
        });            
      } else {
        setErrorMessage("Please install MetaMask first!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setErrorMessage("An error occurred while connecting to MetaMask. Please try again.");
    }
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/billcreation');
            const filteredTransactions = response.data.filter(transaction =>  transaction.payment_confirmation === 1);
            console.log(filteredTransactions);
            console.log("Transaction History:", transactionHistory);
            setTransactionHistory(filteredTransactions);
        } catch (error) {
            console.error('Error fetching transaction history:', error);
        }
    };

    // Fetch transaction history initially
    fetchTransactionHistory();

    // Set up interval to periodically fetch updated transaction history
    const intervalId = setInterval(() => {
        fetchTransactionHistory();
    }, 10000); 

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
}, []);




const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getAccountBalance(accountName);
}

const getAccountBalance = (account) => {
    window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
    .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
        setShowCardInfo(true); 
    })
    .catch(error => {
        setErrorMessage(error.message);
    });
};

  const handleCreditCardSubmit = (event) => {
    event.preventDefault();

    const cardNumber = event.target[1].value; 
    const expirationDate = event.target[2].value; 
    const cvv = event.target[3].value; 

    const enteredCardHolderName = event.target[0].value;
    setCardHolderName(enteredCardHolderName);
    setCardBalance(100000000000000000); 

    setShowCreditCardForm(false);
    setShowCardInfo(true);
    setShowMetaMaskButton(true);
  };

  const cancelCardConnection = () => {
    setShowCreditCardForm(false);
    setShowCardInfo(false);
    setShowMetaMaskButton(false);
    setShowConnectButton(true); 
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
  };

  const handlePayButtonClick = async (bill) => {
    try {
        // Get the amount to be paid (total_cost of the bill)
        const amountToPay = bill.total_cost;

        // Check if MetaMask is installed and connected
        if (!window.ethereum) {
            throw new Error('MetaMask not detected');
        }

        // Prompt user to confirm transaction
        const transactionHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                to: "0x2B354ADEBbF90f772974a166b5242236CEeBdf33",
                from: "0x0cc25A9f28436AAB459Ad0d811d3b60F55d6886D",
                value: amountToPay.toString(),
                gasPrice: '2500',
                gas: '21000'
            }],
        });

        // Check if transactionHash is returned
        if (!transactionHash) {
            throw new Error('Transaction canceled or failed');
        }

        // If transactionHash is successfully obtained, proceed to update payment confirmation
        const response = await axios.put(`http://localhost:8080/billcreation/${bill.bill_id}`, { payment_confirmation: 1 });

        // Handle response if needed
        console.log(response);

        const updatedBills = bills.filter(item => item.bill_id !== bill.bill_id);
        setBills(updatedBills);

    } catch (error) {

        if (error.message === 'MetaMask not detected') {
            setErrorMessage('MetaMask not detected. Please install MetaMask to make payments.');
        } else if (error.message === 'Transaction canceled or failed') {
            console.log('Transaction canceled or failed');

        } else {
            console.error('Error paying bill:', error);
            // Handle other errors, e.g., show error message to the user
        }
    }
};

  
  return (
    <div>
      <h1>Payment page</h1>
      {showCardInfo && (
        <div className="card-info-box">
          <span className="card-holder">Account Address: {defaultAccount}</span><br />
          <span className="balance">Account Balance: {userBalance} ETH</span>
          <br/>
          <button onClick={() => depositFunds("0x374CaBA94e5c0A9ca73dD50e6ADAedA0344Fae3A", "0xe228f15832713Fa89904402e7b55c571e1e251b0")}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(22, 160, 133)',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
        }}
          >Deposit</button>

        </div>
      )}
      {showConnectButton && ( // Conditional rendering for "Connect to Digital Wallet" button
        <button onClick={showCreditCardForm ? cancelCardConnection : connectToDigitalWallet} className="custom-button primary">
          {showCreditCardForm ? "Cancel" : "Connect to Digital Wallet"}
        </button>
      )}

      {/* Connect to MetaMask button */}
      {showMetaMaskButton && (
        <button className="custom-button secondary" onClick={connectToMetaMask}>
          Connect to MetaMask
        </button>
      )}

      {/* Credit card input form */}
      {showCreditCardForm && (
        <div className="credit-card-form-container">
          
          <form onSubmit={handleCreditCardSubmit}>
            <input type="text" placeholder="Card holder's name" required />
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="Expiration Date" required />
            <input type="text" placeholder="CVV" required />
            <input type="submit" value="Submit" className="custom-button primary" />
          </form>
        </div>
      )}
      
      <div className="appointment-page" style={{ marginTop: '50px'}}>
      <h2>Bill Payment</h2>
        <table className="custom-table">
          <thead>
            <tr className="appointmenthead">
              <th>Bill ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Doctor's Name</th>
              <th>Patient's Name</th>
              <th>Bill Date</th>
              <th>Bill Cost</th>
              <th>Bill Description</th>
              <th>Payment Confirmation</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 && (
              bills.map(bill => {
                if (bill.PID === parseInt(userId) && bill.payment_confirmation === 0) {
                  return (
                      <tr key={bill.PID}>
                        <td>{bill.bill_id}</td>
                        <td>{bill.PID}</td>
                        <td>{bill.DID}</td>
                        <td>{bill.Doctors_name}</td>
                        <td>{bill.Patients_name}</td>
                        <td>{bill.bill_date}</td>
                        <td>{bill.total_cost}</td>
                        <td>{bill.bill_desc}</td>
                        {/* Render Pay button */}
                        <td>
                          <button onClick={() => handlePayButtonClick(bill)}
                          style={{
                            display: 'block',
                            margin: 'auto',
                            padding: '5px 10px',
                            backgroundColor: 'rgba(22, 160, 133)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                        }}
                          >Pay</button>
                        </td>
                      </tr>
                  );
                } else {
                  return null; 
                }
              })
            )}
          </tbody>
        </table>
      </div>
      
      <div className="appointment-page" style={{ marginTop: '50px'}}>
      <h2>Transaction History</h2>
        <table className="custom-table">
          <thead>
            <tr className="appointmenthead">
              <th>Transaction ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>          
              <th>Doctor's Name</th>
              <th>Cost</th>
              <th>Transaction Date</th>
              <th>Transaction Description</th>
              <th>Transaction Status</th>
            </tr>
          </thead>
          <tbody>
          {transactionHistory.length > 0 && (
            transactionHistory.map(transaction => {
              if (transaction.PID === parseInt(userId)) {
                return (
                  <tr key={transaction.bill_id}>
                      <td>{transaction.bill_id}</td>
                      <td>{transaction.PID}</td>
                      <td>{transaction.DID}</td>
                      <td>{transaction.Doctors_name}</td>
                      <td>{transaction.total_cost}</td>
                      <td>{transaction.bill_date}</td>
                      <td>{transaction.bill_desc}</td>
                      {/* Add a column to display transaction status */}
                      <td><strong>{transaction.payment_confirmation === 1 ? 'Paid' : 'Unpaid'}</strong></td>
                  </tr>
                );
              } else {
                return null; 
              }
            })
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default Wallet;
