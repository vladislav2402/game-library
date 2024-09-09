import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";

import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import { useSelector } from "react-redux";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  color: '#bbb',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const Schedule = () => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const [schedule, setSchedule] = useState([
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
  ]);
  const [avaliableSubject, setAvaliableSubject] = useState([]);

  useEffect(() => {
    if (user?.role) {
      if (user.role == 2) {
        axios.get(`/records/schedule/teacher/${user.id}`).then((res) => {
          console.log(res.data);
          setSchedule(res.data);
        });
      } else {
        axios.get(`/records/schedule/${user.id}`).then((res) => {
          console.log(res.data);
          setSchedule(res.data);
        });
      }
    }

  }, []);

  const checkDay = (time, day) => {
    axios.get(`/records/check/${day}/${time}/${user.id}`).then((res) => {
      console.log(res.data);
      setAvaliableSubject(res.data);
    });
    setOpen(true);
  }


  const rows = [
    "8:30-9:30",
    "10:10-11:30",
    "11:50-13:10",
    "13:30-14:50",
    "15:05-16:25",
    "16:40-18:00",
    "18:10-19:30",
    "19:40-21:00",
  ];

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

  const handleClose = () => {
    setOpen(false);
  };

  const setNewSubject = (id) => {
    axios.get(`/records/schedule/set/${user.id}/${id}`).then((res) => {
      console.log(res.data);
      window.location.reload();
    });
  };

  return (
    <>
      {user?.role ?
        <>
          <Header />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              {avaliableSubject.length != 0 ? avaliableSubject.map((elem) => {
                return (<ListItem style={style} key={1} component="div">
                  <ListItemButton onClick={() => {
                    setNewSubject(elem.id);
                  }}>
                    <ListItemText style={{ color: '#bbb' }} primary={elem.name} />
                  </ListItemButton>
                </ListItem>)
              }) : 'Нету доступных уроков'}
            </Box>
          </Modal>
          <Container>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>Заполни свое расписание</caption>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="left">{DAYS.MONDAY}</TableCell>
                    <TableCell align="left">{DAYS.TUESDAY}</TableCell>
                    <TableCell align="left">{DAYS.WEDNESDAY}</TableCell>
                    <TableCell align="left">{DAYS.THURSDAY}</TableCell>
                    <TableCell align="left">{DAYS.FRIDAY}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow key="main">
                <TableCell component="th" scope="row">
                  {LESSONS.FIRST_LESSON}
                </TableCell>
                <TableCell align="center">{LESSONS.SECOND_LESSON}</TableCell>
                <TableCell align="center">{LESSONS.THIRD_LESSON}</TableCell>
                <TableCell align="center">{LESSONS.FOURTH_LESSON}</TableCell>
                <TableCell align="center">{LESSONS.FIVETH_LESSON}</TableCell>
                <TableCell align="center">{LESSONS.SIXTH_LESSON}</TableCell>
                <TableCell align="center">{LESSONS.SEVENTH_LESSON}</TableCell>
                <TableCell align="center">{LESSONS.EIGHT_LESSON}</TableCell>
              </TableRow> */}
                  {rows.map((row, index) => (
                    <TableRow key={row}>
                      <TableCell component="th" scope="row">
                        {row}
                      </TableCell>
                      <TableCell id={row + DAYS.MONDAY} align="left">
                        {schedule[0][index] ? schedule[0][index] : user.role == 1 && <Button onClick={() => {
                          checkDay(row, DAYS.MONDAY)
                        }}>Выбрать</Button>}
                      </TableCell>
                      <TableCell id={row + DAYS.TUESDAY} align="left">
                        {schedule[1][index] ? schedule[1][index] : user.role == 1 && <Button onClick={() => {
                          checkDay(row, DAYS.TUESDAY)
                        }}>Выбрать</Button>}
                      </TableCell>
                      <TableCell id={row + DAYS.WEDNESDAY} align="left">
                        {schedule[2][index] ? schedule[2][index] : user.role == 1 && <Button onClick={() => {
                          checkDay(row, DAYS.WEDNESDAY)
                        }}>Выбрать</Button>}
                      </TableCell>
                      <TableCell id={row + DAYS.THURSDAY} align="left">
                        {schedule[3][index] ? schedule[3][index] : user.role == 1 && <Button onClick={() => {
                          checkDay(row, DAYS.THURSDAY)
                        }}>Выбрать</Button>}
                      </TableCell>
                      <TableCell id={row + DAYS.FRIDAY} align="left">
                        {schedule[4][index] ? schedule[4][index] : user.role == 1 && <Button onClick={() => {
                          checkDay(row, DAYS.FRIDAY)
                        }}>Выбрать</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container></> : 'Сначала залогиньтесь'}
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
