import React from 'react';
import { compose } from 'really-typed-compose';

import * as api from '../../utils/api';
import { authorize, unauthorizedOnly } from '../../client/auth';

const SigninPresenter: React.FC = () => {
  const signin = () =>
    api.signin({
      email: 'test@test.com',
      password: 'password'
    }).then(authorize);

  return (
    <>
      <h1>Signin</h1>
      <button onClick={signin}>Go!</button>
    </>
  );
};

export const Signin = compose(
  unauthorizedOnly,
)(SigninPresenter);
