/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';

import { LocationType } from '../LocationType/LocationType.model';
import * as locationKindService from '../LocationType/LocationType.service';
import { locationTypeDraftCreator } from '../LocationType/LocationType.seed';

import { Location, LocationDraft } from './Location.model';
import * as locationService from './Location.service';
import { locationDraftCreator, dangerouslyDropAllRecords } from './Location.seed';

describe(`database: ${Location.name}`, () => {
  let testLocationType: LocationType;
  let testLocation: LocationDraft;

  before(async () => {
    testLocationType = await locationKindService.create(locationTypeDraftCreator());
    testLocation = locationDraftCreator({ type: testLocationType });
  });

  afterEach(async () => {
    await dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const location = await locationService.create(testLocation);

    expect(location.id).to.be.not.eq(undefined);
    expect(location.created).to.be.not.eq(undefined);

    expect(location.title).to.be.eq(testLocation.title);
    expect(location.address).to.be.eq(testLocation.address);
    expect(location.lat).to.be.eq(testLocation.lat);
    expect(location.lng).to.be.eq(testLocation.lng);
  });

  it('remove', async () => {
    const location = await locationService.create(testLocation);
    expect(location).to.be.not.eq(null);

    await locationService.remove(location);
    const found = await locationService.snapshot(location);

    expect(found).to.be.eq(null);
  });
});
