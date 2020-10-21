import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService, AuthServiceConfig } from 'angularx-social-login';
import { AppModule, provideConfig } from '../app.module';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      providers: [AuthService, {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should Sign In', () => {
    component.user = 'user';
    component.signedIn = true;
    expect(component.user).toBe('user');
    expect(component.signedIn).toBe(true);
    component.signOut();
    expect(component.user).toBe(null);
    expect(component.signedIn).toBe(false);
  })
});
