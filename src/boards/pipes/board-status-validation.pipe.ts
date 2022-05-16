import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status-enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata): any {
    if (!this.StatusOptions.includes(value.toUpperCase())) {
      throw new BadRequestException(
        `${value} is invalid status. PUBIC or PRIVATE is only allowed for status options`,
      );
    }
    return value;
  }
}
