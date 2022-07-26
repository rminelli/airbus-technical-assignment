import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  async use(request, response, next) {
    try {
      const DEFAULT_PAGE_SIZE = process.env['DEFAULT_PAGE_SIZE'];
      request.query.pageSize = request.query.pageSize
        ? request.query.pageSize
        : parseInt(DEFAULT_PAGE_SIZE);
      request.query.currentPage = request.query.currentPage
        ? request.query.currentPage
        : 0;
      request.query.orderBy = request.query.orderBy
        ? request.query.orderBy
        : 'id';
      request.query.order = request.query.desc === 'true' ? 'DESC' : 'ASC';
      next();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
