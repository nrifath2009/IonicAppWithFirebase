import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class AppConstantService {
    UserNotFound: string = 'auth/user-not-found';
    InvalidEmail: string = 'auth/invalid-email';
    InvalidPassword: string = 'auth/wrong-password';
    ErrorMessage(err: any) {
        if (err.code === this.UserNotFound) {
            return "No user found!"
        }
        else if (err.code === this.InvalidEmail) {
            return "Invalid email address!"
        }
        else if (err.code === this.InvalidPassword) {
            return "Wrong password input!"
        }
        return "";

    }
}