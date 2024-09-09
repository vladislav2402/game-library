import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import { ourToken } from "../app/slice/auth";
import { Formik } from "formik";
import { Input, Button, NativeSelect } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const courses = {
  ONE: "1 курс",
  TWO: "2 курс",
  THREE: "3 курс",
  FOUR: "4 курс",
}

export const faculties = {
  ELECTRONIC: "Факультет електроніки та комп’ютерних технологій",
  MATH: "Факультет прикладної математики та інформатики",
  MECHANIC: "Механіко-математичний факультет",
}

export const Admin = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [games, setGames] = useState({});
  const navigate = useNavigate();
  const token = useSelector(ourToken);

  useEffect(() => {
    axios.get(`/records/user/${user.id}`).then((res) => {
      console.log(res.data);
      setGames(res.data);
    });
  }, []);

  console.log(games.id)
  return (
    <>        <Header />
      <Container>
        {token ? (
          <>
            {user.role == 1 ? (
              <Formik
                initialValues={{
                  id: games.id,
                  name: games.name,
                  surname: games.surname,
                  middle: games.middle,
                  course: games.course,
                  faculty: games.faculty,
                  img: games.img,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  axios.post(`/records/user/${user.id}`, { values }).then((res) => {
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
                      <h1>Изменить данные пользователя</h1>
                      <Input
                        placeholder="Имя"
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
                        placeholder="Фамилия"
                        type="text"
                        name="surname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.surname}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                      <Input
                        placeholder="Отчество"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="middle"
                        value={values.middle}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                      <NativeSelect
                        id="role"
                        type="role"
                        name="course"
                        defaultValue={values.course}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                          name: 'course',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={courses.ONE}>{courses.ONE}</option>
                        <option value={courses.TWO}>{courses.TWO}</option>
                        <option value={courses.THREE}>{courses.THREE}</option>
                        <option value={courses.FOUR}>{courses.FOUR}</option>
                      </NativeSelect>
                      <NativeSelect
                        id="role"
                        type="role"
                        name="faculty"
                        defaultValue={values.faculty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                          name: 'faculty',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={faculties.ELECTRONIC}>{faculties.ELECTRONIC}</option>
                        <option value={faculties.MATH}>{faculties.MATH}</option>
                        <option value={faculties.MECHANIC}>{faculties.MECHANIC}</option>
                      </NativeSelect>
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
            ) : (
                <Formik
                  initialValues={{
                    id: games.id,
                    name: games.name,
                    surname: games.surname,
                    img: games.img,
                    position: games.position,
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    axios.post(`/records/user/${user.id}`, { values }).then((res) => {
                      navigate("/teachers");
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
                        <h1>Изменить данные пользователя</h1>
                        <Input
                          placeholder="Имя"
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
                          placeholder="Фамилия"
                          type="text"
                          name="surname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.surname}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                        <Input
                          placeholder="Отчество"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          name="middle"
                          value={values.middle}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                        <Input
                          placeholder="Посада"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          name="position"
                          value={values.position}
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
              )}
          </>
        ) : (
            "У вас нету доступа к этой странице"
          )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #e1e2e1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  width: 400px;
  padding: 20px 50px;
  height: 600px;
  margin-top: 50px;
  margin-bottom: 100px;
  border-radius: 10px;
  background-color: #d1dad6;
  color: #ffffff;
`;