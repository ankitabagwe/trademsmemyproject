import { RouterModule, Routes } from '@angular/router';
import { BuisnessdetailsComponent } from '../sellertool/buisnessdetails/buisnessdetails.component';

import { ProductdetailsComponent } from '../sellertool/productdetails/productdetails.component';
import { BuyerregistrationComponent } from '../buyerregistration/buyerregistration.component';
import { NgModule } from '@angular/core';
import { BodyComponent } from './body/body/body.component';
import { WithregistrationComponent } from '../withregistration/withregistration.component';
import { FrontpageComponent } from '../sellertool/frontpageseller/frontpage/frontpage.component';
import { AddgstComponent } from '../sellertool/addgst/addgst.component';
import { SellerbodyComponent } from '../sellertool/sellerbody/sellerbody.component';
import { BuyermessageComponent } from '../buyermessage/buyermessage.component';
import { LeadmanagerComponent } from '../sellertool/sellerbody/sellerbody/leadmanager/leadmanager.component';
import { SellermessageComponent } from '../sellermessage/sellermessage/sellermessage.component';
import { BuyleadsComponent } from '../sellertool/sellerbody/sellerbody/buyleads/buyleads.component';
import { FootercomponentComponent } from '../footer/footercomponent/footercomponent.component';
import { ProductsComponent } from '../products/products.component';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../sellertool/sellerbody/sellerbody/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        component: BodyComponent
    },
   
    {
        path:'app-buisnessdetails',
        component: BuisnessdetailsComponent
    },
    
    {
        path:'app-frontpage',
        component: FrontpageComponent
    },
    

    {
        path:'app-withregistration',
        component: WithregistrationComponent
    },

    {
        path:'app-buyleads',
        component:  BuyleadsComponent
    },
   

    {
        path:'app-buyerregistration',
        component: BuyerregistrationComponent
    },


    {
        path:'productdetails',
        component: ProductdetailsComponent
    },
   
    {
        path:'app-addgst',
        component: AddgstComponent
    },
   
    
    {
        path:'app-buyermessage',
        component: BuyermessageComponent
    },
    {
        path:'app-footercomponent',
        component: FootercomponentComponent
    },

    

    {
path : 'app-sellermessage',
component : SellermessageComponent
    },
    {
        path:'app-products',
        component: ProductsComponent
    },

    {
        path: 'app-sellerbody',  // Parent route
        component: SellerbodyComponent,
        children: [
          { path: 'leadmanager', component: SellermessageComponent },
          { path: 'buyleads', component: BuyleadsComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'dashboard', component: DashboardComponent },
          
          
          // Other child routes...
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ],
        
      },
    

   


];
