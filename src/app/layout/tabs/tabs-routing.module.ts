import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'language-selection',
        loadChildren: () => import('../../pages/language-selection/language-selection.module').then( m => m.LanguageSelectionPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../../layout/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('../../pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
      },
      {
        path: 'fuel-cost-calculator',
        loadChildren: () => import('../../pages/fuel-cost-calculator/fuel-cost-calculator.module')
          .then(m => m.FuelCostCalculatorPageModule)
      },
      {
        path: 'time-calculator',
        loadChildren: () => import('../../pages/time-calculator/time-calculator.module')
          .then(m => m.TimeCalculatorPageModule)
      },
      {
        path: 'range-calculator',
        loadChildren: () => import('../../pages/range-calculator/range-calculator.module')
          .then(m => m.RangeCalculatorPageModule)
      },
      {
        path: 'fuel-quantity-calculator',
        loadChildren: () => import('../../pages/fuel-quantity-calculator/fuel-quantity-calculator.module')
          .then(m => m.FuelQuantityCalculatorPageModule)
      },
 
      {
        path: 'fuel-quantity-price',
        loadChildren: () => import('../../pages/fuel-quantity-price/fuel-quantity-price.module').then( m => m.FuelQuantityPricePageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../../pages/history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'tractor-fuel-calculator',
        loadChildren: () => import('../../pages/tractor-fuel-calculator/tractor-fuel-calculator.module')
          .then(m => m.TractorFuelCalculatorPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
