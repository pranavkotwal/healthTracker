import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get(
        "http://localhost:3000/v1/auth/user",
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user.name);
      return status
        ? toast(`Hello ${user.name}`, {
            position: "top-right",
          })
        : toast('You are not logged in',{
            position:"top-right"
        });
    } catch (error) {
        console.error("Error:", error);

        navigate("/login");
        
      }
    }
      
    verifyCookie();
  }, [cookies.token,navigate]);
   const Logout = () => {
    // Clear the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to login page
    navigate("/login");
  };
  return (
    <>
      <div >
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;