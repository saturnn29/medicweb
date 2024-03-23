import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #16a085;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 85px;
  &:hover {
    background-color: #197563;
  }
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #f39c12;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 93px;
  &:hover {
    background-color: #d35400;
  }
`;

function SearchPa({ onSearchCompleted }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/patients?PID=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for patient:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (patientId) => {
    onSearchCompleted(patientId);
};

  return (
    <SearchContainer>
      <h1>Search Patient</h1>
      <FormLabel>
        Search by ID:
        <FormInput type="text" value={searchTerm} onChange={handleChange} />
      </FormLabel>

      <SearchButton onClick={handleSearch}>Search</SearchButton>
      {searchResults.length > 0 ? (
        searchResults.map((patient) => (
          <div key={patient.PID}>
            <h2>{`${patient.FirstName} ${patient.LastName}`}</h2>
            <p>Patient ID: {patient.PID}</p>
            <p>Doctor ID: {patient.DID}</p>
            <p>Date of Birth: {patient.DoB}</p>
            <p>Gender: {patient.Gender}</p>
            <p>Address: {patient.Address}</p>
            <p>Contact Info: {patient.ContactNumber}</p>
            <p>Email:{patient.Email}</p>
            <EditButton onClick={() => handleEdit(patient.PID)}>Edit</EditButton>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </SearchContainer>
  );
}

export default SearchPa;