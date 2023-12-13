import { Injectable } from '@angular/core';
import type { IApiSettings, IRequestProps, ITransport } from '@looker/sdk-rtl';
import {
  ApiSettings,
  BrowserTransport,
  AuthSession,
  APIMethods,
} from '@looker/sdk-rtl';
import { functionalSdk40, me } from '@looker/sdk';

export class LookerSession extends AuthSession {
  private csrfToken = '';

  constructor(
    public override settings: IApiSettings,
    transport: ITransport,
    csrfToken: string
  ) {
    super(settings, transport);
    this.csrfToken = csrfToken;
  }

  async getToken() {
    return this.csrfToken;
  }

  isAuthenticated() {
    return !!this.csrfToken;
  }

  async authenticate(props: IRequestProps) {
    const newProps = {
      ...props,
      headers: {
        ...props.headers,
        'X-CSRF-Token': this.csrfToken,
      },
    };
    return newProps;
  }
}

export class BaselessSettings extends ApiSettings {
  override isConfigured(): boolean {
    // base_url is *not* required for same origin
    return true;
  }
}

@Injectable()
export class LookerSessionService {
  csrfToken?: string;
  private funSdk?: APIMethods;

  getFunctionalSDK() {
    if (!this.funSdk) {
      const settings = new BaselessSettings({});
      const transport = new BrowserTransport(settings);
      const sdkSession = new LookerSession(
        settings,
        transport,
        this.csrfToken || ''
      );
      this.funSdk = functionalSdk40(sdkSession);
      this.funSdk.apiPath = '/api/internal/core/4.0';
    }
    return this.funSdk;
  }
}
