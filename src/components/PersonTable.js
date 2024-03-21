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

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {data ? (
        <table className="min-w-full bg-white shadow-md rounded my-4 overflow-hidden mx-auto"> {/* Added mx-auto class */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Nom</th>
              <th className="py-2 px-4">Prénom</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Date de naissance</th>
              <th className="py-2 px-4">Sexe</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => (
              <tr key={person.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{person.nom}</td>
                <td className="py-2 px-4">{person.prénom}</td>
                <td className="py-2 px-4">{person.email}</td>
                <td className="py-2 px-4">{person.date_de_naissance}</td>
                <td className="py-2 px-4">{person.sexe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
}

export default PersonTable;
