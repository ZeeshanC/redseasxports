import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './core/product-list/product-list.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
	{
		path: 'products',
		component: ProductListComponent
	},
	{
		path: '',
		component: HomepageComponent
	}
];