import socketIOClient from 'socket.io-client';
import { baseUrl } from '../shared/baseUrl';

/*  questa funzione deve occuparsi di connettersi al socket
 *  connettere a un namespace valido solo se sei loggato
 *  aprire una room forse
 *  mandare il todo quando viene fatta un aggiunta
 */

//.connect("/loggedIn", { token }).on('connect', ...).on('error')
export const mySocket = socketIOClient(baseUrl);

export const logMeIn = () => {
    console.log(
        'sto provando a inserire l utente nel namespace dei loggati'
    );
    console.log(mySocket);

    mySocket.emit('loggedIn', 'notifyAddRoom');
};

export const sendNotification = user => {
    console.log('prova inserimento e notifica');
    mySocket.emit('newTodo', {
        username: user,
        msg: ' ha inserito un nuovo todo',
    });
};