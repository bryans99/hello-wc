import { Component, ViewEncapsulation, Input } from '@angular/core';
import { LookerSessionService } from './looker-session.service';
import { LookerUserService } from './looker-user.service';
import { Observable, map, merge } from 'rxjs';

@Component({
  selector: 'hello-wc',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [LookerUserService, LookerSessionService],
})
export class AppComponent {
  name$: Observable<string>;

  constructor(
    private userService: LookerUserService,
    private lookerSessionService: LookerSessionService
  ) {
    this.name$ = merge(
      userService.user$.pipe(map((user) => user.display_name || '')),
      userService.error$
    )
  }

  @Input()
  get csrfToken(): string {
    return this._csrfToken;
  }
  set csrfToken(csrfToken: string) {
    this.lookerSessionService.csrfToken = csrfToken;
    this._csrfToken = csrfToken;
  }
  private _csrfToken = '';

  ngOnInit() {
    this.userService.loadCurrentUser();
  }
}
