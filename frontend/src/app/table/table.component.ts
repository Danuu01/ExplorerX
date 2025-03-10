import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Futuretrip } from '../shared/futuretrip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  bs = inject(BackendService)
  futuretripList: Futuretrip[] = []

  constructor(){
    this.readAllFuturetrips()
    
  }

  ngOnInit(): void {
    this.readAllFuturetrips()
      
  }

  readAllFuturetrips(){
    this.bs.getAllFuturetrips().subscribe({
      next: (response) =>{
        this.futuretripList = response;
        console.log('futuretrips',this.futuretripList);
        return this.futuretripList;
      },
      error : (error) => console.log('Error:',error),
      complete:() =>{
        console.log('getAllFuturetrip() completed')
      }
    })
  }
  delete(id: number): void {
    console.log(`Vocabulary with id=${id} deleted`);
  }
}
