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
import { NativeSelect } from "@material-ui/core";

export const SubjectCreate = () => {
  const { id } = useParams();
  const count = useSelector(ourToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [record, setRecord] = useState(false);
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    axios.get(`/records/subject/create`).then((res) => {
      console.log(res.data);
      setRecord(res.data);
    });
  }, []);

  const courses = {
    ONE: "1 курс",
    TWO: "2 курс",
    THREE: "3 курс",
    FOUR: "4 курс",
  }

  const faculties = {
    ELECTRONIC: "Факультет електроніки та комп’ютерних технологій",
    MATH: "Факультет прикладної математики та інформатики",
    MECHANIC: "Механіко-математичний факультет",
  }
  const LESSONS = {
    FIRST_LESSON: "8:30-9:30",
    SECOND_LESSON: "10:10-11:30",
    THIRD_LESSON: "11:50-13:10",
    FOURTH_LESSON: "13:30-14:50",
    FIVETH_LESSON: "15:05-16:25",
    SIXTH_LESSON: "16:40-18:00",
    SEVENTH_LESSON: "18:10-19:30",
    EIGHT_LESSON: "19:40-21:00",
  }

  const DAYS = {
    MONDAY: 'Понедельник',
    TUESDAY: 'Вторник',
    WEDNESDAY: 'Среда',
    THURSDAY: 'Четверг',
    FRIDAY: 'Пятница',
  }

  return (
    <>
      <Header />
      {user.role == 2 ? (
        <>

          <Container>
            <Formik
              initialValues={{ name: "", type: "NORMALL", description: '', course: courses.ONE, faculty: faculties.ELECTRONIC, time: LESSONS.FIRST_LESSON, day: DAYS.MONDAY }}
              onSubmit={(values, { setSubmitting }) => {
                axios.post(`/records/subjects/create`, { ...values, userId: user.id }).then((res) => {
                  navigate("/subject");
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
                    <h1> Новый предмет</h1>
                    <Input
                      placeholder="Название предмета"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <NativeSelect
                      id="type"
                      type="type"
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.type}
                      inputProps={{
                        name: 'type',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={"EGZ"}>Экзамен</option>
                      <option value={"NORMALL"}>Пара</option>
                    </NativeSelect>
                    <Input
                      placeholder="Описание"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="description"
                      value={values.description}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <NativeSelect
                      id="course"
                      type="course"
                      name="course"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.course}
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
                      id="time"
                      type="time"
                      name="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.time}
                      inputProps={{
                        name: 'time',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={LESSONS.FIRST_LESSON}>{LESSONS.FIRST_LESSON}</option>
                      <option value={LESSONS.SECOND_LESSON}>{LESSONS.SECOND_LESSON}</option>
                      <option value={LESSONS.THIRD_LESSON}>{LESSONS.THIRD_LESSON}</option>
                      <option value={LESSONS.FOURTH_LESSON}>{LESSONS.FOURTH_LESSON}</option>
                      <option value={LESSONS.FIVETH_LESSON}>{LESSONS.FIVETH_LESSON}</option>
                      <option value={LESSONS.SIXTH_LESSON}>{LESSONS.SIXTH_LESSON}</option>
                      <option value={LESSONS.SEVENTH_LESSON}>{LESSONS.SEVENTH_LESSON}</option>
                      <option value={LESSONS.EIGHT_LESSON}>{LESSONS.EIGHT_LESSON}</option>
                    </NativeSelect>
                    <NativeSelect
                      id="faculty"
                      type="faculty"
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
                    <NativeSelect
                      id="day"
                      type="day"
                      name="day"
                      defaultValue={values.day}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: 'day',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={DAYS.MONDAY}>{DAYS.MONDAY}</option>
                      <option value={DAYS.TUESDAY}>{DAYS.TUESDAY}</option>
                      <option value={DAYS.WEDNESDAY}>{DAYS.WEDNESDAY}</option>
                      <option value={DAYS.THURSDAY}>{DAYS.THURSDAY}</option>
                      <option value={DAYS.FRIDAY}>{DAYS.FRIDAY}</option>
                    </NativeSelect>
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      className="form__custom-button"
                    >
                      Создать предмет
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
