/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PickerSelect from 'react-native-picker-select';
import Autocomplete from 'react-native-autocomplete-input';

import { Form } from '../components/Form';
import { FormField } from '../components/FormField';
import { Input } from '../components/Input';
import { PointCover } from '../components/PointCover';
import { Button, ButtonProps } from '../components/Button';
import { BottomSheetActions } from '../components/BottomSheetActions';
import { BottomSheetCreateScreen } from '../components/BottomSheetCreateScreen';
import { processTypes } from '../providers/redux/constants/process';
import { databaseCreatePoint, databaseDonePoint } from '../providers/redux/actions/database';
import { GlobalState } from '../providers/redux/store';
import { ask, remote } from '../providers/functions';
import { BottomSheetComponent } from '../typings/bottomSheet';

interface PointRemoteMeta {
  id?: string;
  title?: string;
  address?: string;
  lat?: string;
  lng?: string;
  photos?: string[];
}

interface LocationTypeRemoteMeta {
  _id: string;
  title: string;
}

interface JourneyRemoteMeta {
  _id: string;
  title: string;
}

export const CreatePointBottomSheet: BottomSheetComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: GlobalState) => state.user);

  const process = useSelector((state: GlobalState) => state.process[processTypes.createPointProcess]);
  const [pointMeta, setPointMeta] = useState<PointRemoteMeta>({});
  const [pointType, setPointType] = useState('');
  const [pointJourney, setPointJourney] = useState('');
  const [journeysList, setJourneysList] = useState([]);
  const [locationTypeList, setLocationTypeList] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [suggestVisibility, setSuggestVisibility] = useState(false);

  useEffect(() => {
    (async () => {
      const userSnapshot = await ask({ function: remote.dbUserSnapshot, payload: { email: user.auth!.email } });
      const locationType = await ask({ function: remote.dbLocationTypeAll });
      setLocationTypeList(locationType);
      setJourneysList(userSnapshot.journeys);
    })();
  }, []);

  const onSave = () => {
    dispatch(
      databaseCreatePoint({
        ...pointMeta,
        type: pointType,
        journeys: [pointJourney],
      }),
    );
  };
  const onCancel = () => dispatch(databaseDonePoint());

  const inProgress = process && process.inProgress;
  const isSuccess = process && process.isSuccess;
  const isError = process && process.error;

  let buttonView: ButtonProps['view'] = 'action';
  if (isSuccess) buttonView = 'success';
  if (isError) buttonView = 'error';

  let buttonTitle = 'Save';
  if (isSuccess) buttonTitle = 'Saved!';
  if (isError) buttonTitle = (process && process.error && process.error.message) || 'Plz try again...';

  const actionButtonIsDisabled = !pointMeta.id;

  useEffect(() => {
    if (isSuccess) dispatch(databaseDonePoint(300));
  });

  return (
    <BottomSheetCreateScreen title="Point">
      <Form>
        <PointCover url={pointMeta.photos && pointMeta.photos[0]} />

        <FormField label="Title">
          <Autocomplete
            hideResults={!suggestVisibility}
            data={locationSuggestions}
            defaultValue={pointMeta.title}
            onChangeText={async query => {
              setPointMeta({ title: query });
              setSuggestVisibility(true);
              const suggestions = await ask({ function: remote.dbLocationFindOnGoogleMaps, payload: { query } });
              setLocationSuggestions(suggestions);
            }}
            renderItem={({ item }: { item: PointRemoteMeta }) => (
              <Text
                onPress={() => {
                  setPointMeta(item);
                  setSuggestVisibility(false);
                }}
              >
                {item.address}
              </Text>
            )}
          />
        </FormField>

        <FormField label="Address">
          <Input
            onChangeText={value => setPointMeta({ address: value })}
            value={pointMeta.address}
            disabled={inProgress}
          />
        </FormField>

        <FormField label="Type">
          <PickerSelect
            onValueChange={value => setPointType(value)}
            items={locationTypeList.map((locationType: LocationTypeRemoteMeta) => ({
              label: locationType.title,
              value: locationType._id,
            }))}
          />
        </FormField>

        <FormField label="Journey">
          <PickerSelect
            onValueChange={value => setPointJourney(value)}
            items={journeysList.map((journey: JourneyRemoteMeta) => ({ label: journey.title, value: journey._id }))}
          />
        </FormField>
      </Form>
      <BottomSheetActions>
        <Button
          view={buttonView}
          title={buttonTitle}
          onPress={onSave}
          loading={inProgress}
          disabled={actionButtonIsDisabled}
        />

        <Button view="clear" title="Cancel" onPress={onCancel} />
      </BottomSheetActions>
    </BottomSheetCreateScreen>
  );
};

CreatePointBottomSheet.position = 657;
