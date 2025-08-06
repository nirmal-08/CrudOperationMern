import React, { useEffect, useState } from 'react'
import './user.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:8000/api/users')
        setUsers(response.data);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/api/delete/user/${id}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== id));
        toast.success(response.data.message, { position: "top-center" })
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      })
  }


  return (
    <div className='userTable'>
      {/* path: "/addUser", */}
      <Link to="/addUser" type="button" className="btn btn-primary">
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>

    {users.length === 0 ? (
      <div className='noData'> 
      <h3>No data to display</h3>
      <p>Please add a user</p>
      </div>
    ) : (<table className='table table-bordered'>
        <thead>


          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Eamil</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.adress}</td>
                <td className='action'>
                  <Link to={`/update/${user._id}`} type="button" className="btn btn-info">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button type="button" className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>

                </td>
              </tr>
            );
          })
          }

        </tbody>
      </table>)}

      
    </div>
  )
}

export default User
