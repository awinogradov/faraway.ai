import React from 'react';
import { useDispatch } from 'react-redux';

import { Form } from '../components/Form';
import { FormField } from '../components/FormField';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { BottomSheetActions } from '../components/BottomSheetActions';
import { BottomSheetCreateScreen } from '../components/BottomSheetCreateScreen';
import { closeBottomSheet } from '../providers/redux/actions/app';

export const CreateCollectionBottomSheet: React.FC = () => {
  const dispatch = useDispatch();

  const onCancel = () => dispatch(closeBottomSheet());

  return (
    <BottomSheetCreateScreen title="Collection">
      <Form>
        <FormField label="Title">
          <Input />
        </FormField>
      </Form>
      <BottomSheetActions>
        <Button view="action" title="Save" />

        <Button view="clear" title="Cancel" onPress={onCancel} />
      </BottomSheetActions>
    </BottomSheetCreateScreen>
  );
};
