import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntriesService } from '../../services/entries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Entries } from 'src/app/models/entries';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrls: ['./list-entries.component.css'],
})
export class ListEntriesComponent implements OnInit {
  private entries$: Subscription;
  public entries: Array<any> = [];
  myForm: FormGroup;
  p: number = 1;
  total = Entries.length;
  public loading = false;
  constructor(
    private entriesServices: EntriesService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.entries$ = this.entriesServices.entries$.subscribe(
      (observable) => (this.entries = observable)
    );
    this.getEntriesList();
  }

  ngOnDestroy() {
    this.entries$.unsubscribe();
  }

  SaveEntrie() {
    if (!this.myForm.valid) {
      this.openSnackBar('Incorrect valid', 'clear');
      return false;
    } else {
      this.entriesServices.SaveEntrie(this.myForm.value).subscribe((res) => {
        console.log(res),
          this.myForm.reset(),
          this.getEntriesList(),
          this.openSnackBar('Entrie Saved!', 'clear');
      });
    }
  }
  getEntriesList() {
    this.entriesServices.getListEnties().subscribe();
  }

  SelectedEntrie(id) {
    this.router.navigate(['/view', id]);
  }

  deleteProduct(entrie, i) {
    if (window.confirm('Do you want to delete Entry?')) {
      this.entriesServices.deleteEntrie(entrie._id).subscribe();
      this.openSnackBar('Entries deleted!', 'clear');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openSnackBarSave(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
  openSnackBarValid(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
