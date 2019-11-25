export interface ApplicationConfig {
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  dbHost: string;
  dbUrl: string;
  googleMapsKey: string;
}

export interface EntityUpdate<Original, Diff> {
  entity: Original;
  diff: Partial<Diff>;
}
