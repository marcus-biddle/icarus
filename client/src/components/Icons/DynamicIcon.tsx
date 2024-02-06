import { IconType } from 'react-icons/lib';

interface DynamicIconProps {
    icon: IconType;
    width: string;
    height: string;
    color?: string;
    padding?: string;
}

export const DynamicIcon = ({ icon: Icon, width, height, color, padding }: DynamicIconProps) => {
  return (
    <Icon style={{ width: width, height: height, padding: padding,  }} className={`${color} transition-none`} />
  )
}