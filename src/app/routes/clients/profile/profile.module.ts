import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileLayoutComponent} from './profile-layout/profile-layout.component';
import { ProfileOverviewComponent, DialogDeleteComponent } from './overview/overview.component';
import { ProfileSettingsComponent } from './settings/settings.component';
import { ProfileService } from './profile.service';

const COMPONENTS = [ProfileLayoutComponent, ProfileOverviewComponent, ProfileSettingsComponent];
const COMPONENTS_DYNAMIC = [DialogDeleteComponent];

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    ProfileService
  ]
})
export class ProfileModule {}
