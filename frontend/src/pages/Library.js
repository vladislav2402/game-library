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
import { CardActionArea, CardMedia, CardContent, Typography, CardActions } from "@material-ui/core";


export const Library = () => {
  const { id } = useParams();
  const count = useSelector(ourToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const user = useSelector((state) => state?.auth?.user?.role);

  useEffect(() => {
    axios.get(`/records/library`).then((res) => {
      console.log(res.data);
      setRecord(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <>
        {user == 2 && <Button style={{ marginBottom: 50, marginTop: 50 }} variant="contained">
          <Link to="/library/create">
            Создать новую книгу
            </Link>
        </Button>}
        <Container>
          <div style={{
            display: "flex",
            flexWrap: 'wrap',
            justifyContent: "space-evenly",
          }}>
            {record.map((elem) => {
              return (
                <div
                  style={{
                    width: '300px',
                    display: "flex",
                    flexWrap: 'wrap',
                  }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image='https://www.picng.com/upload/book/png_book_29181.png'
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {/* {data.name} */}
                        {elem.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ width: '100%', textAlign: 'center' }}>
                    <a href={elem.link}>
                      <Button style={{ width: '100%', textAlign: 'center' }} size="small" color="primary">
                        Посмотреть книгу
                      </Button>
                    </a>
                  </CardActions>
                </div>
              )
            })}
          </div>
        </Container>
      </>

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
  flex-direction: column
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #transparent;
  margin: auto;
`;
