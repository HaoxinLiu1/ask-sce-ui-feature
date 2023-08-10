import React, { useEffect, useState, useMemo } from 'react';
import ReactWebChat, { createDirectLine, Components } from 'botframework-webchat';
import { ASK_SCE_TITLE, createChatStyleSet } from '../assets/constants/constants';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  const [directLine, setDirectLine] = useState(null);

  useEffect(() => {
    fetch('/dltoken', { headers: { 'dl-key': 'DLRT sdasdasdasdas' } }).then((key) => key.json()).then((key) => {
      var token = key.token
      var id = key.id
      setDirectLine(createDirectLine({ token, id }));
    })
  }, []);

  const styleSet = useMemo(createChatStyleSet, []);
  const activityMiddleware = () => (next) => (activityProps) => {
    const { activity } = activityProps;
    const { from: { role }, timestamp } = activity;
    const nextMiddleware = next(activityProps);

    return (children) => (
      <div>
        {nextMiddleware(children)}
        <div style={{
          display: 'flex',
          justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
          padding: '0 10px'
        }}>
          <div style={{
            fontSize: 'small',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
          }}>
            <div>{role === 'user' ? 'You' : 'ask-sce at'}</div>
            <div style={{ marginLeft: '10px' }}>{new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <nav className={styles.navContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{ASK_SCE_TITLE}</h1>
        </div>
        <div className={styles.rectangle}></div>
        <div className={styles.bottomBorder}></div>
      </nav>

      <div className={styles.spacer}></div>
      <div className={styles.chatContainer}>
        {directLine ? (
          <ReactWebChat
            directLine={directLine}
            userID={directLine.id}
            username={directLine.id}
            styleSet={styleSet}
            styleOptions={{ hideUploadButton: true }} // This hides the upload button
            activityMiddleware={activityMiddleware}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;