import { Component , OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators, AbstractControl} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent implements OnInit {
  employeeForm = new FormGroup({
    formId: new FormControl(''),

    firstName: new FormControl('',
    [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[\u0590-\u05FF\s]+$'),
    ]
    ),
    lastName: new FormControl('',
    [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[\u0590-\u05FF\s]+$'),
    ]),
    title: new FormControl(''),
    department: new FormControl(''),
    isCarOwner: new FormControl(''),
    age: new FormControl('',
    [
      Validators.required,
      Validators.pattern('^(1[8-9]|[2-9]\\d)$'),
    ])
  });

  titlesOptions = ['מפתח/ת FS', 'מפתחת/ת BI', 'גזבר/ית', 'משא״ן', 'פקיד/ה'];
  departmentsOptions = ['ניקיון', 'מערכות מידע', 'כספים', 'משא״ן'];

  isUpdatingForm = false;
  isUserExist = false;

  constructor(private dataService : DataService) {}

  ngOnInit() {
    this.setFormObserver();
    this.dataService.getAllDepartments().subscribe((departments : string[]) => {
      this.departmentsOptions = departments;
    });
    this.dataService.getAllTitles().subscribe((titles : string[]) => {
      this.titlesOptions = titles;
    });
  }

  setFormObserver() {
    this.dataService.employeeObserver.subscribe((employee : Employee) => {
      this.employeeForm.controls['age'].setValue(employee.age.toString());
      this.employeeForm.controls['firstName'].setValue(employee.firstName);
      this.employeeForm.controls['lastName'].setValue(employee.lastName);
      this.employeeForm.controls['title'].setValue(employee.title);
      this.employeeForm.controls['department'].setValue(employee.department);
      this.employeeForm.controls['isCarOwner'].setValue(employee.isCarOwner.toString());
      this.employeeForm.controls['formId'].setValue(employee.id.toString());
      this.isUpdatingForm = true;
    });
  }

  isDisplayError() {
    let isDisplay = false;
    
    if(this.employeeForm.invalid && (this.employeeForm.dirty || this.employeeForm.touched)) {
      isDisplay = true;
    }

    return isDisplay;
  }

  addEmployee() {
    let employee : Employee = {
      'firstName' : this.employeeForm.value.firstName || '', 
      'lastName' : this.employeeForm.value.lastName || '', 
      'title' : this.employeeForm.value.title || '',
      'department' : this.employeeForm.value.department || '',
      'isCarOwner' : !!this.employeeForm.value.isCarOwner,
      'age' : Number(this.employeeForm.value.age),
      'id': this.isUpdatingForm ? (this.employeeForm.value.formId || '') : (this.dataService.employeeList?.length.toString() || Symbol().toString())};

    if(this.isUpdatingForm) {
      this.dataService.updateEmployee(employee).subscribe(() => {
        this.dataService.updateEmployeesList(employee);
      }, (error : any) => {})
    }

    else {
      try {
        if(this.employeeForm.valid) {
          this.dataService.getEmployee(employee.firstName, employee.lastName, employee.age).subscribe((employees : Employee[]) => {
            console.warn(employees)
            if(employees[0] && employees[0].id) {
              this.isUserExist = true;
            }

            else {
              this.addNewEmployee(employee);
            }
          });
        }
    
      }
    
      catch (error : any) { }
    }
  }

  addNewEmployee(employee : Employee) {
    this.dataService.addEmployee(employee).subscribe((employee : Employee) => {
      this.employeeForm.markAsPristine();
      this.employeeForm.markAsUntouched();
      this.employeeForm.updateValueAndValidity();
      this.employeeForm.reset();
      this.dataService.addEmployeeToEmployeesList(employee);
      this.isUserExist = false;
      }, (error : any) => {});
  }
}
