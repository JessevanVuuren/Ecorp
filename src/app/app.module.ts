import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbSpinnerModule, NbIconModule, NbTabsetModule, NbBadgeModule, NbFormFieldModule, NbAutocompleteModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ServerCardComponent } from './shop/server-card/server-card.component';
import { FilterComponent } from './shop/filter/filter.component';
import { CartItemComponent } from './shopping-cart/cart-item/cart-item.component';
import { BannerComponent } from './banner/banner.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ShopComponent,
    ShoppingCartComponent,
    ServerCardComponent,
    FilterComponent,
    CartItemComponent,
    BannerComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbInputModule,
    NbFormFieldModule,
    NbAutocompleteModule,
    NbIconModule,
    NbBadgeModule,
    HttpClientModule,
    NbTabsetModule,
    FormsModule,
    NbSpinnerModule,
    NbButtonModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
