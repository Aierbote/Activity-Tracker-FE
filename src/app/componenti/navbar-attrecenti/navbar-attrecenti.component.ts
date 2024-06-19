import { Component, OnInit, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserManualComponent } from '../user-manual/user-manual.component';
import { RouterLink } from '@angular/router';

import { ServiceloginService } from '../../servizi/servicelogin.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DropDownUserComponent } from "../drop-down-user/drop-down-user.component";

interface UserNameResponse {
    data: {
        firstName: string;
        lastName: string;
    };
}

@Component({
    selector: 'app-navbar-attrecenti',
    standalone: true,
    templateUrl: './navbar-attrecenti.component.html',
    styleUrls: ['./navbar-attrecenti.component.css'],
    imports: [MenubarModule, ButtonModule, UserManualComponent, RouterLink, SidebarComponent, DropDownUserComponent]
})
export class NavbarAttrecentiComponent implements OnInit {
    @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

    firstName: string = '';
    lastName: string = '';

    constructor(private servizio: ServiceloginService) {}

    ngOnInit() {
        this.servizio.getUsernamelastNameUser().subscribe({
            next: (result: UserNameResponse) => {
                this.firstName = result.data.firstName;
                this.lastName = result.data.lastName;
            },
            error: (error: any) => {
                console.error('Si è verificato un errore:', error);
            }
        });
    }
}
