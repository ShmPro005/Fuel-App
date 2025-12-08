import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './layout/menu/menu.page';
import { GuardService } from './shared/srv/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'language-selection', // First page should be the language selection
    pathMatch: 'full'
  },
  {
    path: 'language-selection',
    loadChildren: () => import('./pages/language-selection/language-selection.module').then(m => m.LanguageSelectionPageModule)
  },
  {
    path: 'user-login',
    loadChildren: () => import('./auth-page/user-login/user-login.module').then(m => m.UserLoginPageModule)
  },
  {
    path: 'tabs',
    component: MenuPage,
    canActivate: [GuardService], // Only allow authenticated users
    children: [
      {
        path: '',
        loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'language-selection',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
