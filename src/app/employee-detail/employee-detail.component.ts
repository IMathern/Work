import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { Location, getLocaleDateFormat } from '@angular/common';

import { EmployeeService }  from '../employee.service';

//dual-list
import { DualListComponent } from '../dual-list/dual-list.component';
import { Subject } from 'rxjs/Subject';
import { PostsService }  from '../posts.service';
import { Post } from "../posts";
//fin dual-list

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  //dual-liste
  @Input() posts = Array<Post>();
  //fin dual-list
  radioItems: Array<string>;
  model   = {option: 'M'};

  //date = new Date('2017-11-07');
  //date = this.employee != null ? this.employee.dateNaissance : Date.now();
  //new DatePipe('en-US').transform(Date.now(), 'dd/MM/yyyy');
  // date = new Date(new DatePipe('en-US').transform(Date.now(), 'MM/dd/yyyy'));

  workDate = this.employee != null ? this.employee.dateNaissance : Date.now();
  date = new Date(new DatePipe('en-US').transform(this.workDate, 'MM/dd/yyyy')); 

  updOutItemProf(item: number) {
    //item = 2;
    this.employee.idProfession = item;

  } 

  updOutItemQuali(item: number) {
    //item = 2;
    this.employee.idQualification = item;

  }  

  toggleVisibility(event)
  {
    return event.value;
  }

  inputEvent(event){   
    this.date = event.value;
    this.employee.dateNaissance = (new DatePipe('en-US').transform(this.date, 'yyyy-MM-ddTHH:mm:ss')) as unknown as Date;
    //this.employee.dateNaissance = new Date((new DatePipe('en-US').transform(this.date, 'yyyy-MM-ddTHH:mm:ss')));
    return event.value;

  }

  changeEvent(event){
    this.date = event.value;
    this.employee.dateNaissance = (new DatePipe('en-US').transform(this.date, 'yyyy-MM-ddTHH:mm:ss')) as unknown as Date;
  //this.employee.dateNaissance = new Date((new DatePipe('en-US').transform(this.date, 'yyyy-MM-ddTHH:mm:ss')));
    return event.value;
  }

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private postsService: PostsService //dual liste
  ) 
  {
    this.radioItems = ['F', 'M'];
  }

  //dual-list
  tab = 1;
  keepSorted = true;
  key: string;
  display: string;
  filter = false;
  source: Array<any>;
  confirmed: Array<any>;
  userAdd = '';
  disabled = false;

  sourceLeft = true;
  format: any = DualListComponent.DEFAULT_FORMAT;

  private sourceStations: Array<any>;

  private confirmedStations: Array<any>;


