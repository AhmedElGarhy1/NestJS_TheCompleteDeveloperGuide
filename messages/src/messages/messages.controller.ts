import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private _messageService: MessagesService) {}

  @Get()
  findAll() {
    return this._messageService.findAll();
  }
  @Post()
  CreateMessage(@Body() body: CreateMessageDto) {
    return this._messageService.create(body.content);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const message = await this._messageService.findOne(id);

    if (!message) throw new NotFoundException("Message doesn't Exist");

    return message;
  }
}
