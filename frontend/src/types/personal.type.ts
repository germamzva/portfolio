export type PersonalInfo = {
  fullname: string;
  position: string;
  address: string;
  email: string;
  phone: string;
  links: LinkField[];
};

export type LinkField = {
  name: string;
  link: string;
};

export type PrimaryImg = {
  id?: string;
  image: string;
};