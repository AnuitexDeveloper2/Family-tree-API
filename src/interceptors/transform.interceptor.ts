import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const httpArgumentHost = context.switchToHttp();
    const request = httpArgumentHost.getRequest();
    const acceptLanguage = request.headers["accept-language"] ?? "en";
    const languageCodes = acceptLanguage.split(",").map((lang) => {
      const code = lang.trim().split(";")[0];
      return code;
    });

    return next.handle().pipe(
      map((data) => {
        const rawMessage = data?.message || "";

        if (!!data?.data && !!data?.data?.status) {
          if (data?.data?.status > 299) {
            return {
              message: data?.data?.message || "",
              statusCode: data?.data?.status,
              data: null,
              meta: data?.data || {},
            };
          }
        }

        return {
          message: rawMessage,
          statusCode: httpArgumentHost.getResponse().statusCode,
          data: data.data || data,
        } as any;
      }),
    );
  }
}
