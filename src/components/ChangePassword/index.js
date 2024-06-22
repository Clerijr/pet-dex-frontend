import { Component } from 'pet-dex-utilities';
import TextInput from '../TextInput';
import Button from '../Button';
import './index.scss';

import eyeSlashIcon from './images/eye-slash.svg';

const events = ['change-password'];

const html = `
    <div>
      <div class="change-password-container">
        <form
          data-select="change-password-form"
          class="change-password-container__change-password-form"
          action="submit"
        >
          <h3 class="change-password-container__title">
            Senha antiga
          </h3>
          <div data-select="password-input-container"></div>
          <span data-select="password-error-message" class="error-message"></span>
            
           <div class="change-password-container__separator">
            <hr class="divisor" />
           </div>
          
          <h3 class="change-password-container__title">Nova senha</h3>
          
          <div data-select="new-password-input-container" class="change-password-container__new-password"></div>
          <span data-select="new-password-error-message" class="error-message"></span>

          <div data-select="confirm-password-input-container" class="change-password-container__confirm-password"></div>
          <span data-select="confirm-password-error-message" class="error-message"></span>
          
          <ul class="change-password-container__password-tips">
            <li>Insira no mínimo 6 caracteres</li>
            <li>A senha deve conter uma letra maiúscula</li>
            <li>Deve conter um caractere especial</li>
          </ul>
          </form>
      </div>
    </div>
`;

export default function ChangePassword() {
  Component.call(this, { html, events });
  const $changePasswordForm = this.selected.get('change-password-form');
  const $passwordInputContainer = this.selected.get('password-input-container');
  const $passwordErrorMessage = this.selected.get('password-error-message');
  const $newPasswordInputContainer = this.selected.get(
    'new-password-input-container',
  );
  const $newPasswordErrorMessage = this.selected.get(
    'new-password-error-message',
  );
  const $confirmPasswordInputContainer = this.selected.get(
    'confirm-password-input-container',
  );
  const $confirmPasswordErrorMessage = this.selected.get(
    'confirm-password-error-message',
  );

  const passwordInput = new TextInput({
    placeholder: 'Senha',
    assetUrl: eyeSlashIcon,
    assetPosition: 'suffix',
  });
  const newPasswordInput = new TextInput({
    placeholder: 'Nova senha',
    assetUrl: eyeSlashIcon,
    assetPosition: 'suffix',
  });
  const confirmPasswordInput = new TextInput({
    placeholder: ' Confirmar senha',
    assetUrl: eyeSlashIcon,
    assetPosition: 'suffix',
  });
  const submitButton = new Button({
    text: 'Salvar',
    isFullWidth: true,
    isDisabled: true,
  });

  passwordInput.mount($passwordInputContainer);
  newPasswordInput.mount($newPasswordInputContainer);
  confirmPasswordInput.mount($confirmPasswordInputContainer);
  submitButton.mount($changePasswordForm);

  passwordInput.selected.get('input-text').type = 'password';
  newPasswordInput.selected.get('input-text').type = 'password';
  confirmPasswordInput.selected.get('input-text').type = 'password';

  const validateFields = () => {
    const password = passwordInput.selected.get('input-text').value;
    const newPassword = newPasswordInput.selected.get('input-text').value;
    const confirmPassword =
      confirmPasswordInput.selected.get('input-text').value;

    if (password && newPassword && confirmPassword) {
      submitButton.enable();
    } else {
      submitButton.disable();
    }
  };

  passwordInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  newPasswordInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);
  confirmPasswordInput.selected
    .get('input-text')
    .addEventListener('input', validateFields);

  submitButton.listen('click', () => {
    const password = passwordInput.selected.get('input-text').value;
    const newPassword = newPasswordInput.selected.get('input-text').value;
    const confirmPassword =
      confirmPasswordInput.selected.get('input-text').value;
    let validPassword = true;
    let validNewPassword = true;
    let validConfirmPassword = true;

    if (!this.validatePassword(password)) {
      validPassword = false;
      $passwordErrorMessage.classList.add('show-error');
      $passwordErrorMessage.innerText = 'Senha inválida';
      passwordInput.inputError();
    }
    if (!this.validatePassword(newPassword)) {
      validNewPassword = false;
      $newPasswordErrorMessage.classList.add('show-error');
      $newPasswordErrorMessage.innerText = 'Senha inválida';
      newPasswordInput.inputError();
    }
    if (!this.validatePassword(confirmPassword)) {
      validConfirmPassword = false;
      $confirmPasswordErrorMessage.classList.add('show-error');
      $confirmPasswordErrorMessage.innerText = 'Senha inválida';
      confirmPasswordInput.inputError();
    }
    if (!this.comparePasswords(newPassword, confirmPassword)) {
      validNewPassword = false;
      validConfirmPassword = false;
      $newPasswordErrorMessage.classList.add('show-error');
      $confirmPasswordErrorMessage.classList.add('show-error');
      $newPasswordErrorMessage.innerText = 'As senhas informadas não coincidem';
      $confirmPasswordErrorMessage.innerText =
        'As senhas informadas não coincidem';
      newPasswordInput.inputError();
      confirmPasswordInput.inputError();
    }

    if (validPassword) $passwordErrorMessage.classList.remove('show-error');
    if (validNewPassword)
      $newPasswordErrorMessage.classList.remove('show-error');
    if (validConfirmPassword)
      $confirmPasswordErrorMessage.classList.remove('show-error');

    if (validPassword && validNewPassword && validConfirmPassword) {
      this.changePassword();
    }
  });
}
ChangePassword.prototype = Object.assign(
  ChangePassword.prototype,
  Component.prototype,
  {
    changePassword() {
      this.emit('change-password');
    },
    comparePasswords(password, newPassword) {
      return password === newPassword;
    },
    validatePassword(password) {
      const hasMinLength = password.length >= 10;
      const hasUppercase = /[A-Z]/g.test(password);
      const hasNumber = /[0-9]/g.test(password);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/g.test(password);

      return hasMinLength && hasUppercase && hasNumber && hasSpecialCharacter;
    },
  },
);
