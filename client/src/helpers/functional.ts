/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

interface ShowProps {
  when: boolean;
  children: ReactNode;
}

export const Show = ({ when = true, children }: ShowProps) => (when ? children : null);

export const showIfOrElse = (x: boolean) => (content: any) => (fallbackContent: any) => (x ? content : fallbackContent);

export const isArrayEmpty = (array: any[] | undefined) => array === null || array === undefined || array.length === 0;

export const isUserLoggedIn = () => (localStorage.getItem('idToken') ? true : false)