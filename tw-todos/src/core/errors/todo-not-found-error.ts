import { NotFoundError } from './not-found-error';

export class TodoNotFoundError extends NotFoundError {

  constructor(message: string = 'Todo not found') {
    super(message);
  }

}
