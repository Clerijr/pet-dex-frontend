import Drawer from '../components/Drawer';
import ChangePassword from '../components/ChangePassword';
import Button from '../components/Button';
import { initializeSwiper } from '../utils/swiper';

export default {
  title: 'Components/ChangePassword',
  parameters: {
    backgrounds: {
      default: 'petdex',
      values: [
        {
          name: 'default',
          value: '#F8F8F8',
        },
        {
          name: 'petdex',
          value: '#003459',
        },
      ],
    },
  },
  render: () => {
    initializeSwiper();
    const button = new Button({
      text: 'open',
    });
    const changePassword = new ChangePassword();
    const $container = document.createElement('div');
    const drawer = new Drawer({
      title: 'Alterar senha',
      content: changePassword,
    });
    button.listen('click', () => drawer.open());
    button.mount($container);

    return $container;
  },
};

export const Default = {};
