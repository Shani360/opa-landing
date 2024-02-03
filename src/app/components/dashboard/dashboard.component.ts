import { Component , ViewChild , OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Employee } from '../../interfaces/employee';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public readonly displayedColumns: string[] = ['formId', 'name', 'title', 'department', 'isCarOwner', 'age'];
  public dataSource = new MatTableDataSource<Employee>(this.dataService.employeeList);
  @ViewChild('empTbSort') empTbSort = new MatSort();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public dataService : DataService) {
    this.dataService.getAllEmployees();
  }

  ngOnInit() {
    this.dataService.getAllEmployees().subscribe((employeeList : Employee[]) => {
     this.dataService.employeeList = employeeList;
     this.dataSource = new MatTableDataSource<Employee>(this.dataService.employeeList);
     this.refreshPaginator();

    }, (error : any) => {});

    this.dataService.employeesObserver.subscribe((employeeList  : Employee[]) => {

      if(employeeList) {
        this.dataService.employeeList = employeeList;
        this.dataSource = new MatTableDataSource<Employee>(employeeList);
        this.refreshPaginator();
      }
    });
  } 

  ngAfterViewInit() {
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'שורות לעמוד';
    }

    this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;
  }

  loadForm(employee: Employee) {
    this.dataService.sendEmployeeData(employee);
  }

  refreshPaginator() {
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