/*   private stations: Array<any> = [
    { key: 1, station: 'Antonito', state: 'CO' },
    { key: 2, station: 'Big Horn', state: 'NM' },
    { key: 3, station: 'Sublette', state: 'NM' },
    { key: 4, station: 'Toltec', state: 'NM' },
    { key: 5, station: 'Osier', state: 'CO' },
    { key: 6, station: 'Chama', state: 'NM' },
    { key: 7, station: 'Monero', state: 'NM' },
    { key: 8, station: 'Lumberton', state: 'NM' },
    { key: 9, station: 'Duice', state: 'NM' },
    { key: 10, station: 'Navajo', state: 'NM' },
    { key: 11, station: 'Juanita', state: 'CO' },
    { key: 12, station: 'Pagosa Jct', state: 'CO' },
    { key: 13, station: 'Carracha', state: 'CO' },
    { key: 14, station: 'Arboles', state: 'CO' },
    { key: 15, station: 'Solidad', state: 'CO' },
    { key: 16, station: 'Tiffany', state: 'CO' },
    { key: 17, station: 'La Boca', state: 'CO' },
    { key: 18, station: 'Ignacio', state: 'CO' },
    { key: 19, station: 'Oxford', state: 'CO' },
    { key: 20, station: 'Florida', state: 'CO' },
    { key: 21, station: 'Bocea', state: 'CO' },
    { key: 22, station: 'Carbon Jct', state: 'CO' },
    { key: 23, station: 'Durango', state: 'CO' },
    { key: 24, station: 'Home Ranch', state: 'CO' },
    { key: 25, station: 'Trimble Springs', state: 'CO' },
    { key: 26, station: 'Hermosa', state: 'CO' },
    { key: 27, station: 'Rockwood', state: 'CO' },
    { key: 28, station: 'Tacoma', state: 'CO' },
    { key: 29, station: 'Needleton', state: 'CO' },
    { key: 30, station: 'Elk Park', state: 'CO' },
    { key: 31, station: 'Silverton', state: 'CO' },
    { key: 32, station: 'Eureka', state: 'CO' }
  ]; */

  private stations: Array<any> = [
    { key: 1, station: 'Antonito', state: 'CO' },
    { key: 2, station: 'Big Horn', state: 'NM' },
    { key: 3, station: 'Sublette', state: 'NM' },
    { key: 4, station: 'Toltec', state: 'NM' },
    { key: 5, station: 'Osier', state: 'CO' },
    { key: 6, station: 'Chama', state: 'NM' },
    { key: 7, station: 'Monero', state: 'NM' },
    { key: 8, station: 'Lumberton', state: 'NM' },
    { key: 9, station: 'Duice', state: 'NM' },
    { key: 10, station: 'Navajo', state: 'NM' },
    { key: 11, station: 'Juanita', state: 'CO' },
    { key: 12, station: 'Pagosa Jct', state: 'CO' },
    { key: 13, station: 'Carracha', state: 'CO' },
    { key: 14, station: 'Arboles', state: 'CO' },
    { key: 15, station: 'Solidad', state: 'CO' },
    { key: 16, station: 'Tiffany', state: 'CO' },
    { key: 17, station: 'La Boca', state: 'CO' },
    { key: 18, station: 'Ignacio', state: 'CO' },
    { key: 19, station: 'Oxford', state: 'CO' },
    { key: 20, station: 'Florida', state: 'CO' },
    { key: 21, station: 'Bocea', state: 'CO' },
    { key: 22, station: 'Carbon Jct', state: 'CO' },
    { key: 23, station: 'Durango', state: 'CO' },
    { key: 24, station: 'Home Ranch', state: 'CO' },
    { key: 25, station: 'Trimble Springs', state: 'CO' },
    { key: 26, station: 'Hermosa', state: 'CO' },
    { key: 27, station: 'Rockwood', state: 'CO' },
    { key: 28, station: 'Tacoma', state: 'CO' },
    { key: 29, station: 'Needleton', state: 'CO' },
    { key: 30, station: 'Elk Park', state: 'CO' },
    { key: 31, station: 'Silverton', state: 'CO' },
    { key: 32, station: 'Eureka', state: 'CO' }
  ];


  //fin dual-list

  ngOnInit(): void {
    this.getEmployee();
    //dual-list
    this.doReset();
    //complemet dual-list
    this.getPosts();

  }

  //dual-liste
  getPosts(): void {
    this.postsService.getPosts()
        .subscribe(posts => this.posts = posts);
 }
  //fin dual-liste
  
  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

  //dual-list
  private useStations() {
    this.key = 'key';
    this.display = 'station'; // [ 'station', 'state' ];
    this.keepSorted = true;
    this.source = this.sourceStations;
    this.confirmed = this.confirmedStations;
  }
  doReset() {
    this.sourceStations = JSON.parse(JSON.stringify(this.stations));
  
    this.confirmedStations = new Array<any>();

    // Preconfirm some items.
    this.confirmedStations.push(this.stations[31]);
    this.confirmedStations.push(this.stations[30]);
    this.confirmedStations.push(this.stations[29]);

    this.useStations();
  }



  filterBtn() {
    return (this.filter ? 'Hide Filter' : 'Show Filter');
  }

  doDisable() {
    this.disabled = !this.disabled;
  }

  disableBtn() {
    return (this.disabled ? 'Enable' : 'Disabled');
  }

  swapDirection() {
    this.sourceLeft = !this.sourceLeft;
    this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
  }
  //fin dual-list

  //complement dual list

  //fin complemnt dual liste

}
