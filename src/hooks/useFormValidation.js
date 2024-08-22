// hooks/useFormValidation.js
import { useState, useRef } from 'react';

const useFormValidation = () => {
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const emailInputRef = useRef(null);

  const [phoneExists, setPhoneExists] = useState(false);
  const [checkingPhone, setCheckingPhone] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const phoneInputRef = useRef(null);

  const [identityCardExists, setIdentityCardExists] = useState(false);
  const [checkingIdentityCard, setCheckingIdentityCard] = useState(false);
  const [identityCardError, setIdentityCardError] = useState('');
  const identityCardInputRef = useRef(null);

  return {
    emailExists,
    setEmailExists,
    checkingEmail,
    setCheckingEmail,
    emailError,
    setEmailError,
    emailInputRef,
    phoneExists,
    setPhoneExists,
    checkingPhone,
    setCheckingPhone,
    phoneError,
    setPhoneError,
    phoneInputRef,
    identityCardExists,
    setIdentityCardExists,
    checkingIdentityCard,
    setCheckingIdentityCard,
    identityCardError,
    setIdentityCardError,
    identityCardInputRef,
  };
};

export default useFormValidation;
