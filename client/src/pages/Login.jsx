import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleloginSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const response = await login(formData);

    if (response) {
      navigate("/attendance");
      setFormData({ email: "", password: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-background flex rounded-2xl shadow max-w-3xl p-5 items-center shadow-primary border border-primary">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl">Login</h2>
            <p className="text-xs mt-4">
              If you are already a member, easily log in
            </p>
            <form
              action
              className="flex flex-col gap-4"
              onSubmit={handleloginSubmit}
            >
              <input
                className="px-2 py-1 mt-8 rounded-xl border text-background"
                type="email"
                name="email"
                placeholder="Email"
                value={user ? user.email : formData.email}
                onChange={handleInputChange}
                required
              />

              <div className="relative">
                <input
                  className="px-2 py-1 rounded-xl border w-full text-background"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass(!showPass);
                  }}
                >
                  {showPass ? (
                    <FaRegEyeSlash className="absolute top-1/2 right-3 -translate-y-1/2 text-background" />
                  ) : (
                    <FaRegEye className="absolute top-1/2 right-3 -translate-y-1/2 text-background" />
                  )}
                </button>
              </div>
              <button className="bg-secondary font-bold rounded-xl text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>

            <div className="mt-3 text-xs flex justify-between items-center text-accent">
              <p>Don&apos;t have an account?</p>
              <button
                className="py-2 px-5 bg-text text-primary font-bold border rounded-xl hover:scale-110 duration-300"
                onClick={() => navigate("/register")}
              >
                Regiter
              </button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://images.unsplash.com/photo-1583950158664-e6460f698a92?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
