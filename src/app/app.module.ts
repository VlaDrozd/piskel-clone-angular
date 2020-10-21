import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { InstrumentsService } from './instruments.service';
import { InstrumentsComponent } from './instruments/instruments.component';
import { FramesComponent } from './frames/frames.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmallCanvasComponent } from './small-canvas/small-canvas.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AnimationService } from './animation.service';
import { PreviewComponent } from './preview/preview.component';
import { MainComponent } from './main/main.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { ShortcutsComponent } from './shortcuts/shortcuts.component'

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'main', component: MainComponent },
  { path: 'shortcuts', component: ShortcutsComponent },
  { path: '**', component: NotFoundComponent }
];

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('478494452849-c8fjguu8500uc5svlb81jv18r08rcluv.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    InstrumentsComponent,
    FramesComponent,
    SmallCanvasComponent,
    PreviewComponent,
    MainComponent,
    LandingComponent,
    NotFoundComponent,
    AuthComponent,
    ShortcutsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    RouterModule.forRoot(appRoutes),
    SocialLoginModule
  ],
  providers: [
    InstrumentsService,
    AnimationService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
