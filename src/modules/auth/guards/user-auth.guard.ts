import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

export class UserAuthGuard extends AuthGuard("user-auth-strategy") {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reflector = new Reflector();

    const isExternalRoute = reflector.get<boolean | undefined>(
      "__is_external_route__",
      context.getHandler(),
    );

    const isPublicRoute = reflector.get<boolean | undefined>(
      "__is_public_route__",
      context.getHandler(),
    );

    if (isExternalRoute || isPublicRoute) {
      return true;
    }

    return super.canActivate(context);
  }
}
