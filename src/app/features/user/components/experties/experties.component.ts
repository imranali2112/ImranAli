import { Component, signal, computed, effect } from '@angular/core';
import { serviceData } from '../../../../shared/interface/admin-interface';
import { AddServiceService } from '../../../admin/services/add-service/add-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experties',
  imports:[CommonModule],
  templateUrl: './experties.component.html',
  styleUrls: ['./experties.component.css'],
})
export class ExpertiesComponent {
  service1 = signal<serviceData | null>(null);
  service2 = signal<serviceData | null>(null);
  service3 = signal<serviceData | null>(null);
  service4 = signal<serviceData | null>(null);

  loading = computed(() => this.dataService.loading());
  error = computed(() => this.dataService.errorOccurred());

  constructor(private dataService: AddServiceService) {
    effect(() => {
      if (this.error()) {
        console.error('Error occurred:', this.error());
      }
    });
  }

  ngOnInit(): void {
    const ids = ['fa7D7mODTxNc5QthKXfT', 'DhUZXfFwFTboKfZ4zA0y', '01oe0m2O8IZHuQrxtahn', 'ylJoW3uSVilBBB3ECLDW'];
  

    const serviceSignals = [this.service1, this.service2, this.service3, this.service4];

    ids.forEach((id, index) => {
      this.dataService.getServiceById(id).then(data => {
        serviceSignals[index].set(data);
      });
    });
  }
}
