import React, { useState, useEffect } from "react";

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("accounts")) || [];
    setAccounts(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  // Create account
  const createAccount = () => {
    if (!name || !balance) return alert("Enter all fields");
    const newAccount = {
      id: Date.now(),
      name,
      balance: parseFloat(balance),
    };
    setAccounts([...accounts, newAccount]);
    setName("");
    setBalance("");
  };

  // Deposit
  const deposit = () => {
    if (!selectedAccount || !amount) return alert("Select account & enter amount");
    setAccounts(
      accounts.map((acc) =>
        acc.id === selectedAccount
          ? { ...acc, balance: acc.balance + parseFloat(amount) }
          : acc
      )
    );
    setAmount("");
  };

  // Withdraw
  const withdraw = () => {
    if (!selectedAccount || !amount) return alert("Select account & enter amount");
    setAccounts(
      accounts.map((acc) =>
        acc.id === selectedAccount
          ? acc.balance >= parseFloat(amount)
            ? { ...acc, balance: acc.balance - parseFloat(amount) }
            : (alert("Insufficient balance"), acc)
          : acc
      )
    );
    setAmount("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🏦 Bank Management System</h1>

      {/* Create account */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="border p-2 m-2"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          className="border p-2 m-2"
          onChange={(e) => setBalance(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={createAccount}
        >
          Create
        </button>
      </div>

      {/* Accounts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <select
          className="border p-2 m-2"
          onChange={(e) => setSelectedAccount(Number(e.target.value))}
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} - Balance: ₹{acc.balance}
            </option>
          ))}
        </select>
      </div>

      {/* Deposit & Withdraw */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Transaction</h2>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          className="border p-2 m-2"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded m-1"
          onClick={deposit}
        >
          Deposit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded m-1"
          onClick={withdraw}
        >
          Withdraw
        </button>
      </div>

      {/* Account List */}
      <div>
        <h2 className="text-xl font-semibold">All Accounts</h2>
        <ul className="list-disc text-left">
          {accounts.map((acc) => (
            <li key={acc.id}>
              {acc.name} → ₹{acc.balance}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
