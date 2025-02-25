// Note: to flex a bit that I know the difference between required and non-required fields,
// I made this judgment call: the original fake data had no state nor photos, and notes were optionally their websites.
// So, I made state, photo, and notes optional.
type ProfileNoId = {
  first_name: string; // 255 char max / required,
  last_name: string; // 255 char max / required,
  phone: string; // 255 char max / required,
  email: string; // 255 char max / required,
  address: string; // 255 char max / required,
  city: string; // 255 char max / required,
  state?: string; // 2 chars / optional,
  zip: string; // 255 char max / required,
  photo?: string; // 255 char max / URL to image file / optional,
  notes?: string; // 4GB max / optional,
};

interface Profile extends ProfileNoId {
  id: number;
}

export type { Profile, ProfileNoId };
