import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPerson } from '../reduxActions/Redux';

const PersonForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nom: '',
    prénom: '',
    date_de_naissance: '',
    sexe: '',
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(false); // Reset form error on field change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formData.nom || !formData.prénom || !formData.date_de_naissance || !formData.sexe || !formData.email || !formData.password) {
      setFormError(true); // Set form error to true
      return; // Stop form submission
    }

    try {
      // Send form data to backend API
      const response = await axios.post('http://localhost:8000/api/users', formData);
      // Dispatch action to add person to Redux store
      dispatch(addPerson(response.data));
      // Clear form data after successful submission
      setFormData({
        nom: '',
        prénom: '',
        date_de_naissance: '',
        sexe: '',
        email: '',
        password: ''
      });

      // Refresh the page to get the updated data
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className={`mb-4 p-2 rounded-md block w-full ${formError && !formData.nom && 'border-red-500'}`} />
      <input type="text" name="prénom" value={formData.prénom} onChange={handleChange} placeholder="Prénom" className={`mb-4 p-2 rounded-md block w-full ${formError && !formData.prénom && 'border-red-500'}`} />
      <input type="date" name="date_de_naissance" value={formData.date_de_naissance} onChange={handleChange} className={`mb-4 p-2 rounded-md block w-full ${formError && !formData.date_de_naissance && 'border-red-500'}`} />
      <select name="sexe" value={formData.sexe} onChange={handleChange} className={`mb-4 p-2 rounded-md block w-full ${formError && !formData.sexe && 'border-red-500'}`}>
        <option value="">Sélectionner le sexe</option>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="autre">Autre</option>
      </select>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={`mb-4 p-2 rounded-md block w-full ${formError && !formData.email && 'border-red-500'}`} />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" className={`mb-4 p-2 rounded-md block w-full ${formError && !formData.password && 'border-red-500'}`} />
      <button type="submit" className={`bg-${formError ? 'red-500' : 'green-500'} hover:bg-${formError ? 'red-600' : 'green-600'} text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>Ajouter</button>
      {formError && <p className="text-red-500 mt-2">Veuillez remplir tous les champs.</p>}
    </form>
  );
};

export default PersonForm;
