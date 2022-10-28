import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserApi } from "../../api";
import "./style.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "testuser1@gmail.com",
    password: "testuser1@gmail.com",
    rePassword: "testuser1@gmail.com",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [validator, setValidator] = useState({
    emailError: false,
    rePasswordError: false,
  });

  const clearValidation = () => {
    setValidator({
      emailError: false,
      rePasswordError: false,
    });
  };
  const formValidation = () => {
    const emailValidate =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.email
      );
    const rePasswordValidate = form.password === form.rePassword;
    if (emailValidate === false || rePasswordValidate === false) {
      setValidator({
        emailError: !emailValidate,
        rePasswordError: !rePasswordValidate,
      });
      return false;
    }
    return true;
  };

  const handleInputEmail = (e) => {
    e.preventDefault();
    setForm({ ...form, email: e.target.value });
  };

  const handleInputPassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };

  const handleInputRePassword = (e) => {
    setForm({ ...form, rePassword: e.target.value });
  };

  const submitLogin = async (e) => {
    setIsSubmit(true);
    if (!formValidation()) return;
    const res = await UserApi("login", {
      email: form.email,
      password: form.password,
    });
    if(res && res.status === 200){
      window.localStorage.setItem("userId", res.data.userId);
      window.location.href = "/management";

    }
    setIsSubmit(false);
  };

  const submitRegister = async (e) => {
    setIsSubmit(true);
    if (!formValidation()) return;
    const res = await UserApi("register", {
      email: form.email,
      password: form.password,
    });
    if(res && res.status === 200){
      window.localStorage.setItem("userId", res.data.userId);
      window.location.href = "/management";
    }
    setIsSubmit(false);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div style={{ display: "flex" }}>
          <Button
            style={{ flex: 1 }}
            onClick={(e) => {
              setIsLogin(true);
              clearValidation();
            }}
          >
            Đăng nhập
          </Button>
          <Button
            style={{ flex: 1 }}
            onClick={(e) => {
              setIsLogin(false);
              clearValidation();
            }}
          >
            Đăng ký
          </Button>
        </div>
        {
          <form className="form">
            <TextField
              onChange={handleInputEmail}
              value={form.email}
              id="name"
              type="email"
              name="name"
              sx={{ marginTop: "12px" }}
              label="Địa chỉ email"
              variant="standard"
            />
            {validator.emailError && <small>Email không hợp lệ</small>}
            <TextField
              key="password"
              onChange={handleInputPassword}
              type="password"
              value={form.password}
              sx={{ margin: "12px 0" }}
              label="Mật khẩu"
              variant="standard"
            />
            {isLogin ? (
              isSubmit ? (
                <LoadingButton loading variant="outlined">
                  Submit
                </LoadingButton>
              ) : (
                <>
                  <Button
                    onClick={submitLogin}
                    sx={{ marginTop: "12px" }}
                    variant="contained"
                  >
                    Đăng nhập
                  </Button>
                </>
              )
            ) : isSubmit ? (
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
            ) : (
              <>
                <TextField
                  onChange={handleInputRePassword}
                  value={form.rePassword}
                  type="password"
                  label="Mật khẩu"
                  variant="standard"
                />
                {validator.rePasswordError && (
                  <small>Mật khẩu không trùng khớp</small>
                )}
                <Button
                  onClick={submitRegister}
                  sx={{ marginTop: "12px" }}
                  variant="contained"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </form>
        }
      </div>
    </div>
  );
};

export default Login;
