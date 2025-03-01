import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 

export default function Login() {
  console.log(`VITE_API_URL: ${import.meta.env.VITE_API_URL}`);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const taglines = [
    "Stream. Watch. Repeat.",
    "Your gateway to endless entertainment!",
    "Lights, Camera, Action, Anytime, Anywhere!",
    "Explore. Discover. Inspire.",
    "From viral hits to hidden gems, it's all here!",
    "Binge-worthy content, just a click away!",
    "Create. Share. Shine."
  ];

  useEffect(() => {
    let charIndex = 0;
    let currentTagline = taglines[taglineIndex];
    let typingSpeed = 100;
    let erasingSpeed = 50;
    let pauseBeforeErase = 1500;
    let pauseBeforeNextTagline = 500;

    const typeText = () => {
      if (charIndex <= currentTagline.length) {
        setDisplayedText(currentTagline.slice(0, charIndex));
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setTimeout(eraseText, pauseBeforeErase);
      }
    };

    const eraseText = () => {
      if (charIndex >= 0) {
        setDisplayedText(currentTagline.slice(0, charIndex));
        charIndex--;
        setTimeout(eraseText, erasingSpeed);
      } else {
        setTimeout(() => {
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }, pauseBeforeNextTagline);
      }
    };

    typeText();
  }, [taglineIndex]); // Re-run effect when taglineIndex changes

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { 
          "email": email, 
          "username" : username,
          "password": password 
        }
      );


      if (!response.data || !response.data.data) {
        throw new Error("Invalid server response");
      }

      const { accessToken, refreshToken, user } = response.data.data;

      if (!accessToken || !refreshToken || !user) {
        throw new Error("Missing authentication data");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/u/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section - Tagline Animation */}
      <div className="hidden md:flex flex-1 bg-violet-700 items-center justify-center p-10">
        <h1 className="text-3xl font-extrabold text-gray-800">
          {displayedText}
          <span className="border-r-2 border-black animate-blink">&nbsp;</span>
        </h1>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <form className="mt-6 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring focus:ring-red-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-600 font-bold text-md flex justify-center items-center p-1 rounded-sm">
                {error}
              </div>
            )}
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 rounded-md">
              Sign in
            </button>
          </form>
          <p className="text-center text-sm text-gray-400">
            Don't have an account? <Link to="/auth/register" className="text-red-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
