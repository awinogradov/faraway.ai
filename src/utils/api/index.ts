import React from 'react';
import fetch from 'unfetch';
import querystring from 'querystring';
import Cookies from 'universal-cookie';
import { UserAuthInput, UserAuthAnswer } from '../../database/User/User.entity';

import { useAsync } from '../../components/useAsync';
import { authCookies } from '../auth';

const cookies = new Cookies();

export const signin = async (userInput: UserAuthInput) => {
  const response = await fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify(Object(userInput)),
  });

  if (response.status !== 200) return null;

  const res: UserAuthAnswer = await response.json();
  if (!res.token) return null;

  return res.token;
};

interface GraphQLResponse<T = {}> {
  data: T;
}

export async function graphql<T = {}>(query: string) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': cookies.get(authCookies.token),
    },
    body: JSON.stringify({
      query
    }),
  });

  if (response.status !== 200) return null;

  const res: GraphQLResponse<T> = await response.json();

  if (!res.data) return null;

  return res.data;
};

interface QueryProps {
  query: string;
  children: (data: any, progress: boolean) => React.ReactElement;
}

export const Query: React.FC<QueryProps> = props => {
  const state = useAsync(() => graphql(props.query))

  return props.children(state.value, state.loading);
}

export function useQuery<T = any>(query: string) {
  return useAsync<T | null>(() => graphql<T>(query));
}


