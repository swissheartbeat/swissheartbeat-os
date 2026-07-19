import { Injectable } from '@nestjs/common';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';
import * as crypto from 'crypto';

@Injectable()
export class SignalService {

  create(createSignalDto: CreateSignalDto) {
    return {
      id: crypto.randomUUID(),
      status: 'NEW',
      createdAt: new Date(),
      ...createSignalDto,
    };
  }

  findAll() {
    return [
      {
        id: 1,
        title: 'Swiss National Bank',
        status: 'NEW',
      },
      {
        id: 2,
        title: 'Artificial Intelligence',
        status: 'RESEARCH',
      },
      {
        id: 3,
        title: 'Energy Markets',
        status: 'EVIDENCE',
      },
    ];
  }

  findOne(id: number) {
    return {
      id,
      title: 'Example Signal',
      status: 'NEW',
    };
  }

  update(id: number, updateSignalDto: UpdateSignalDto) {
    return {
      message: `Signal ${id} updated`,
      data: updateSignalDto,
    };
  }

  remove(id: number) {
    return {
      message: `Signal ${id} deleted`,
    };
  }

}