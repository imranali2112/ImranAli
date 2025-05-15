import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);
import { FormsModule } from '@angular/forms'; 
import { ContactService } from '../../services/contact-service/contact.service';
import { contactData } from '../../../../shared/interface/admin-interface';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   @Input() MenuOpen!: boolean;
  public chart: any;   
  public chartTitle: string = 'My First Bar Chart';


  contacts: contactData[] = [];

  constructor(private contactService: ContactService) { }

   get dynamicWidth() {
    return this.MenuOpen ? 'calc(100% - 18rem)' : 'calc(100% - 5rem)';
  }

  get dynamicMargin() {
    return this.MenuOpen ? 'ms-72' : 'ms-20';
  }

  async ngOnInit() {
    await this.contactService.getMessages();
    this.contacts = this.contactService.contacts().slice(-5).reverse();
    this.chart = new Chart('MyChart', {
      type: this.barChartType,
      data: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'],
        datasets: this.barChartData
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  public barChartData = [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ];

  public barChartType: ChartType = 'bar';
 
}
