import { Inject, Injectable, signal } from "@angular/core";
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from "@angular/fire/auth";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<User | null>;
    currentUserSig = signal<{ email: string | null } | null>(null);


    constructor(private firebaseAuth: Auth) {
        this.user$ = authState(this.firebaseAuth);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
            () => { }
        );
        return from(promise)
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise)
    }
}





