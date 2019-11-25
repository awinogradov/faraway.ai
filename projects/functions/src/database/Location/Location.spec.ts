/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';

import * as locationService from './Location.service';
import { Location } from './Location.model';

describe(`database: ${Location.name}`, () => {
  afterEach(async () => {
    await locationService.dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const location = await locationService.snapshot({
      title: 'ЦУМ',
    });

    const cached = await locationService.snapshot({
      title: 'Tsum',
    });

    expect(location.id).to.be.not.eq(undefined);
    expect(location.created).to.be.not.eq(undefined);

    expect(location.title).to.be.eq('Tsum');
    expect(location.address).to.be.eq('Petrovka Ulitsa, 2, Moskva, Russia, 125009');
    expect(location.lat).to.be.eq(55.7608749);
    expect(location.lng).to.be.eq(37.61981129999999);

    expect(location.toJSON()).to.be.eql(cached.toJSON());
  });

  it('remove', async () => {
    const location = await locationService.snapshot({
      title: 'ЦУМ',
    });
    expect(location).to.be.not.eq(null);

    await locationService.remove(location);
    const found = await Location.findOne(location);

    expect(found).to.be.eq(null);
  });
});
