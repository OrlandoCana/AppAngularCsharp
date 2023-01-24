import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Response } from "../models/response";
import { User } from "../models/user";
import { map } from "rxjs/operators";
import { Login } from "../models/login";

const httpOption = {
    headers: new HttpHeaders({
        'Contend-type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    url: string = 'https://localhost:44358/api/User/login';

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    public get userData(): User {
        return this.userSubject.value;
    }

    constructor(private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    login(login: Login): Observable<Response> {
        return this.http.post<Response>(this.url, login, httpOption).pipe(
            map(res => {
                if (res.success === "1") {
                    const user: User = res.data;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                return res;
            })
        );
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }
}