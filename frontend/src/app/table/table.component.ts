import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Futuretrip } from '../shared/futuretrip';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule,RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  bs = inject(BackendService)
  futuretripList: Futuretrip[] = []
  futuretrip!:Futuretrip;
  deleteFuturetrip: Futuretrip | null = null;
  deleteStatus = false;

  constructor(private router:Router){
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
  delete(id: number) {
    const futuretripToDelete = this.futuretripList.find(f => f.id === id);
    if (futuretripToDelete){
      this.deleteFuturetrip = futuretripToDelete;
      this.deleteStatus = true;
    }
  }
      
   

   openDeleteModal(futuretrip: Futuretrip) { 
    this.deleteFuturetrip = futuretrip;
    this.deleteStatus = true;
  }

  reload(deleted: boolean)
  {
    this.deleteStatus = deleted;
    this.readAllFuturetrips();
    this.router.navigate(['./futuretrips']);
  }

 
 confirm() {
  if (this.deleteFuturetrip){
    this.bs.deleteFuturetrip(this.deleteFuturetrip.id).subscribe({
      next: () => {
        this.futuretripList = this.futuretripList.filter(f => f.id !== this.deleteFuturetrip?.id);
        this.deleteStatus = false;
        this.deleteFuturetrip = null;

      },
      error: (error) => console.log('Error deleting futuretrip:', error),
        complete: () => console.log('deleteFuturetrip() completed')
      });
    }
  }

  cancel() {
    this.deleteStatus=false
    this.deleteFuturetrip = null;;
  }
  
    }
  



