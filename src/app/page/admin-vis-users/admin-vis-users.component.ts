

import { Component, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../componenti/footer/footer.component';
import { GetusersService } from '../../servizi/getusers.service';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ActivityUserService } from '../../servizi/activity-user.service';
import { DeleteUserButtonComponent } from '../../componenti/delete-user-button/delete-user-button.component';
import { User } from '../../models/userModel';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from "../../componenti/navbar-admin/navbar-admin.component";
import { DialogModule } from 'primeng/dialog';
import { AdminaddactivityforuserComponent } from '../../componenti/adminaddactivityforuser/adminaddactivityforuser.component';


@Component({
    selector: 'app-admin-vis-user',
    standalone: true,
    templateUrl: './admin-vis-users.component.html',
    styleUrls: ['./admin-vis-users.component.css'],
    imports: [TableModule, ButtonModule, CommonModule, FooterComponent, PaginatorModule, InputTextModule, FormsModule, DeleteUserButtonComponent, NavbarAdminComponent,DialogModule, ButtonModule, InputTextModule, AdminaddactivityforuserComponent]
})
export class AdminvisuserComponent implements OnInit {

  constructor(private users: GetusersService, private activityUserService: ActivityUserService,private router: Router) {}
  usersArray = signal<User[]>([]);
  value!: string;
  userActivities: any[] = [];

  

  cols = [
    { field: 'firstName', header: 'Nome' },
    { field: 'lastName', header: 'Cognome' },
    { field: 'codiceFiscale', header: 'Codice Fiscale' },
    { field: 'email', header: 'Email' },
  ];

  filteredUsers: User[] = [];
  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  visible: boolean = false;

  visibleNoActivity: boolean = false;

  showDialog() {
      this.visible = true;
  }

  limit!: number;
  first: number = 0;
  rows: number = 10;

  filterUsers() {
    this.filteredUsers = this.usersArray().filter(user => {
      const matchesText = !this.searchText ||
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.codiceFiscale.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesDate = true; // Always true since we're not filtering by date anymore
      return matchesText && matchesDate;
    });
  }

  ngOnInit(): void {
    this.users.getData().subscribe((data: any) => {
      data.data.document.forEach((item: any) => {
        this.usersArray().push({
          firstName: item.firstName,
          lastName: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
          _id: item._id,
          role: item.role
        });
      });
      this.filterUsers();
    });
  }
  getActivity(id: string) {
    const userId = id;
    this.activityUserService.getActivities(userId).subscribe((result: any) => {
      this.userActivities = result;
      if(result.data.activities.length == 0){
        this.visibleNoActivity = true
      }
      else{
         this.router.navigate(['/admin-vis-utente-specifico',userId])
      }
    });
    console.log(this.userActivities);
  }

  onPageChange(event: any) {
    const pageNumber = (event.page + 1);
    this.usersArray.set([]);
    this.users.getData25(pageNumber, this.limit).subscribe((data: any) => {
      data.data.document.forEach((item: any) => {
        console.log(item);
        this.usersArray().push({
          firstName: item.firstName,
          lastName: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
          _id: item._id,
          role: item.role
        });
      });
      this.filterUsers();
    });
    console.log(pageNumber);
  }

  changeLimit() {
    const currentPage = this.first / this.rows + 1; // Calcola la pagina corrente
    this.users.getData25(currentPage, this.limit).subscribe((data: any) => {
      this.usersArray.set([]);
      data.data.document.forEach((item: any) => {
        console.log(item);
        this.usersArray().push({
          firstName: item.firstName,
          lastName: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
          _id: item._id,
          role: item.role
        });
      });
      this.filterUsers();
    });
    console.log(this.limit);
  }

  userDeleted(){
    console.log('User deleted');
    this.usersArray.set([]);
    this.filterUsers();
    this.users.getData().subscribe((data: any) => {
      data.data.document.forEach((item: any) => {7
        console.log(item)
        this.usersArray().push({
          firstName: item.firstName,
          lastName: item.lastName,
          codiceFiscale: item.codiceFiscale,
          email: item.email,
          _id: item._id,
          role: item.role
        });
      });
      this.filterUsers();
    });
  }
}