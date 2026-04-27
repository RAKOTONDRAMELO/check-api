// import CV from './cv';
import CIN from './cin';
// import DrivingLicence from './driving_licenses';

export type UsersDto = {
  id: number;
  name: string;
  firstName: string;
  birthday: string;
  cin: CIN;
  email: string;
  contact: string;
  function: string;
  status: string;
  profil: string;
  cv: string;
  created_at?: Date;
  adress: string;
  mdp: string;
  specialite?: string;
  num_permis?: string;
  photo_permis: string;
  modify_at?: Date;
};
