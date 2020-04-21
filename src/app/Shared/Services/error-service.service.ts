import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    const router = this.injector.get(Router);
    if (error) {
      console.error("an error occurred", error);
    }
    router.navigate(['error']);
  }
}
