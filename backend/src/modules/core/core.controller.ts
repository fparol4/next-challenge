import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express'

@Controller('')
export class CoreController {
  constructor() { }

  @Get()
  list(@Res() response: Response) {
    const payload = {
      message: '/health -> Health Check <3',
      status: HttpStatus.OK
    }

    response.status(HttpStatus.OK).json(payload)
  }
}
