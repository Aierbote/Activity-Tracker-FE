import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { LogoutService } from '../../servizi/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [SidebarModule,ButtonModule,RippleModule,AvatarModule,StyleClassModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  sidebarVisible: boolean = false;

  constructor(private logoutService: LogoutService, private router: Router) { }

  logout() {
    this.logoutService.logout().subscribe(
      response => {
        this.router.navigate(['/home']);
      },
    );
  }
}