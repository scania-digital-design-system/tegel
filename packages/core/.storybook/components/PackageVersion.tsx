import React, { memo } from 'react';

interface PackageVersionProps {
  packageName: string;
  version: string;
}

const style = {
  textTransform: 'unset',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '16px',
  letterSpacing: '-0.14px',
  marginLeft: '16px',
  backgroundColor: '#2058A8',
  color: '#ffffff',
  borderRadius: '16px',
  padding: '4px 12px',
};

export const PackageVersion = memo(({ packageName, version }: PackageVersionProps) => (
  <p style={style} className={'package-version'}>
    {`${packageName}: ${version}`}
  </p>
));
