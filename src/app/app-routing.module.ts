import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { ModelsComponent } from './components/models/models.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MilestonesComponent } from './components/milestones/milestones.component';


const routes: Routes = [
  { path: "about-us", component: MilestonesComponent     },
  { path: "contact", component: ContactUsComponent },
  { path: "sponsors", component: SponsorsComponent    },
  { path: "models", component: ModelsComponent    },
  { path: "", component: IntroComponent    },
  { path: "*"     , component: IntroComponent      }, // Home Page
  { path: "**"     , component: IntroComponent      }, // Home Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
