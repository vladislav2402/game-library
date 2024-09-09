import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { Book } from 'src/entity/book.entity';
import { Subject } from 'src/entity/subject.entity';
import { DAYS, DAYS_NUM, LESSONS_NUM, LESSONS } from 'src/entity/subject.enum';
import e from 'express';


@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) { }

  rand = () => {
    return Math.random().toString(36).substr(2);
  };

  token = () => {
    return this.rand() + this.rand();
  };


  async register(registerData) {
    console.log(registerData);
    const newUser = new User();
    newUser.role = registerData.values.role;
    newUser.name = registerData.values.name;
    newUser.surname = registerData.values.surname;
    newUser.email = registerData.values.email;
    newUser.password = registerData.values.password;
    newUser.token = this.token();
    await newUser.save();
    return newUser;
  }

  async login(loginData) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginData.values.email,
        password: loginData.values.password,
      },
    });
    return user ? user : false;
  }

  async getUserById(userId) {
    const comments = await this.userRepository.findOne({
      where: {
        id: userId.id,
      },
    });
    return comments;
  }

  async setOneUser(userId, data) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId.id,
      },
    });
    if (user.role == '1') {
      user.name = data.name;
      user.surname = data.surname;
      user.img = data.img;
      user.middle = data.middle;
      user.faculty = data.faculty;
      user.course = data.course;
      user.save();
      return user;
    } else {
      user.name = data.name;
      user.surname = data.surname;
      user.img = data.img;
      user.middle = data.middle;
      user.position = data.position;
      user.save();
      return user;
    }
  }


  async setOneSubject(data) {
    const user = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
    });
    const subject = new Subject();
    subject.course = data.course;
    subject.description = data.description;
    subject.faculty = data.faculty;
    subject.name = data.faculty;
    subject.type = data.faculty;
    subject.save();
    return subject;
  }

  async getSchedule(dataId) {
    const schedule = await this.scheduleRepository.find({
      where: {
        userId: dataId.id,
      }
    });


    let defaultArray: any = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ]

    await schedule.map(async (elem) => {
      defaultArray[DAYS_NUM[elem.day]][LESSONS_NUM[elem.time]] = elem.name;
    });

    return defaultArray;
  }

  async checkAvaliable(data) {
    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      }
    });

    const subject = await this.subjectRepository.find({
      where: {
        time: data.time,
        day: data.day,
        faculty: user.faculty,
        course: user.course,
      }
    });

    return subject;
  }

  async setSchedule(data) {
    const sub = await this.subjectRepository.findOne({
      where: {
        id: data.subject,
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });

    const schedule = new Schedule();
    schedule.name = sub.name;
    schedule.faculty = user.faculty;
    schedule.day = sub.day;
    schedule.time = sub.time;
    schedule.course = user.course;
    schedule.userId = user.id;
    await schedule.save();
    return schedule;
  }


  async getBooks() {
    const books = await this.bookRepository.find({});
    return books;
  }

  async setSubjectByFaculty(data) {
    const subjects = await this.subjectRepository.find({
      where: {
        faculty: data.faculty,
      },
    });
    return subjects;
  }

  async createSubjects(userData) {
    const subCheck = await this.subjectRepository.find({
      where: {
        faculty: userData.faculty,
        time: userData.time,
        day: userData.day,
        course: userData.course,
      },
    });

    if (subCheck.length == 0) {
      const subject = new Subject();
      subject.name = userData.name;
      subject.faculty = userData.faculty;
      subject.time = userData.time;
      subject.course = userData.course;
      subject.day = userData.day;
      subject.type = userData.type;
      subject.description = userData.description;
      subject.userId = userData.userId;
      await subject.save();
      return subject;
    }

    return 'У вас уже есть в это время занятие';
  }

  async getTeachersSchedule(data) {
    const schedule = await this.subjectRepository.find({
      where: {
        userId: data.id,
      }
    });

    let defaultArray: any = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ]

    await schedule.map(async (elem) => {
      defaultArray[DAYS_NUM[elem.day]][LESSONS_NUM[elem.time]] = elem.name;
    });

    return defaultArray;
  }


  async getMineSubjects(data) {
    const subject = await this.subjectRepository.find({
      where: {
        userId: data.id,
      },
    });
    return subject;
  }

  async createBook(data) {
    console.log(data)
    const book = new Book();
    book.subject = data.subject;
    book.name = data.name;
    book.link = data.link;
    book.author = data.author;
    book.save();
    return book;
  }

  async getTeachers() {
    const teachers = await this.userRepository.find({
      where: {
        role: '2',
      },
    });
    return teachers;
  }

  async getScheduleByUser(data) {
    console.log(data)
    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });

    const subjects = await this.subjectRepository.find({
      where: {
        faculty: user.faculty,
        course: user.course,
      },
    });
    const subjectsWithTeacher = async () => {
      return Promise.all(subjects.map(async (elem) => {
        const teach = await this.userRepository.findOne({
          where: {
            id: elem.userId,
          },
        });
        return {
          ...elem,
          teacher: teach.name + " " + teach.surname,
        };
      })
      )
    }

    subjectsWithTeacher().then(data => {
      console.log(data)
    })


    return await subjectsWithTeacher();
  }
}
