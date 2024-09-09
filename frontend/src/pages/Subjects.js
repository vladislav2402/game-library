import * as React from 'react';
import Box from '@mui/material/Box';
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@material-ui/core';
import { Header } from '../components/Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const Subjects = () => {
  const user = useSelector((state) => state?.auth?.user);

  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role == 2) {
      axios.get(`/records/subjects/${user.id}/mine`).then((res) => {
        console.log(res.data);
        setSubjects(res.data);
      });
    } else {
      axios.get(`/records/subjects/${user.id}`).then((res) => {
        console.log(res.data);
        setSubjects(res.data);
      });
    }
  }, []);
  return (
    <>
      <Header />
      <>
        {user.role == 2 && <Button onClick={() => { navigate('/subject/create') }} style={{ marginBottom: 50, marginTop: 50 }} >
          Создать новый предмет
        </Button>}
        <Container>
          <div style={{
            display: "flex",
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: "space-evenly",
          }}>

            {subjects.map((elem) => {
              return (
                <div
                  style={{
                    width: '300px',
                    display: "flex",
                    flexWrap: 'wrap',
                    marginTop: 20,
                    marginBottom: 20,
                  }}>
                  <Card variant="outlined" sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {elem.type}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {elem.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {elem.teacher}
                      </Typography>
                      <Typography variant="body2">
                        {elem.description}
                        <br />
                        {elem.course}
                        <br />
                        {elem.faculty}
                      </Typography>
                    </CardContent>
                    {user.role == 1 && <CardActions>
                      <Button size="small" onClick={() => {
                        navigate("/schedule");
                      }}>Добавить в расписание</Button>
                    </CardActions>
                    }

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
