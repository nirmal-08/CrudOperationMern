import React from "react";
import "./update.css";
import { Link , useNavigate, useParams} from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Update() {

    const users = {
        name: "",
        email: "",
        adress: "",
    }

    const [user, setUser] = useState(users);

    const navigate = useNavigate();
    const {id} =useParams();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        // console.log(user)

        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        })
    },[id])


    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/user/${id}`, user)
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


            <h3>Update User</h3>
            <form action="" className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name"
                        onChange={inputHandler}
                        name="name" autoComplete="off" placeholder="Enter your name" value={user.name} />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email"
                        onChange={inputHandler}
                        name="email" autoComplete="off" placeholder="Enter your email" value={user.email} />
                </div>
                <div className="inputGroup">
                    <label htmlFor="adress">Adress:</label>
                    <input type="text" id="adress"
                        onChange={inputHandler}
                        name="adress" autoComplete="off" placeholder="Enter your adress" value={user.adress} />
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