import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import {
  Component,
  Input,
  OnInit,
  booleanAttribute,
  effect,
  signal,
} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

import { EditActivityButtonComponent } from '../edit-activity-button/edit-activity-button.component';
import { Activity } from '../../models/activityModel';
import { DeleteActivityButtonComponent } from '../delete-activity-button/delete-activity-button.component';
import { UserTaskCreationComponent } from '../user-task-creation/user-task-creation.component';
import { NoDailyActivityComponent } from '../no-daily-activity/no-daily-activity.component';
import { AdminserviceService } from '../../servizi/adminservice.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../../servizi/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'daily-activity',
  standalone: true,
  imports: [
    TableModule,
    NoDailyActivityComponent,
    CommonModule,
    FooterComponent,
    EditActivityButtonComponent,
    DatePipe,
    DeleteActivityButtonComponent,
    UserTaskCreationComponent,
    ToastModule,
  ],
  templateUrl: './daily-activity.component.html',
  styleUrl: './daily-activity.component.css',
  providers: [MessageService],
})
export class DailyActivityComponent {
  dailyActivity = signal(0);
  oggettistampati!: Activity[];
  nodailyactivity: Boolean = false;
  dailyactivitycomponent: Boolean = false;

  constructor(private adminService: AdminserviceService, private messageService: MessageService, private userService: UserServiceService, private router: Router) {
    this.oggettistampati = [];

    effect(() => {
      console.log(this.dailyActivity());
      this.adminService.getActivitiesByDate().subscribe({
        next: (result: any) => {
          if (result.data.userActivities.length === 0) {
            console.log('non ci sono dati');
            this.nodailyactivity = true;
            this.dailyactivitycomponent = false;
          } else {
            console.log('ci sono dati');
            this.nodailyactivity = false;
            this.dailyactivitycomponent = true;
            this.oggettistampati = [];
            result.data.userActivities.forEach((element: any) => {
              let obj = {
                _id: element._id,
                taskName: element.taskName,
                taskID: element.taskID,
                startTime: new Date(element.startTime),
                endTime: new Date(element.endTime),
                notes: element.notes,
                userID: element.userID,
                isActive: element.isActive,
              };
              this.oggettistampati.push(obj);
            });

            console.log(this.oggettistampati);
          }
        },
        error: (err) => {
          let numberValue = parseInt(
            localStorage.getItem('submit') ?? '0',
            10
          );

          if (numberValue < 4) {
            numberValue++; // Incrementa il contatore di tentativi
            localStorage.setItem('submit', numberValue.toString());
          }

          if(numberValue == 4){
            setTimeout(() => {
              localStorage.removeItem('submit');
            }, 5000);
          }

          if (numberValue < 4) {
            this.show(err.status);
          }
        }
      });
    });
  }

  show(statusCode: number) {
    if(statusCode === 401){
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 401',
        detail: 'Sembra che tu non sia autenticato. Accedi per continuare.',
      });
      setTimeout(() => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }, 3000);
    }
    if(statusCode === 500){
      this.messageService.add({
        severity: 'error',
        summary: 'Errore 500',
        detail: 'Errore interno del server, riprova più tardi.',
      });
    }
  }

  gestiscivalori(event: any) {
    this.dailyActivity.update((c) => c + 1);
  }
}
