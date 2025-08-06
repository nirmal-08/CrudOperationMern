import React from "react";
import "./addUser.css";
import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddUser() {

    const users = {
        name: "",
        email: "",
        adress: "",
    }

    const [user, setUser] = useState(users);

    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        // console.log(user)

        setUser({ ...user, [name]: value })
    }


    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/user', user)
            .then((response) => {
                toast.success(response.data.message, {position: "top-center"});

                navigate("/");

            }).catch((error) => {
                console.error("Error adding user:", error);
                // setUser(users); // Reset form after submission
            })
    }

    return (
        <div className="addUser">
            <Link to="/" type="button" className="btn btn-secondary">
                Back
            </Link>


            <h3>Add New User</h3>
            <form action="" className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name"
                        onChange={inputHandler}
                        name="name" autoComplete="off" placeholder="Enter your name" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email"
                        onChange={inputHandler}
                        name="email" autoComplete="off" placeholder="Enter your email" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="adress">Adress:</label>
                    <input type="text" id="adress"
                        onChange={inputHandler}
                        name="adress" autoComplete="off" placeholder="Enter your adress" />
                </div>
                <div className="inputGroup">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}