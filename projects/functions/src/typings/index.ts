export interface DbConfig {
  user: string;
  password: string;
  name: string;
  host: string;
}

export interface DbConnectionConfig extends DbConfig {
  url: string;
}

export interface EnvConfig {
  db: DbConfig;
  googleMaps: {
    key: string;
  };
}

export interface ApplicationConfig extends EnvConfig {
  db: DbConnectionConfig;
}

export interface EntityUpdate<Original, Diff> {
  entity: Original;
  diff: Partial<Diff>;
}
