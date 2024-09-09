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

export const EditGame = () => {
  const { id } = useParams();
  const count = useSelector(ourToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [record, setRecord] = useState(false);
  const user = useSelector((state) => state?.auth?.user?.role);

  useEffect(() => {
    axios.get(`/records/game/${id}`).then((res) => {
      console.log(res.data);
      setRecord(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      {user == 1 ? (
        <>
          {record ? (
            <Container>
              <Formik
                initialValues={{
                  id: record.id,
                  name: record.name,
                  type: record.type,
                  platforms: record.platforms,
                  year: record.year,
                  aboutGame: record.aboutGame,
                  img: record.img,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  axios.post(`/records/game/${id}`, { values }).then((res) => {
                    navigate("/admin");
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
                      <h1>{record.name}</h1>
                      <Input
                        placeholder="Название игры"
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
                        placeholder="Жанр"
                        type="text"
                        name="type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.type}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                      <Input
                        placeholder="Платформы"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="platforms"
                        value={values.platforms}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                      <Input
                        placeholder="Год выпуска"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="year"
                        value={values.year}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                      <Input
                        placeholder="Про игру"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="aboutGame"
                        value={values.aboutGame}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                      <Input
                        placeholder="Ссылка на фото"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="img"
                        value={values.img}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                      <Button
                        color="primary"
                        onClick={handleSubmit}
                        className="form__custom-button"
                      >
                        Сохранить данные
                    </Button>
                    </Form>
                  )}
              </Formik>
            </Container>
          ) : (
              "Грузим данные"
            )}
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
