import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { Activity } from '../../model/activityModel';

@Component({
  selector: 'edit-activity-form',
  standalone: true,
  imports: [FormsModule, CalendarModule, ReactiveFormsModule, InputTextareaModule, FloatLabelModule, DropdownModule, ButtonModule, RippleModule],
  templateUrl: './edit-activity-form.component.html',
  styleUrl: './edit-activity-form.component.css'
})
export class EditActivityFormComponent implements OnInit{
  @Input({required: true}) activity!: Activity;

  activityToEdit = signal<any>({});
  activityTypes = signal<string[]>([""]);
  selectedActivityType = signal<string>("");

  ngOnInit() {
    const dateArray = [this.activity.activityDate.getFullYear(), this.activity.activityDate.getMonth(), this.activity.activityDate.getDate()];
    const orarioInizioArray = this.activity.startTime.split(':');
    const orarioFineArray = this.activity.endTime.split(':');
    const newActivity = {
      taskName: this.activity.taskName,
      activityDate: new Date(dateArray[0], dateArray[1], dateArray[2]),
      startTime: new Date(0, 0, 0, parseInt(orarioInizioArray[0]), parseInt(orarioInizioArray[1])), //al submit si farà il getTime
      endTime: new Date(0, 0, 0, parseInt(orarioFineArray[0]), parseInt(orarioFineArray[1])), //al submit si farà il getTime
      notes: this.activity.notes,
    }
    const newActivityTypes = ["Running", "Swimming", "Cycling", "Walking", "Gym", "Yoga", "Pilates", "Dance", "Meditation", "Other"];
    this.activityToEdit.set(newActivity);
    this.activityTypes.set(newActivityTypes);
    this.selectedActivityType.set(this.activity.taskName);
  }

  activityForm = new FormGroup({
    data: new FormControl(this.activityToEdit().data, [Validators.required]),
    orarioInizio: new FormControl(this.activityToEdit().orarioInizio, [Validators.required]),
    orarioFine: new FormControl(this.activityToEdit().orarioFine, [Validators.required]),
    activityType: new FormControl(this.activityToEdit().activityType, [Validators.required]),
    note: new FormControl(this.activityToEdit().note, [Validators.required]),
  })

  onSubmitForm() {
    // console.log(this.activityForm.value);
    // PRIMA DI FARE IL POST, BISOGNA CONVERTIRE I VALORI DEL FORM IN UN OGGETTO ACTIVITY
  }
}