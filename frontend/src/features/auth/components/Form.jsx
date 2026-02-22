import { useState, useRef } from "react";
import { Link } from "react-router";
import "../styles/form.scss";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Form = ({ mode = "login" }) => {
  const isLogin = mode === "login";

  const [loginMethod, setLoginMethod] = useState("email");

  const [alert, setAlert] = useState(null);

  const initialFormState = {
    identifier: "",
    email: "",
    username: "",
    password: "",
    bio: "",
    privateAccount: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setAlert(null);
  };

  const [errors, setErrors] = useState({});

  const identifierRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // clear field error on typing
    setErrors((prev) => ({ ...prev, [field]: null }));
    setAlert(null);
  };

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const focusFirstError = (err) => {
    const key = Object.keys(err)[0];

    const refs = {
      identifier: identifierRef,
      email: emailRef,
      username: usernameRef,
      password: passwordRef,
    };
    refs[key]?.current?.focus();
  };

  const navigate = useNavigate();

  // ? ================= VALIDATION =================

  const validateLogin = () => {
    const e = {};

    if (!formData.identifier.trim()) {
      e.identifier =
        loginMethod === "email" ? "Email required" : "Username required";
    } else if (loginMethod === "email" && !isEmail(formData.identifier)) {
      e.identifier = "Invalid email";
    }

    if (!formData.password) e.password = "Password required";

    setErrors(e);

    if (Object.keys(e).length) focusFirstError(e);

    return Object.keys(e).length === 0;
  };

  const validateRegister = () => {
    const e = {};

    if (!formData.email) e.email = "Email required";
    else if (!isEmail(formData.email)) e.email = "Invalid email";

    if (!formData.username) e.username = "Username required";
    if (!formData.password) e.password = "Password required";
    if (formData.bio.length > 150) e.bio = "Bio max 150 characters";

    setErrors(e);

    if (Object.keys(e).length) focusFirstError(e);

    return Object.keys(e).length === 0;
  };

  // ? ================= SUBMIT =================

  const { loading, handleLogin, handleRegister } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setAlert(null);

    try {
      await handleLogin({
        email: loginMethod === "email" ? formData.identifier : undefined,
        username: loginMethod === "username" ? formData.identifier : undefined,
        password: formData.password,
      });

      resetForm();
      navigate("/");
    } catch (err) {
      setAlert({ type: "error", message: err.message || "Login failed" });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setAlert(null);

    try {
      await handleRegister({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        bio: formData.bio,
        privateAccount: formData.privateAccount,
      });

      resetForm();
      navigate("/");

    } catch (err) {
      setAlert({
        type: "error",
        message: err.message || "Registration failed",
      });
    }
  };

  // ? ================= UI ================= //

  return (
    <main className="auth-page">
      {" "}
      <div className="auth-container">
        {" "}
        <div className="auth-visual" />
        <div className="auth-form-container">
          <div className="auth-form">
            <h1 className="form-title">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="form-sub">
              {isLogin
                ? "Sign in to continue to your feed."
                : "Register to start sharing your moments."}
            </p>

            {alert && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}

            <form
              onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
              noValidate
            >
              {isLogin && (
                <div
                  className={`segmented ${
                    loginMethod === "username" ? "username" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`segmented-btn ${
                      loginMethod === "email" ? "active" : ""
                    }`}
                    onClick={() => {
                      setLoginMethod("email");
                      updateField("identifier", "");
                      setErrors({});
                    }}
                  >
                    Email
                  </button>

                  <button
                    type="button"
                    className={`segmented-btn ${
                      loginMethod === "username" ? "active" : ""
                    }`}
                    onClick={() => {
                      setLoginMethod("username");
                      updateField("identifier", "");
                      setErrors({});
                    }}
                  >
                    Username
                  </button>
                </div>
              )}

              {/* identifier / email */}
              {isLogin ? (
                <Field
                  value={formData.identifier}
                  onChange={(v) => updateField("identifier", v)}
                  error={errors.identifier}
                  label={loginMethod === "email" ? "Email" : "Username"}
                  refEl={identifierRef}
                />
              ) : (
                <Field
                  value={formData.email}
                  onChange={(v) => updateField("email", v)}
                  error={errors.email}
                  label="Email"
                  refEl={emailRef}
                />
              )}

              {!isLogin && (
                <Field
                  value={formData.username}
                  onChange={(v) => updateField("username", v)}
                  error={errors.username}
                  label="Username"
                  refEl={usernameRef}
                />
              )}

              <Field
                type="password"
                value={formData.password}
                onChange={(v) => updateField("password", v)}
                error={errors.password}
                label="Password"
                refEl={passwordRef}
              />

              {!isLogin && (
                <div className="field">
                  <input
                    placeholder=" "
                    value={formData.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    maxLength={150}
                  />
                  <label>Bio</label>
                  <div className="char-counter">{formData.bio.length}/150</div>
                </div>
              )}

              <button className="btn" disabled={loading} type="submit">
                {loading ? (
                  <div className="spinner" />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Create Account"
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
      </div>
    </main>
  );
};

const Field = ({ value, onChange, error, label, type = "text", refEl }) => (
  <div className={`field ${error ? "has-error" : ""}`}>
    <input
      ref={refEl}
      type={type}
      placeholder=" "
      value={value}
      aria-invalid={!!error}
      onChange={(e) => onChange(e.target.value)}
    />
    <label>{label}</label>
    <div className="field-error-space">
      {error && <span className="field-error">{error}</span>}
    </div>
  </div>
);

export default Form;
