import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Web3 from "web3";
import PaymentContractABI from '../../../contract/build/contracts/PaymentContract.json';
import BillContractABI from '../../../contract/build/contracts/BillContract.json';
import axios from "axios";
import withAuth from "../../withAuth.js";
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
  const [billContract, setBillContract] = useState(null);
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
          const deployedBillContract = BillContractABI.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            PaymentContractABI.abi,
            deployedNetwork && deployedNetwork.address,
          );
          const billContractInstance = new web3Instance.eth.Contract(
            BillContractABI.abi,
            deployedBillContract && deployedBillContract.address,
          );
          setBillContract(billContractInstance);
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
      
      const result = await contract.methods.depositFunds().send({
        to: toAddress,
        from: fromAddress,
        value: amount.toString(),
        gasPrice: '25000'
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
                to: "0xf547bE804569536B0F4e6dd662ef3215d654A7C6",
                from: defaultAccount,
                value: amountToPay.toString(),
                gasPrice: '250000',
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

        const addNewBill = async (bill) => {
          console.log('Adding new bill...');
          
          const checkconf = !bill.payment_confirmation;

          try {
              // Call the addBill function from the BillContract
              const transaction = await billContract.methods.addBill(
                  bill.bill_id,
                  bill.PID,
                  bill.DID,
                  bill.Doctors_name,
                  bill.Patients_name,
                  bill.bill_date.toString(),
                  bill.total_cost,
                  bill.bill_desc,
                  checkconf
              ).send({ from: defaultAccount, gasPrice: '2500' });
      
              // Log the transaction hash
              console.log('Transaction Hash:', transaction.transactionHash);
              
              // If successful, you might want to update your local state or UI accordingly
              // For example, you can fetch updated bill data or display a success message
          } catch (error) {
              console.error('Error adding new bill:', error);
              // Handle errors, such as displaying an error message to the user
          }
      };

      addNewBill(bill)
      checkAllBillInfo()

    
  
// Function to check all bill info
async function checkAllBillInfo() {
  try {
      // Get the total number of bills
      const billCount = await billContract.methods.getBillCount().call();

      // Loop through each bill
      for (let i = 0; i < billCount; i++) {
          // Call the getBill function from the smart contract for each index
          const result = await billContract.methods.getBill(i).call();
          
          // Parse the returned values
          const billId = result[0];
          const patientId = result[1];
          const doctorId = result[2];
          const doctorName = result[3];
          const patientName = result[4];
          const billDate = result[5];
          const totalCost = result[6];
          const billDescription = result[7];
          const paymentConfirmation = result[8];

          // Display or process the bill information as needed
          console.log("Bill Info for Bill ID", billId, ":");
          console.log("Patient ID:", patientId);
          console.log("Doctor ID:", doctorId);
          console.log("Doctor Name:", doctorName);
          console.log("Patient Name:", patientName);
          console.log("Bill Date:", billDate);
          console.log("Total Cost:", totalCost);
          console.log("Bill Description:", billDescription);
          console.log("Payment Confirmation:", paymentConfirmation);
          console.log("--------------------------------------");
      }
  } catch (error) {
      console.error("Error retrieving bill info:", error);
  }
}

// Example usage: Check all bill info


      // Usage

      
     

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
          <button onClick={() => depositFunds("0xf547bE804569536B0F4e6dd662ef3215d654A7C6", defaultAccount)}
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

export default withAuth(Wallet, 'patient');