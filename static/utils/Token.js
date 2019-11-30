import Cookies from 'js-cookie';

const getToken = () => Cookies.get('csrftoken');

const getTokenHeader = () => {
  return {
    'X-CSRFToken': getToken(),
  };
};

export default {
  getTokenHeader,
};
