import { dataDisplay } from './profile-model';

export class ResolvedProfile {
  constructor(public profile: dataDisplay, public error: any = null){}

}
