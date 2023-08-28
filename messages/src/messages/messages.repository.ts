import { Injectable } from '@nestjs/common';

import { writeFile, readFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findAll() {
    const json = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(json);
    return messages;
  }

  async create(content: string) {
    const json = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(json);
    const id = Date.now();

    messages.push({ id, content });
    await writeFile('messages.json', JSON.stringify(messages), 'utf-8');
    return messages;
  }

  async findOne(id: number) {
    const json = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(json);

    return messages.find((msg) => msg.id == id);
  }
}
