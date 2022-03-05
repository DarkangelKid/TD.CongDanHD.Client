import {AuthModel} from './AuthModel';
import {UserAddressModel} from './UserAddressModel';
import {AreaModel} from './AreaModel';

import {UserCommunicationModel} from './UserCommunicationModel';
import {UserEmailSettingsModel} from './UserEmailSettingsModel';
import {UserSocialNetworksModel} from './UserSocialNetworksModel';

export interface UserModel {
  id: number;
  userName: string;
  password: string | undefined;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  roles?: Array<number>;
  permissions?: Array<string>;
  imageUrl?: string;
  address?: string;
  province?: AreaModel;
  district?: AreaModel;
  commune?: AreaModel;
  isActive?: boolean;
  isVerified?: boolean;
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru';
  timeZone?: string;
  website?: 'https://keenthemes.com';
  emailSettings?: UserEmailSettingsModel;
  auth?: AuthModel;
  communication?: UserCommunicationModel;
  socialNetworks?: UserSocialNetworksModel;
}
