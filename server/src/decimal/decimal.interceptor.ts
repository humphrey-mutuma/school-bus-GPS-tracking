import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Decimal } from '@prisma/client/runtime';

@Injectable()
export class DecimalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertDecimals(data)));
  }

  private convertDecimals(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.convertDecimals(item));
    }

    if (data && typeof data === 'object') {
      const convertedData = { ...data };
      Object.keys(convertedData).forEach((key) => {
        if (convertedData[key] instanceof Decimal) {
          convertedData[key] = convertedData[key].toNumber();
        } else if (typeof convertedData[key] === 'object') {
          convertedData[key] = this.convertDecimals(convertedData[key]);
        }
      });
      return convertedData;
    }

    return data; // Return the original data if not an array or object
  }
}
