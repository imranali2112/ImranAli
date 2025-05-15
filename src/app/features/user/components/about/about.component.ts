import { Component } from '@angular/core';
import { AboutData, profileData } from '../../../../shared/interface/admin-interface';
import { AboutService } from '../../../admin/services/about-service/about-service/about.service';
import { ProfileService } from '../../../admin/services/profile-service/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  profileList: profileData[] = [];
  aboutList: AboutData[] = [];

  loadingProfiles: boolean = true;
  loadingAbout: boolean = true;

  errorProfiles: any = null;
  errorAbout: any = null;

  constructor(
    private profileService: ProfileService,
    private aboutService: AboutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe({
      next: (data) => {
        this.profileList = data;
        this.loadingProfiles = false;
      },
      error: (err) => {
        console.error('❌ Failed to load profile data:', err);
        this.errorProfiles = err;
        this.loadingProfiles = false;
      }
    });

    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.aboutList = data;
        this.loadingAbout = false;
      },
      error: (err) => {
        console.error('❌ Failed to load about data:', err);
        this.errorAbout = err;
        this.loadingAbout = false;
      }
    });

    this.route.fragment.subscribe(fragmentId => {
      console.log(fragmentId);
      this.navgateTo(fragmentId)
    });
  }

  navgateTo(selectorId: any) {
    document.getElementById(selectorId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
