export type Gender = "male" | "female";

export interface BabyProfile {
  name: string;
  birthDate: string;
  gender: Gender | null;
}