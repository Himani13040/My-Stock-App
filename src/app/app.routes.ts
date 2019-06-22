import { Routes } from '@angular/router';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
{
    path: 'my-dashboard',
    component: MyDashboardComponent,
//   resolve: {
//     data: CategoriesResolver
// 	}
},
{
    path: 'home',
    component: HomeComponent,
// resolve: {
//   data: CategoryQuestionsResolver
// }
},
// {
//     path: 'question/:questionSlug',
//     component: QuestionAnswersComponent,
//     resolve: {
//       data: QuestionAnswersResolver
//   	}
// }
];
