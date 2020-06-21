import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptcha3 = forwardRef((props, ref) => {
  const reCaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  return (
    <ReCAPTCHA
      className="reCaptchaBadge"
      theme="light"
      size="invisible"
      badge="bottomright"
      ref={ref}
      sitekey={reCaptchaSiteKey}
      // onChange={newTokenSet}
      // asyncScriptOnLoad={asyncScriptOnLoadHandler}
    />
  );
});

export default ReCaptcha3;
