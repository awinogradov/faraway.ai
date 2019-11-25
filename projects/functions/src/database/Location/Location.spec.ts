/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';

import { Location } from './Location.model';
import * as locationService from './Location.service';
import { locationDraftCreator } from './Location.seed';

const testLocation = locationDraftCreator();

describe(`database: ${Location.name}`, () => {
  afterEach(async () => {
    await locationService.dangerouslyDropAllRecords();
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
