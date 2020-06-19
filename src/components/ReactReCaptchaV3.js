import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReactReCaptchaV3 = () => {
  console.log('ReactReCaptchaV3');
  const reCaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  const reCaptchaRef = useRef(null);

  const asyncScriptOnLoadHandler = () => {
    console.log('asyncScriptOnLoadHandler: ');
    console.log(reCaptchaRef);
  };

  const onChangeHandler = (val) => {
    console.log('onChangeHandler: ');
    console.log('val: ', val);
  };

  const submitHandler = () => {
    console.log('submitHandler: ');
    try {
      reCaptchaRef.current.execute()
        .then((value) => {
          console.log('value: ', value);
        })
        .catch((e) => {
          console.error(e);
          console.log('e - submit');
        });
    } catch (err) {
      console.error(err);
    }
  };

  const asyncSubmitHandler = () => {
    console.log('asyncSubmitHandler: ');
    try {
      reCaptchaRef.current.executeAsync()
        .then((value) => {
          console.log('value: ', value);
        })
        .catch((e) => {
          console.error(e);
          console.log('e - async submit');
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>ReCaptcha V3</h2>
      <ReCAPTCHA
        style={{ display: 'inline-block' }}
        theme="dark"
        size="invisible"
        ref={reCaptchaRef}
        sitekey={reCaptchaSiteKey}
        onChange={onChangeHandler}
        asyncScriptOnLoad={asyncScriptOnLoadHandler}
      />
      <button type="button" onClick={submitHandler}>Submit</button>
      <button type="button" onClick={asyncSubmitHandler}>Async Submit</button>
    </div>
  );
};

export default ReactReCaptchaV3;
