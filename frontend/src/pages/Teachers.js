import * as React from 'react';
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, CardActionArea, CardMedia } from '@material-ui/core';
import { Header } from '../components/Header';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';



export const Teachers = () => {
  const user = useSelector((state) => state?.auth?.user);

  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/records/teachers/`).then((res) => {
      console.log(res.data);
      setTeachers(res.data);
    });
  }, []);
  return (
    <>
      <Header />
      <>
        <Container>
          <div style={{
            display: "flex",
            flexWrap: 'wrap',
            justifyContent: "space-evenly",
          }}>
            {teachers.map((elem) => {
              return (
                <div
                  style={{
                    width: '300px',
                    display: "flex",
                    flexWrap: 'wrap',
                    marginTop: 20,
                    marginBottom: 20,
                  }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={elem.img}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {elem.name} {elem.surname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {elem.position}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            })}
          </div>
        </Container>
      </>

    </>
  );
};


const Container = styled.div`
  width: fit-content;
  height: 100vh;
  display: flex;
  flex-direction: column
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #transparent;
  margin: auto;
`;
