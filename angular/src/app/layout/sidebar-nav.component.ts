import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l("HomePage"), "", "home", "/app/home"),

        new MenuItem(this.l("Tenants"), "Pages.Tenants", "business", "/app/tenants"),
        new MenuItem(this.l("Sample Status"), "", "info", "/app/samplestatus"),
        new MenuItem(this.l("DashBoard"), "", "info", "/app/dashboard"),
        new MenuItem(this.l("Batch Set Up"), "", "event", "/app/batchsetup"),
        new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
        new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),
        // new MenuItem(this.l("Events"), "Pages.Events", "event", "/app/events"),
        // new MenuItem(this.l("About"), "", "info", "/app/about"),
        new MenuItem(this.l("Patients"), "", "people", "/app/consumers"),
        new MenuItem(this.l("Book Package"), "", "info", "/app/bookpackage"),

        // new MenuItem(this.l("MultiLevelMenu"), "", "menu", "", [
        //     new MenuItem("ASP.NET Boilerplate", "", "", "", [
        //         new MenuItem("Home", "", "", "https://aspnetboilerplate.com/?ref=abptmpl"),
        //         new MenuItem("Templates", "", "", "https://aspnetboilerplate.com/Templates?ref=abptmpl"),
        //         new MenuItem("Samples", "", "", "https://aspnetboilerplate.com/Samples?ref=abptmpl"),
        //         new MenuItem("Documents", "", "", "https://aspnetboilerplate.com/Pages/Documents?ref=abptmpl")
        //     ]),
        //     new MenuItem("ASP.NET Zero", "", "", "", [
        //         new MenuItem("Home", "", "", "https://aspnetzero.com?ref=abptmpl"),
        //         new MenuItem("Description", "", "", "https://aspnetzero.com/?ref=abptmpl#description"),
        //         new MenuItem("Features", "", "", "https://aspnetzero.com/?ref=abptmpl#features"),
        //         new MenuItem("Pricing", "", "", "https://aspnetzero.com/?ref=abptmpl#pricing"),
        //         new MenuItem("Faq", "", "", "https://aspnetzero.com/Faq?ref=abptmpl"),
        //         new MenuItem("Documents", "", "", "https://aspnetzero.com/Documents?ref=abptmpl")
        //     ])
        // ])
    
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}
