import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  // @Get('/all-games')
  // getAllGames() {
  //   return this.recordsService.getAllGames();
  // }

  // @Get('/all-developers')
  // getAllDevelopers() {
  //   return this.recordsService.getAllDevelopers();
  // }

  @Post('/register')
  register(@Body() registerData) {
    return this.recordsService.register(registerData);
  }

  @Post('/login')
  login(@Body() loginData) {
    return this.recordsService.login(loginData);
  }

  // @Get('/game/:id')
  // getOneGame(@Param() id) {
  //   return this.recordsService.getOneGame(id);
  // }

  // @Get('/developer/:id')
  // getOneDeveloper(@Param() id) {
  //   return this.recordsService.getOneDeveloper(id);
  // }

  @Get('/user/:id')
  getOneUser(@Param() id) {
    return this.recordsService.getUserById(id);
  }

  @Post('/user/:id')
  setOneUser(@Body() userData, @Param() id) {
    return this.recordsService.setOneUser(id, userData.values);
  }

  @Get('/schedule/:id')
  getSchedule(@Param() id) {
    return this.recordsService.getSchedule(id);
  }

  @Get('/check/:day/:time/:id')
  checkAvaliable(@Param() id) {
    return this.recordsService.checkAvaliable(id);
  }

  @Get('/subjects/:id/mine')
  getMineSubjects(@Param() id) {
    return this.recordsService.getMineSubjects(id);
  }

  @Post('/library/create')
  createBook(@Body() userData) {
    return this.recordsService.createBook(userData.values);
  }


  @Get('/schedule/teacher/:id')
  getTeachersSchedule(@Param() id) {
    return this.recordsService.getTeachersSchedule(id);
  }


  @Get('/schedule/set/:id/:subject')
  setSchedule(@Param() id) {
    return this.recordsService.setSchedule(id);
  }

  @Get('/subjects/:id')
  getScheduleByUser(@Param() id) {
    return this.recordsService.getScheduleByUser(id);
  }

  @Post('/subjects/create')
  createSubjects(@Body() userData) {
    return this.recordsService.createSubjects(userData);
  }

  @Get('/library')
  getBooks(@Body() userData) {
    return this.recordsService.getBooks();
  }


  @Get('/teachers/')
  getTeachers() {
    return this.recordsService.getTeachers();
  }

  // @Get('/comments/:id')
  // getComments(@Param() id) {
  //   return this.recordsService.getComments(id);
  // }

  // @Post('/game/:id')
  // editGame(@Body() gameData, @Param() id) {
  //   return this.recordsService.editGame(id, gameData.values);
  // }

  // @Post('/subject/create')
  // setOneBook(@Body() data) {
  //   return this.recordsService.setOneBook(data);
  // }

  // @Post('/rating/')
  // addNewRating(@Body() ratingData) {
  //   return this.recordsService.addNewRating(ratingData.requestData);
  // }

  // @Get('/rating/:gameId/:userId')
  // getGameRating(@Param('gameId') gameId, @Param('userId') userId) {
  //   console.log(gameId);
  //   console.log(userId);
  //   return this.recordsService.getGameRate(gameId, userId);
  // }

}
