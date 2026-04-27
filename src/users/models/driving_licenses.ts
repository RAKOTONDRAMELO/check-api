import drivingCat from './driving_cat';
type DrivingLicenceDto = {
  id: number;
  num: string;
  frontPicture: string;
  backPicture: string;
  category: drivingCat[];
};
export default DrivingLicenceDto;
