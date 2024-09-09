import React, { Component, useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { ourToken, setUser } from "../app/slice/auth";

export const LoginForm = () => {
  const count = useSelector(ourToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
  }, []);

  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios.post(`/records/login`, { values }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data) {
              window.localStorage.setItem("token", res.data.token);
              dispatch(setUser(res.data));
              window.localStorage.setItem("user", JSON.stringify(res.data));
              navigate("/");
            } else {
              alert("Неправильные данные");
            }
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <h1></h1>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              formControlProps={{
                fullWidth: true,
              }}
            />
            {errors.email && touched.email && errors.email}
            <Input
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              formControlProps={{
                fullWidth: true,
              }}
            />
            {errors.password && touched.password && errors.password}

            <Button
              color="primary"
              onClick={handleSubmit}
              className="form__custom-button"
            >
              Войти
            </Button>
            <Link to="/register">Нету аккаунта?</Link>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  width: 400px;
  padding: 20px 50px;
  height: 300px;
  border-radius: 10px;
  background-color: #d1dad6;
  color: #ffffff;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c67f6;
`;
