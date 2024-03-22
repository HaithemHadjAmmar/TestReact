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
  const [formErrors, setFormErrors] = useState({
    nom: false,
    prénom: false,
    date_de_naissance: false,
    sexe: false,
    email: false,
    password: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false }); // Reset form error on field change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for form errors
    const errors = {};
    let hasErrors = false;
    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = true;
        hasErrors = true;
      }
    }
    if (hasErrors) {
      setFormErrors(errors);
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
      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className={`mb-4 p-2 rounded-md block w-full ${formErrors.nom && 'border-red-500'}`} />
      {formErrors.nom && <p className="text-red-500" style={{color: 'red'}}>Veuillez saisir le nom.</p>}
      <input type="text" name="prénom" value={formData.prénom} onChange={handleChange} placeholder="Prénom" className={`mb-4 p-2 rounded-md block w-full ${formErrors.prénom && 'border-red-500'}`} />
      {formErrors.prénom && <p className="text-red-500" style={{color: 'red'}}>Veuillez saisir le prénom.</p>}
      <input type="date" name="date_de_naissance" value={formData.date_de_naissance} onChange={handleChange} className={`mb-4 p-2 rounded-md block w-full ${formErrors.date_de_naissance && 'border-red-500'}`} />
      {formErrors.date_de_naissance && <p className="text-red-500" style={{color: 'red'}}>Veuillez saisir la date de naissance.</p>}
      <select name="sexe" value={formData.sexe} onChange={handleChange} className={`mb-4 p-2 rounded-md block w-full ${formErrors.sexe && 'border-red-500'}`}>
        <option value="" >Sélectionner le sexe</option>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="autre">Autre</option>
      </select>
      {formErrors.sexe && <p className="text-red-500" style={{color: 'red'}}>Veuillez sélectionner le sexe.</p>}
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={`mb-4 p-2 rounded-md block w-full ${formErrors.email && 'border-red-500'}`} />
      {formErrors.email && <p className="text-red-500" style={{color: 'red'}}>Veuillez saisir une adresse email valide.</p>}
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" className={`mb-4 p-2 rounded-md block w-full ${formErrors.password && 'border-red-500'}`} />
      {formErrors.password && <p className="text-red-500" style={{color: 'red'}}>Le mot de passe doit contenir au moins 6 caractères.</p>}
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter</button>
    </form>
  );
};

export default PersonForm;
