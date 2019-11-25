/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';
import faker from 'faker';

import { User } from '../User/User.model';
import * as userService from '../User/User.service';
import { userDraftCreator } from '../User/User.seed';
import { Location } from '../Location/Location.model';
import * as locationService from '../Location/Location.service';
import { locationDraftCreator } from '../Location/Location.seed';

import { Attraction } from './Attraction.model';
import * as attractionService from './Attraction.service';
import { attractionDraftCreator } from './Attraction.seed';

describe(`database: ${Attraction.name}`, () => {
  let testUser: User;
  let anotherTestUser: User;
  let testLocation: Location;

  before(async () => {
    testUser = await userService.create(userDraftCreator());
    anotherTestUser = await userService.create(userDraftCreator());
    testLocation = await locationService.create(locationDraftCreator());
  });

  afterEach(async () => {
    await attractionService.dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const attraction = await attractionService.create(
      attractionDraftCreator({
        createdBy: testUser,
        location: testLocation,
      }),
    );

    expect(attraction.id).to.be.not.eq(undefined);
    expect(attraction.location.title).to.be.eq(testLocation.title);
    expect(attraction.createdBy.email).to.be.eq(testUser.email);
  });

  it('update', async () => {
    const updatedTitle = faker.lorem.words(5);

    const attraction = await attractionService.create(
      attractionDraftCreator({
        createdBy: testUser,
        location: testLocation,
      }),
    );

    const updatedAttraction = await attractionService.update({ entity: attraction, diff: { title: updatedTitle } });
    expect(updatedAttraction.title).to.be.eq(updatedTitle);
  });

  it('update: disalow update createdBy', async () => {
    const attraction = await attractionService.create(
      attractionDraftCreator({
        createdBy: testUser,
        location: testLocation,
      }),
    );

    await attractionService
      .update({
        entity: attraction,
        // @ts-ignore check for non TS usage
        diff: { createdBy: anotherTestUser },
      })
      .catch((err: Error) => {
        expect(err.message).includes(`Can't update createdBy field`);
      });
  });

  it('remove', async () => {
    const attraction = await attractionService.create(
      attractionDraftCreator({
        createdBy: testUser,
        location: testLocation,
      }),
    );

    await attractionService.remove(attraction);
    const found = await attractionService.snapshot(attraction);

    expect(found).to.be.eq(null);
  });
});
