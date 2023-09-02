import { Component } from '@angular/core';
import { ReclamationData } from './reclamation-data.model';
import { ReclamationService } from './reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  reclamationData: ReclamationData = new ReclamationData();

  constructor(private reclamationService: ReclamationService) { }

  submitReclamation() {
    this.reclamationService.submitReclamationData(this.reclamationData).subscribe(
      response => {
        console.log('Reclamation data sent successfully:', response);
        // Reset the form
        this.reclamationData = new ReclamationData();
      },
      error => {
        console.error('Error sending reclamation data:', error);
      }
    );
  }
}
