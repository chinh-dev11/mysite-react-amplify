import React from 'react';
import { useTranslation } from 'react-i18next';

const Copyright = () => {
  const { t } = useTranslation(['translation']);
  return (
    <div className="Copyright">
      &copy;
      {`${t('copyright.t1')}. ${t('copyright.t2')}.`}
    </div>
  );
};

export default Copyright;
