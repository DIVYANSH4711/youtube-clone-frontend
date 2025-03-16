import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      username: "",
      email: "",
      fullName: "",
      password: "",
      avatar: null,
      coverImage: null,
   });

   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [avatarName, setAvatarName] = useState("No file chosen");
   const [coverImageName, setCoverImageName] = useState("No file chosen");

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, [e.target.name]: file });

      if (e.target.name === "avatar") setAvatarName(file ? file.name : "No file chosen");
      if (e.target.name === "coverImage") setCoverImageName(file ? file.name : "No file chosen");
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      if (!formData.username || !formData.email || !formData.fullName || !formData.password || !formData.avatar) {
         setError("All fields are required (Avatar is mandatory)");
         setLoading(false);
         return;
      }

      try {
         const userData = new FormData();
         Object.keys(formData).forEach((key) => {
            userData.append(key, formData[key]);
         });

         const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userData, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         console.log("User registered:", response.data);
         setLoading(false);
         setError("");
         navigate("/u/home");
      } catch (err) {
         setError(err.response?.data?.message || "Something went wrong");
         setLoading(false);
      }
   };

   return (
      <div className="flex h-screen">
         {/* Left Section - Registration Form */}
         <div className="flex-1 bg-black flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-6">
               <h2 className="text-center text-3xl font-extrabold text-white">Create Your Account</h2>
               <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="username"
                     placeholder="Username"
                     className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                     value={formData.username}
                     onChange={handleChange}
                     required
                  />
                  <input
                     type="email"
                     name="email"
                     placeholder="Email"
                     className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                     value={formData.email}
                     onChange={handleChange}
                     required
                  />
                  <input
                     type="text"
                     name="fullName"
                     placeholder="Full Name"
                     className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                     value={formData.fullName}
                     onChange={handleChange}
                     required
                  />
                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                     value={formData.password}
                     onChange={handleChange}
                     required
                  />

                  {/* Custom File Input for Avatar */}
                  <div className="w-full relative">
                     <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                        id="avatarUpload"
                     />
                     <select name="avatar" id=""></select>
                     <label
                        htmlFor="avatarUpload"
                        className="cursor-pointer flex justify-between items-center bg-gray-800 text-white px-4 py-2 border border-gray-600 rounded-md"
                     >
                        <span>{avatarName}</span>
                        <span className="bg-cyan-900 text-white px-3 py-1 rounded-md">Choose File</span>
                     </label>
                  </div>

                  {/* Custom File Input for Cover Image (Optional) */}
                  <div className="w-full relative">
                     <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="coverUpload"
                     />
                     <label
                        htmlFor="coverUpload"
                        className="cursor-pointer flex justify-between items-center bg-gray-800 text-white px-4 py-2 border border-gray-600 rounded-md"
                     >
                        <span>{coverImageName}</span>
                        <span className="bg-cyan-900 text-white px-3 py-1 rounded-md">Choose File</span>
                     </label>
                  </div>

                  {error && <p className="text-red-600 text-center">{error}</p>}
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700  text-white py-2 rounded-md" disabled={loading}>
                     {loading ? "Registering..." : "Sign Up"}
                  </button>
               </form>
               <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="text-blue-500 hover:underline">
                     Sign in
                  </Link>
               </p>
            </div>
         </div>

         {/* Right Section - Branding / Animated Tagline */}
         <div className="hidden md:flex flex-1 bg-yellow-500 items-center justify-center p-10">
            <h1 className="text-3xl font-extrabold text-gray-800">
               Stream. Watch. Repeat.
            </h1>
         </div>
      </div>
   );
}
