import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import * as firebase from 'firebase/app';
import { Registration } from '../pages/registration/registration.model';


@Injectable({
    providedIn: "root"
})
export class FirebaseAuthService {

    constructor() {

    }

    register(registration: Registration) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(registration.email, registration.password)
                .then(res => resolve(res),
                    err => reject(err))
                .catch((error: any) => console.error(error));
        })
    }

    login(loginUser: Login) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(loginUser.email, loginUser.password)
                .then(
                    res => resolve(res),
                    err => reject(err))
        })
    }
    userDetails() {
        return firebase.auth().currentUser;
    }
    logoutUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
                    .then(() => {
                        console.log("LOG Out");
                        resolve();
                    }).catch((error) => {
                        reject();
                    });
            }
        })
    }

}