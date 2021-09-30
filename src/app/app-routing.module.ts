import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./component/sign-up/sign-up.component";
import {HomeComponent} from "./component/home/home/home.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./component/folder/folder.module').then(m => m.FolderPageModule)
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
