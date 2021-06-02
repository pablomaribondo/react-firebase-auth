import { FC } from 'react';

interface MessageProps {
  message: string;
  type: 'danger' | 'success';
}

const Message: FC<MessageProps> = ({ message, type }) => {
  let typeClass = '';

  if (type === 'danger') typeClass = 'is-danger';
  if (type === 'success') typeClass = 'is-success';

  return (
    <article className={`message ${typeClass}`}>
      <div className="message-body">{message}</div>
    </article>
  );
};

export default Message;
