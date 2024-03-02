import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";


export const authInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const clonedRequest = request.clone({
        setHeaders: {
            Authorization: 'Bearer [the token]',
        },
    });
    return next(clonedRequest);
};