export interface Plant {
  _id?: string;
  perenualId?: string; // id from Perenual API
  userId?: string; // owner user id
  ownersPlantName?: string; // user's custom name for the plant
  commonName?: string; // common name from Perenual
  firstWateringDay?: string; // ISO date string set when plant is added (last watered date)
  wateringIntervalDays?: number; // benchmark interval (from Perenual) in days
  images?: string[]; // optional image URLs
}
