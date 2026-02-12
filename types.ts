
export interface BrandProfile {
  name: string;
  tagline: string;
  personality: string;
  primaryColor: string;
  brandAttributes: string[];
  bio: string;
}

export interface BrandingResponse {
  profile: BrandProfile;
}
