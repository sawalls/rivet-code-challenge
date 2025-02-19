type ProfileNoId = {
  first_name: string; // 255 char max / required",
  last_name: string; // 255 char max / required",
  phone: string; // 255 char max / required",
  email: string; // 255 char max / required",
  address: string; // 255 char max / required",
  city: string; // 255 char max / required",
  state: string; // 255 char max / required",
  zip: string; // 255 char max / required",
  photo: string; // 255 char max / URL to image file",
  notes: string; // 4GB max"
};

interface Profile extends ProfileNoId {
  id: number;
}

export type { Profile, ProfileNoId };
