import { useRouter } from "next/router";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Home = () => {
    const [username, setUsername] = useState("");
    // const navigate = useNavigate();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("_username", username);
        //👇🏻 Navigates to the application
        // navigate("/app");
        router.push("/main")

    };
    return (
        <div className='home'>
            <h2>Sign in to your todo-list</h2>
            <form onSubmit={handleSubmit} className='home__form'>
                <label htmlFor='username'>Your Username</label>
                <input
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className='input'
                />
                <button>SIGN IN</button>
            </form>
        </div>
    );
};

export default Home;
