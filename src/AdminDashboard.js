import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './FirebaseConfig'; // Import Firebase Firestore instance
import { MdDelete } from 'react-icons/md';
import './AdminDashboard.css'; // Import CSS file for styling

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndShelters = async () => {
      try {
        // Retrieve users from Firestore
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);

        // Retrieve shelters from Firestore
        const sheltersSnapshot = await getDocs(collection(db, 'shelters'));
        const sheltersData = sheltersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShelters(sheltersData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUsersAndShelters();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteShelter = async (shelterId) => {
    try {
      await deleteDoc(doc(db, 'shelters', shelterId));
      setShelters(prevShelters => prevShelters.filter(shelter => shelter.id !== shelterId));
    } catch (error) {
      console.error('Error deleting shelter:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="section">
        <h2 className="section-title">Users:</h2>
        <ul className="list">
          {users.map((user, index) => (
            <li key={index} className="list-item">
              <span className="user-details">
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span className="user-email">{user.email}</span>
                <span className="user-mobile">{user.mobileNumber}</span>
              </span>
              <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                <MdDelete /> Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="section">
        <h2 className="section-title">Shelters:</h2>
        <ul className="list">
          {shelters.map((shelter, index) => (
            <li key={index} className="list-item">
              <span className="shelter-details">
                <span className="shelter-name">{shelter.shelterName}</span>
                <span className="shelter-email">{shelter.email}</span>
                <span className="shelter-mobile">{shelter.mobileNumber}</span>
              </span>
              <button className="delete-button" onClick={() => handleDeleteShelter(shelter.id)}>
                <MdDelete /> Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
