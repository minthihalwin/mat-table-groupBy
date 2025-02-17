import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

export interface VehiclesInspectionDto {
  id: number;
  shipName?: string;
  voyage?: string;
  port?: string;
  carmarke?: string;
  carModel?: string;
}

@Component({
  selector: "app-vehicle-inspection",
  templateUrl: "./vehicle-inspection.component.html",
  styleUrls: ["./vehicle-inspection.component.css"],
})
export class VehicleInspectionComponent {
  displayedColumns: string[] = ["port", "carmarke", "carModel"]; // Data columns

  dataSource = new MatTableDataSource<any>();
  groupedData: any[] = [];
  expandedGroups = new Set<string>(); // Tracks expanded/collapsed groups

  originalData: VehiclesInspectionDto[] = [
    {
      id: 1,
      shipName: "Titanic",
      voyage: "001",
      port: "Auckland",
      carmarke: "Toyota",
      carModel: "Corolla",
    },
    {
      id: 2,
      shipName: "Titanic",
      voyage: "001",
      port: "Wellington",
      carmarke: "Honda",
      carModel: "Civic",
    },
    {
      id: 3,
      shipName: "Poseidon",
      voyage: "002",
      port: "Auckland",
      carmarke: "Ford",
      carModel: "Focus",
    },
    {
      id: 4,
      shipName: "Poseidon",
      voyage: "002",
      port: "Wellington",
      carmarke: "BMW",
      carModel: "X5",
    },
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.groupData();
    this.dataSource = new MatTableDataSource(this.groupedData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  groupData() {
    const grouped: any[] = [];
    const map = new Map<string, any>();

    this.originalData.forEach((item) => {
      const key = `${item.shipName}-${item.voyage}`;
      if (!map.has(key)) {
        map.set(key, {
          shipName: item.shipName,
          voyage: item.voyage,
          isGroup: true,
        });
        grouped.push(map.get(key)); // Add group header row
      }
      grouped.push(item); // Add actual data row
    });

    this.groupedData = grouped;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  toggleGroup(shipName: string, voyage: string) {
    const key = `${shipName}-${voyage}`;
    if (this.expandedGroups.has(key)) {
      this.expandedGroups.delete(key);
    } else {
      this.expandedGroups.add(key);
    }
    this.dataSource.filter = ""; // Refresh table
  }

  isGroup(index: number, item: any): boolean {
    return item.isGroup;
  }

  isRowVisible(item: any): boolean {
    if (!item.isGroup) {
      const key = `${item.shipName}-${item.voyage}`;
      return this.expandedGroups.has(key);
    }
    return true; // Group headers are always visible
  }

  getRawDataCount(): number {
    return this.groupedData.filter((item) => !item.isGroup).length;
  }
}
