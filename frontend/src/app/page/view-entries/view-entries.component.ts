import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntriesService } from '../../services/entries.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entries } from '../../models/entries';

@Component({
  selector: 'app-view-entries',
  templateUrl: './view-entries.component.html',
  styleUrls: ['./view-entries.component.css'],
})
export class ViewEntriesComponent implements OnInit {
  id: string;
  entries: Entries;
  myForm: FormGroup;
  constructor(
    private ActivateRouter: ActivatedRoute,
    private entriesService: EntriesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.ActivateRouter.snapshot.paramMap.get('id');
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }

  onClick() {
    this.location.back();
  }

  ngOnInit(): void {
    this.ActivateRouter.params.subscribe((params) => {
      (this.id = params['id']),
        this.entriesService.getEntrie(this.id).subscribe(
          (res) => {
            (this.entries = res), console.log(res);
          },
          (err) => console.log(err)
        );
    });
  }

  SaveEntrie() {
    this.entriesService
      .updateProduct(this.id, this.entries)
      .subscribe((res) => {
        (this.entries = res),
          console.log(res),
          this.myForm.reset(),
          this.router.navigate(['/entries']);
        this.getEntriesList(), this.openSnackBar('Entrie Saved!', 'clear');
      });
  }

  getEntriesList() {
    this.entriesService.getListEnties().subscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
