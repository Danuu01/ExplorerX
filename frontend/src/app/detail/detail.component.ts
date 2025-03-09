import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Futuretrip } from '../shared/futuretrip';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  private bs = inject(BackendService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  futuretrip!: Futuretrip;
  id: string | null = ''
  form = new FormGroup({
    countryControl : new FormControl<String>(''),
    cityControl : new FormControl<String>(''),
    seasonControl : new FormControl<String>(''),
    sightseeingControl : new FormControl<String>(''),
    budgetControl : new FormControl<number | null>(null),
    notesControl: new FormControl<String>(''),
  });
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id);
    this.bs.getOneFuturetrip(Number(this.id!))
    .subscribe(response => {
      this.futuretrip = response;
      console.log('futuretrip = ', this.futuretrip)   

      this.form.patchValue({
      countryControl : this.futuretrip.country,
      cityControl : this.futuretrip.city,
      seasonControl : this.futuretrip.season,
      sightseeingControl : this.futuretrip.sightseeing,
      budgetControl : this.futuretrip.budget,
      notesControl : this.futuretrip.notes
      });
      
    },
    error => console.error('Error in DetailComponent: ', error)
    )
    
  }
  update() {
    const values = this.form.value;
      this.futuretrip.country = values.countryControl!;
      this.futuretrip.city = values.cityControl!;
      this.futuretrip.season = values.seasonControl!;
      this.futuretrip.sightseeing = values.sightseeingControl!;
      this.futuretrip.budget = values.budgetControl!;
      this.futuretrip.notes = values.notesControl!;
  
      this.bs.updateFuturetrip(Number(this.id), this.futuretrip)
      .subscribe({
        next: () => this.router.navigate(['/table']),
        error: (err) => console.error('Error updating futuretrip:', err)
      });
  
  }
  cancel(): void {
    this.router.navigate(['./table']);
  }

}
