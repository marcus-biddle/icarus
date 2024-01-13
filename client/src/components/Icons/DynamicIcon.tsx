import React, { ReactElement } from 'react';
import { IconType } from 'react-icons/lib';

interface DynamicIconProps {
    icon: IconType;
    width: string;
    height: string;
    color?: string;
}

export const DynamicIcon = ({ icon: Icon, width, height, color }: DynamicIconProps) => {
  return (
    <Icon style={{ width: width, height: height, color: color }} />
  )
}