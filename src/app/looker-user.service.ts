import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import type { IUser } from '@looker/sdk';
import { me } from '@looker/sdk';
import { LookerSessionService } from './looker-session.service';

@Injectable()
export class LookerUserService {
  private nameSubject = new BehaviorSubject<string>('')
  private name$ = this.nameSubject.asObservable();
  private userSubject = new Subject<IUser>()
  user$ = this.userSubject.asObservable();
  private errorSubject = new Subject<string>()
  error$ = this.errorSubject.asObservable();

  constructor(private lookerSessionService: LookerSessionService) {}

  async loadCurrentUser() {
    try {
      const funSdk = this.lookerSessionService.getFunctionalSDK();
      const result = await funSdk?.ok(me(funSdk));
      this.nameSubject.next(result.display_name || 'Unknown')
      this.userSubject.next(result)
    } catch (error: any) {
      console.error(error);
      this.nameSubject.next('Unknown')
      this.errorSubject.next('Error occured loading current user')
    }
  }
}
