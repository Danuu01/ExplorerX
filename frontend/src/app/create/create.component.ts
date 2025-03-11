import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Router } from '@angular/router';
import { Futuretrip } from '../shared/futuretrip';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';




@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private bs = inject(BackendService)
  private router = inject(Router)
  futuretrip: Futuretrip = {id: 0, country : '', city: '' , season: '',sightseeing: '', budget: 0,notes:''}
  saved: boolean = false

  modalValues: any={};

  form = new FormGroup({
    countryControl : new FormControl<string>('',[Validators.required]),
    cityControl : new FormControl<string>('', [Validators.required]),
    seasonControl : new FormControl<string>(''),
    sightseeingControl : new FormControl<string>(''),
    budgetControl: new FormControl<number| null>(null),
    notesControl: new FormControl<string>('') 

  });

  create(): void{
    const values = this.form.value;
    console.log('values : ' ,values)
    this.futuretrip.country = values.countryControl || '';
    this.futuretrip.city = values.cityControl || '';
    this.futuretrip.season = values.seasonControl || '';
    this.futuretrip.sightseeing = values.sightseeingControl || '';
    this.futuretrip.budget = values.budgetControl || 0;
    this.futuretrip.notes = values.notesControl || '';
    console.log('new futuretrip :' , this.futuretrip)


    if(this.futuretrip.country!='' && this.futuretrip.city!=''){
      this.bs.create(this.futuretrip)
      .subscribe(()=>{
        this.saved = true;
        this.router.navigate(['/table']);
        
      });
     }
  }
  confirm(): void{
      this.modalValues = {
      country: this.form.value.countryControl || '',
      city: this.form.value.cityControl || '',
      season: this.form.value.seasonControl || '',
      sightseeing: this.form.value.sightseeingControl || '',
      budget: this.form.value.budgetControl || '',
      notes: this.form.value.notesControl || ''
    };
    
    // Modal-Dialog 
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal')!);
    modal.show();
    const confirmButton = document.getElementById('confirmButton')!;
    confirmButton.addEventListener('click', () => {
      this.create(); 
      modal.hide(); 
    });
  }

  cancel(): void{
  this.router.navigate(['/table']);
  }

}
