import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthService], canActivateChild:[AuthService], children: [
  // { path: '', component: HomeComponent, children: [
    { path: 'shop', component: ShopComponent},
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthService] },
    { path: 'user', component: UserComponent, canActivate:[AuthService] },
  ] },

  { path: 'login', component: LoginComponent},

  { path: '**', redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
