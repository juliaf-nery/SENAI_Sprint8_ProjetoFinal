import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadComponent: () => {
            return import("./pages/inicio/inicio.component")
                .then(c => c.InicioComponent);
        }
    },

    {
        path: "",
        pathMatch: "full",
        loadComponent: () => {
            return import("./pages/login/login.component")
                .then(c => c.LoginComponent);
        }
    },

    {
        path: "",
        pathMatch: "full",
        loadComponent: () => {
            return import("./pages/home/home.component")
                .then(c => c.HomeComponent);
        }
    },
];
