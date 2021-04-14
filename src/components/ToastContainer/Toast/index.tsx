import React, { useEffect } from 'react';
import { Error, Info, CheckCircle, RemoveCircle } from '@material-ui/icons';

import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

const icons = {
  info: <Info />,
  error: <Error fontSize="large" />,
  success: <CheckCircle />,
};

interface ToastProps {
  message: ToastMessage;
  style: object; // eslint-disable-line
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button
        type="button"
        style={{
          cursor: 'pointer',
        }}
        onClick={() => removeToast(message.id)}
      >
        <RemoveCircle />
      </button>
    </Container>
  );
};

export default Toast;
