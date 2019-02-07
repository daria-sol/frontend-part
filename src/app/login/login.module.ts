import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FormBuilder} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule],
  declarations: [LoginComponent],
  providers: [FormBuilder]
})
export class LoginModule {
}
