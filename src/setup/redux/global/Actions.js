import {globalSlice, callTypes} from './Slice';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';

const {actions} = globalSlice;

export const setRandom = () => (dispatch) => {
  dispatch(actions.setRandom());
};

export const listenNotifications = (accessToken) => async (dispatch) => {
  console.log('listenNotifications');
  const connection = new HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_API_URL}/notifications`, {
    //.withUrl(`https://192.168.2.167:5001/notifications`, {
      headers: {tenant: 'root'},
      accessTokenFactory: () => `${accessToken}`,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: (retryContext) => {
        if (retryContext.elapsedMilliseconds < 60000) {
          return Math.random() * 10000;
        } else {
          return null;
        }
      },
    })
    .build();
  dispatch(actions.setConnection(connection));
  if (connection) {
    connection.start().then((e) => {
      console.log('SocketConnected!');
      connection.on('NotificationFromServer', (message, message2) => {
        console.log('NotificationFromServerNotificationFromServer');
        console.log(message);
        console.log(message2);
      });

      connection.on('ReceiveMessage', (message, message2) => {
        console.log('ReceiveMessageReceiveMessage');
        console.log(message);
        console.log(message2);
      });
    });
  }

  /* if (connection) {
    if (accessToken) {
      try {
        await connection.start();
        console.log('Connected123123!');
        connection.on('NotificationFromServer', (message, message2) => {
          console.log('ReceiveMessageReceive123123');
          console.log(message);
          console.log(message2);
          connection.stop().then((e) => {
            console.log('stopstopstop!');
            console.log(e);
          });
        });
      } catch (error) {}
    } else {
      connection.stop().then((e) => {
        console.log('stopstopstop!');
        console.log(e);
      });
    }
  } */
};
