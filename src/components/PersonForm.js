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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" />
      <input type="text" name="prénom" value={formData.prénom} onChange={handleChange} placeholder="Prénom" />
      <input type="date" name="date_de_naissance" value={formData.date_de_naissance} onChange={handleChange} />
      <select name="sexe" value={formData.sexe} onChange={handleChange}>
        <option value="">Sélectionner le sexe</option>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="autre">Autre</option>
      </select>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default PersonForm;
