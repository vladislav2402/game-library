import React, { Component, useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Header } from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { ourToken, setUser } from "../app/slice/auth";

export const LibraryCreateBook = () => {
  const { id } = useParams();
  const count = useSelector(ourToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [record, setRecord] = useState(false);
  const user = useSelector((state) => state?.auth?.user?.role);

  useEffect(() => {
    axios.get(`/records/book/create`).then((res) => {
      console.log(res.data);
      setRecord(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      {user == 2 ? (
        <>

          <Container>
            <Formik
              initialValues={{ name: "", author: "", link: '', subject: '' }}
              onSubmit={(values, { setSubmitting }) => {
                axios.post(`/records/library/create`, { values }).then((res) => {
                  navigate("/library");
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
                    <h1> Создать новую книгу</h1>
                    <Input
                      placeholder="Название книги"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <Input
                      placeholder="Автор"
                      type="text"
                      name="author"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.author}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <Input
                      placeholder="Предмет"
                      type="text"
                      name="subject"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <Input
                      placeholder="Cсылка на книгу"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="link"
                      value={values.link}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      className="form__custom-button"
                    >
                      Создать книгу
                    </Button>
                  </Form>
                )}
            </Formik>
          </Container>
        </>
      ) : (
          "У вас нету доступа к этой странице"
        )}
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  width: 400px;
  padding: 20px 50px;
  height: 600px;
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
  background-color: #3874cb;
`;
