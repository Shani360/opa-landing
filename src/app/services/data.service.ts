import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:8000';
  public employeeList : Employee[] = [];

  private employeeSubject = new Subject<Employee>();
  public employeeObserver = this.employeeSubject.asObservable();
  
  private employeesSubject = new Subject<Employee[]>();
  public employeesObserver = this.employeesSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  addEmployee(employee : Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.url}/employees`, employee);
  }

  getAllEmployees(): Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(`${this.url}/employees`);
  }

  getEmployee(firstName : string, lastName : string, age : number): Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(`${this.url}/employees?firstName=${firstName}&lastName=${lastName}&age=${age}`);
  }

  updateEmployee(employee : any): Observable<Employee> {
      return this.httpClient.put<Employee>(`${this.url}/employees/${employee.id}`, employee);
  }

  sendEmployeeData(data: Employee) {
    this.employeeSubject.next(data);
  }

  updateEmployeesList(employee : Employee) {
    const foundIndex = this.employeeList.findIndex(emp => emp.id === employee.id);
    this.employeeList[foundIndex] = employee;

    this.employeesSubject.next(this.employeeList);
  }
  
  addEmployeeToEmployeesList(employee : Employee) {
    const updatedEmployees : Employee[] = [...this.employeeList, employee];
    this.employeesSubject.next(updatedEmployees);
  }

  getAllTitles() {
    return this.httpClient.get<string[]>(`${this.url}/titles`);
  }
  
  getAllDepartments() {
    return this.httpClient.get<string[]>(`${this.url}/departments`);
  }
}
