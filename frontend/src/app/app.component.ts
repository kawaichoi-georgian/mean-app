import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgIf, NgForOf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, JsonPipe, NgIf, NgForOf],
  templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputValue = '';
  submittedItem: any = null;
  allItems: any[] = [];

  constructor(private dataService: DataService) {
    this.fetchAllItems();
  }

  submitForm() {
    const data = { name: this.inputValue };
    this.dataService.addItem(data).subscribe({
      next: (res: any) => {
        this.submittedItem = res.savedItem;
        this.inputValue = '';
        this.fetchAllItems(); // refresh list
      },
      error: (err) => console.error(err)
    });
  }

  fetchAllItems() {
    this.dataService.getAllItems().subscribe({
      next: (res: any[]) => {
        this.allItems = res;
      },
      error: (err) => console.error(err)
    });
  }
}
