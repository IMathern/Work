import { Component, OnInit } from '@angular/core';

import { Employee} from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  //employees: Array<Employee>;

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {

    this.getEmployees();

  }

  getEmployees(): void {
     this.employeeService.getEmployees()
         .subscribe(employees => this.employees = employees);
  }

/*   add(nom: string): void {
    nom = nom.trim();
    if (!nom) { return; }
    this.employeeService.addEmployee({ nom } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  } */

  add(nom: string, prenom : string): void {
    nom = nom.trim();
    prenom = prenom.trim();
    if (!nom) { return; }
    if (!prenom) { return; }
    this.employeeService.addEmployee({ nom, prenom } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });

    }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

}

