import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { ip, method, originalUrl, params, query, body } = request;
    // const userAgent = request.get('user-agent') || '';

    let responseData = '';

    // Override response.send to capture response data
    const originalSend = response.send;
    response.send = (body: any): Response => {
      responseData = body;
      response.send = originalSend; // Restore original send method
      return response.send(body);
    };

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      console.log({
        statusCode,
        originalUrl,
        method,
        responseTime: `${responseTime} ms`,
        contentLength,
        // userAgent: userAgent,
        params,
        query,
        body,
        ip: ip,
        res: responseData, // Log captured response data
      });
    });

    next();
  }
}
