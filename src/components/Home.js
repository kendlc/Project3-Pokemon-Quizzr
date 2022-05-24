import React from "react";
import Authentication from "./Authentication";

// import { signInWithGoogle } from "./Firebase-config";

const Home = () => {

    return(
        <div>
            {/* <button onClick={signInWithGoogle}> Sign In With Google</button>
            <h1>{ localStorage.getItem("name") }</h1>
            <h1>{ localStorage.getItem("email") }</h1>
            <img src={localStorage.getItem("profilePic")} /> */}
            
            <Authentication />
        </div>
    );
};

export default Home; 