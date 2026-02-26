import { Link } from "react-router";
import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Form = ({ mode }) => {
  const isLogin = mode === "login";

  const { handleLogin, handleRegister, loading } = useAuth();

  // ? set formData value
  const [formData, setFormData] = useState({
    identifier: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    isPrivate: false,
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ? Validation
  const validateLogin = () => {
    if (!formData.identifier.trim()) return "Email or Username is required";
    if (!formData.password.trim()) return "Password is required";
    return null;
  };

  const validateRegister = () => {
    if (!formData.username.trim()) return "Username is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.password.trim()) return "Password is required";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  // ? Handle login and register submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = isLogin ? validateLogin() : validateRegister();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      if (isLogin) {
        await handleLogin({
          identifier: formData.identifier.trim(),
          password: formData.password.trim(),
        });
      } else {
        await handleRegister({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          bio: formData.bio.trim(),
          isPrivate: formData.isPrivate,
        });
      }
    } catch (err) {
      setFormError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-visual"></div>
      <div className="auth-form-container">
        <div className="auth-form">
          <h1 className="heading">{isLogin ? "Login" : "Create Account"}</h1>
          <p className="sub-para">
            {isLogin
              ? "Login to access your account"
              : "Register to start sharing your moments"}
          </p>

          <form onSubmit={handleSubmit}>
            {isLogin ? (
              <div className="field">
                <label htmlFor="identifier">Email or Username</label>
                <input
                  type="text"
                  placeholder="Enter email or username"
                  name="identifier"
                  required
                  id="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="eg. John_Doe"
                    required
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="eg. john@example.com"
                    required
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <>
                <div className="field">
                  <label htmlFor="bio">Bio</label>
                  <input
                    type="text"
                    placeholder="Enter your Bio"
                    maxLength={150}
                    name="bio"
                    id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>

                <div className="field checkbox-field">
                  <label htmlFor="isPrivate">
                    Do you want your account to be private?
                  </label>
                  <input
                    type="checkbox"
                    name="isPrivate"
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {formError && <div className="form-error">{formError}</div>}

            <button
              type="submit"
              className={`btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="form-footer">
              {isLogin ? (
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              ) : (
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Form;