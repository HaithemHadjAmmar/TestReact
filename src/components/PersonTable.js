import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonTable() {
  const [data, setData] = useState(null); // Initialize state for data

  useEffect(() => {
    // Fetch data from backend API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setData(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function
  }, []); // Empty dependency array to run effect only once on mount

  // Render table with data
  return (
    <div>
      <h2>Liste des personnes</h2>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Date de naissance</th>
              <th>Sexe</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => (
              <tr key={person.id}>
                <td>{person.nom}</td>
                <td>{person.prénom}</td>
                <td>{person.email}</td>
                <td>{person.date_de_naissance}</td>
                <td>{person.sexe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default PersonTable;
