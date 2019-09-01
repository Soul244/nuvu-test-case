import { Icon } from 'react-icons-kit';
import {
  ic_clear,
  ic_settings,
  ic_fullscreen,
  ic_fullscreen_exit,
  ic_sync,
  ic_sync_disabled,
  ic_system_update_alt,
  ic_autorenew,
  ic_home,
  ic_accessible,
  ic_volume_up,
  ic_volume_off,
  ic_language,
  ic_keyboard_arrow_left,
  ic_keyboard_arrow_right,
  ic_attach_money,
  ic_credit_card,
  ic_local_mall,
  ic_restaurant_menu,
  ic_store,
  ic_add,
  ic_remove,
  ic_delete,
  ic_local_grocery_store,
  ic_search,
  ic_done,
  ic_power_settings_new,
  ic_edit,
} from 'react-icons-kit/md';
import styled from 'styled-components';

const IconContainer = styled.div`
  background-color: ${props =>
    props.background ? props.background : 'transparent'}
  color: ${props => props.color};
  display: inline-block;
  margin: ${props => props.margin};
  cursor: pointer;
  font-size: initial;
  :hover, :active {
    color: ${props => props.hover};
  }
`;

export {
  IconContainer,
  Icon,
  ic_clear as cross,
  ic_delete as clear,
  ic_settings as settings,
  ic_autorenew as tryAgain,
  ic_keyboard_arrow_left as leftArrow,
  ic_keyboard_arrow_right as rightArrow,
  ic_add as increase,
  ic_remove as decrease,
  ic_search as search,
  ic_done as success,
  ic_edit as edit,
};

/* Example
  import { Icon, clear } from '../../css/icons';
  <Icon size={24} icon={clear} />
*/
