export enum remote {
  dbUserCreate = 'db-user-create',
  dbUserSnapshot = 'db-user-snapshot',
  dbUserSnapshotByOauth = 'db-user-snapshotByOauth',
  dbUserSnapshotByEmail = 'db-user-snapshotByEmail',

  dbJourneyCreate = 'db-journey-create',

  dbLocationFindOnGoogleMaps = 'db-location-findOnGoogleMaps',
  dbLocationCreate = 'db-location-create',

  dbLocationTypeAll = 'db-locationType-all',
}

export interface AskProps<P> {
  function: remote;
  method?: 'GET' | 'POST';
  payload?: P;
}

export const ask = <P>(props: AskProps<P>) =>
  fetch(`http://localhost:5000/faraway-ai/us-central1/${props.function}`, {
    method: props.method || 'POST',
    body: JSON.stringify(props.payload),
  })
    .then(res => {
      if (!res.ok) return { error: res.statusText || 'Smth went wrong...' };

      return res.json();
    })
    .catch((error: Error) => ({ error }));

export interface CreateJourney {
  title: string;
  createdBy: string;
  startsAt?: number;
  endsAt?: number;
  members?: string[];
}

export interface CreatePoint {
  id: string;
  type: string;
  journeys: string[];
}
