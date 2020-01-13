import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '../components/Form';
import { FormField } from '../components/FormField';
import { Input } from '../components/Input';
import { Button, ButtonProps } from '../components/Button';
import { BottomSheetActions } from '../components/BottomSheetActions';
import { BottomSheetCreateScreen } from '../components/BottomSheetCreateScreen';
import { closeBottomSheet } from '../providers/redux/actions/app';
import { processTypes } from '../providers/redux/constants/process';
import { emitProcess, deleteProcess } from '../providers/redux/actions/process';
import { databaseCreateJourney } from '../providers/redux/actions/database';
import { GlobalState } from '../providers/redux/store';

export const CreateJourneyBottomSheet: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: GlobalState) => state.user);

  const process = useSelector((state: GlobalState) => state.process[processTypes.createJourneyProcess]);
  const [collectionTitle, setCollectionTitle] = useState('');

  const onSave = () => {
    dispatch(emitProcess(processTypes.createJourneyProcess));

    dispatch(
      databaseCreateJourney({
        createdBy: user.auth!.uid,
        title: collectionTitle,
      }),
    );
  };
  const onCancel = () => {
    dispatch(closeBottomSheet());
    setTimeout(() => dispatch(deleteProcess(processTypes.createJourneyProcess)), 50);
  };

  const inProgress = process && process.inProgress;
  const isSuccess = process && (process.value && !process.error);
  const isError = process && (process.isSuccess === false && process.error);

  let buttonView: ButtonProps['view'] = 'action';
  if (isSuccess) buttonView = 'success';
  if (isError) buttonView = 'error';

  let buttonTitle = 'Save';
  if (isSuccess) buttonTitle = 'Saved!';
  if (isError) buttonTitle = (process && process.error && process.error.message) || 'Plz try again...';

  const actionButtonIsDisabled = collectionTitle.length === 0;
  // set bottom sheet snaps by GlobalState

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeBottomSheet(300));
      setTimeout(() => dispatch(deleteProcess(processTypes.createJourneyProcess)), 350);
    }
  });

  return (
    <BottomSheetCreateScreen title="Collection">
      <Form>
        <FormField label="Title">
          <Input onChangeText={value => setCollectionTitle(value)} value={collectionTitle} disabled={isSuccess} />
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
