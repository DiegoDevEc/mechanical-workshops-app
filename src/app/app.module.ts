import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { UserService } from './core/services/api/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthInterceptor } from './core/services/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule,  // Importa el módulo de InputMask
    IonicStorageModule.forRoot()],
<<<<<<< HEAD
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserService,  // Servicios de usuario
=======
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserService,  // Servicio de usuario
>>>>>>> 99ff7a40df1c2cce425cc797d65d56d9d0486b8b
  {
    provide: HTTP_INTERCEPTORS, // Registra el interceptor HTTP
    useClass: AuthInterceptor, // Usa la clase AuthInterceptor
    multi: true, // Permite múltiples interceptores
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
