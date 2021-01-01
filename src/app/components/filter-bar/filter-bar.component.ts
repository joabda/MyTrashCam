import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { FilterBarJSON } from 'src/app/interfaces/json/filterBarJSON';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit{

  text: FilterBarJSON;
  pictures: PictureJSON[];
  modelsNames: Array<string>;
  regions: Array<string>;
  modelsControl: FormControl;
  regionsControl: FormControl;
  filteredModelName: Observable<string[]>;
  filteredRegions: Observable<string[]>;

  constructor(public data: DataService) {
    data.language.subscribe( () => {
      this.text = data.getFilterBarText();
      this.pictures = data.getPictures();
    });
    this.modelsControl = new FormControl();
    this.regionsControl = new FormControl();
    this.modelsNames = new Array<string>();
    this.regions = new Array<string>();
    for (var index in this.pictures) {
      if(this.modelsNames.indexOf(this.pictures[index].model) === -1) {
        this.modelsNames.push(this.pictures[index].model);
      }
      if(this.regions.indexOf(this.pictures[index].location) === -1 
        && this.pictures[index].location != undefined) {
        this.regions.push(this.pictures[index].location);
      }
    }
    this.modelsNames.sort();
    this.regions.sort();
    console.log(this.regions)
  }

  ngOnInit() {
    this.filteredModelName = this.modelsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.modelsNames, value))
    );
    this.filteredRegions = this.regionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.regions, value))
    );
  }

  private _filter(array: Array<string>, value: string): string[] {
    const filterValue: string = this._normalizeValue(value);
    return array.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
