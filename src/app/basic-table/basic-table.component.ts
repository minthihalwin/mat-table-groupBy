import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { MatTableDataSource } from '../../lib/table-data-source';
import { MatGroupBy, Grouping } from '../../lib/groupBy';

import { People, SampleDataService } from '../sample-data.service';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css']
})
export class BasicTableComponent implements OnInit {

  displayedColumns: string[] = ['surname', 'forename', 'gender', 'ukCity', 'salary', 'department'];

  dataSource = new MatTableDataSource<People>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sampleDataService: SampleDataService,
    private matGroupBy: MatGroupBy,
    ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.matGroupBy.grouping = new Grouping(['salary', 'ukCity']);
    this.dataSource.groupBy = this.matGroupBy;
    this.dataSource.data = this.sampleDataService.people;
  }
}
