import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '../components/Form';
import { FormField } from '../components/FormField';
import { Input } from '../components/Input';
import { Button, ButtonProps } from '../components/Button';
import { BottomSheetActions } from '../components/BottomSheetActions';
import { BottomSheetCreateScreen } from '../components/BottomSheetCreateScreen';
import { processTypes } from '../providers/redux/constants/process';
import { databaseCreateJourney, databaseDoneJourney } from '../providers/redux/actions/database';
import { GlobalState } from '../providers/redux/store';
import { BottomSheetComponent } from '../typings/bottomSheet';

export const CreateJourneyBottomSheet: BottomSheetComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: GlobalState) => state.user);

  const process = useSelector((state: GlobalState) => state.process[processTypes.createJourneyProcess]);
  const [journeyTitle, setJourneyTitle] = useState('');

  const onSave = () =>
    dispatch(
      databaseCreateJourney({
        createdBy: user.auth!.uid,
        title: journeyTitle,
      }),
    );
  const onCancel = () => dispatch(databaseDoneJourney());

  const inProgress = process && process.inProgress;
  const isSuccess = process && process.isSuccess;
  const isError = process && process.error;

  let buttonView: ButtonProps['view'] = 'action';
  if (isSuccess) buttonView = 'success';
  if (isError) buttonView = 'error';

  let buttonTitle = 'Save';
  if (isSuccess) buttonTitle = 'Saved!';
  if (isError) buttonTitle = (process && process.error && process.error.message) || 'Plz try again...';

  const actionButtonIsDisabled = journeyTitle.length === 0;

  useEffect(() => {
    if (isSuccess) dispatch(databaseDoneJourney(300));
  });

  return (
    <BottomSheetCreateScreen title="Journey">
      <Form>
        <FormField label="Title">
          <Input onChangeText={value => setJourneyTitle(value)} value={journeyTitle} disabled={isSuccess} />
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

CreateJourneyBottomSheet.position = 320;
