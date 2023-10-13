import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  //verify login UserName and Password
  public loginverify(user: User){
    return this.httpClient.get<User>(environment.apiUrl + '/api/users/'+user.userName +'&'+user.password);
  }
}
