import { EnvConfig, ApplicationConfig } from '../typings';

export interface ProvideDbUrlProps {
  user: string;
  password: string;
  host: string;
  name: string;
}

export const provideDbUrl = (props: ProvideDbUrlProps) =>
  `mongodb://${props.user}:${props.password}@${props.host}/${props.name}?authSource=admin&gssapiServiceName=mongodb`;

export const provideApplicationConfig = (props: EnvConfig): ApplicationConfig => ({
  ...props,
  db: {
    ...props.db,
    url: provideDbUrl(props.db),
  },
});
