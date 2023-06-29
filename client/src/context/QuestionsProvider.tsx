import axios, { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Alert, Loading, Message } from '../interfaces';
import { configAxios } from '../utils/configAxios';
import { fetchAndCache } from '../utils/fetchAndCache';

interface Props {
  children: ReactNode;
}

export interface QuestionContextProps {
  messageEditMode: Message;
  messages: Message[];
  ownMessages: Message[];
  messagesLength: number;
  getMessages: (bookId: number) => void;
  getOwnMessages: (bookId: number) => void;
  getMessagesLength: (bookId: number) => void;
  handleSubmitMessage: (message: Message, bookId?: number) => void;
  catchMessageToEdit: (message: Message) => void;
  deleteMessage: (messageId: number) => void;
  alert: Alert;
  loading: Loading;
}

export const QuestionsContext = createContext<QuestionContextProps>(
  {} as QuestionContextProps
);

export const QuestionsProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLength, setMessagesLength] = useState<number>(0);
  const [ownMessages, setOwnMessages] = useState<Message[]>([]);
  const [messageEditMode, setMessageEditMode] = useState<Message>(
    {} as Message
  );
  const [loading, setLoading] = useState<Loading>(true);
  const [alert, setAlert] = useState<Alert>({} as Alert);

  const config = configAxios();

  const [params, setParams] = useSearchParams();


  const showAlert = (alert: Alert, timeout: number = 3000) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({} as Alert);
    }, timeout);
  };

  const getMessagesLength = async (bookId: number) => {
    if (bookId) {
      setLoading(true);
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/messages/${bookId}`
      );
      setMessagesLength(data.length);
      setLoading(false);
    }
  };

  const getMessages = async (bookId: number) => {
    const limitAll = params.get('limitAll');
    const url: string = `${
      import.meta.env.VITE_URL_BACK
    }/messages/${bookId}?limitAll=${limitAll || '4'}`;
    if (bookId) {
      setLoading(true);
      const { data } = await axios(url, {
        headers: { ...config.headers, 'Cache-Control': 'no-cache' },
      });
      setMessages(data);
      setLoading(false);
    }
  };

  //own questions
  const getOwnMessages = async (bookId: number) => {
    const limitOwn = params.get('limitOwn');
    const url = `${
      import.meta.env.VITE_URL_BACK
    }/messages/own/${bookId}?limitOwn=${limitOwn || '2'}`;
    if (bookId) {
      setLoading(true);
      const { data } = await axios(url, {
        headers: { ...config.headers, 'Cache-Control': 'no-cache' },
      });
      setOwnMessages(data);
      setLoading(false);
    }
  };

  const handleSubmitMessage = (message: Message, bookId?: number) => {
    if (message.id) {
      updateMessage(message);
    } else if (bookId) {
      createMessage(message, bookId);
    }
  };

  // to get the message object and send it to the form component
  const catchMessageToEdit = (message: Message) => {
    //set the object in to state, then pass the state to the form
    if (message && message.message) {
      setMessageEditMode(message);
    } else {
      setMessageEditMode({ message: '' });
    }
  };
  // CREATE
  const createMessage = async (message: Message, bookId: number) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/messages/${bookId}`,
        message,
        config
      );

      setMessages([...messages, data]);
      setOwnMessages([...ownMessages, data]);
      setMessagesLength((prev) => prev + 1);
      showAlert({ message: 'Question sent successfully ', err: false });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        if (error instanceof AxiosError) {
          setLoading(false);
          showAlert({ message: error.response?.data.message, err: true });
        }
      }, 1000);
    }
  };

  //EDIT
  const updateMessage = async (message: Message) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/messages/${message.id}`,
        message,
        config
      );
      setMessages(messages.map((m) => (m.id === data.id ? data : m)));
      setOwnMessages(ownMessages.map((m) => (m.id === data.id ? data : m)));
      showAlert({ message: 'Update successfully!', err: false });
      setMessageEditMode({ message: '' });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        if (error instanceof AxiosError) {
          setLoading(false);
          showAlert({ message: error.response?.data.message, err: true });
        }
      }, 1000);
    }
  };
  //DELETE
  const deleteMessage = async (messageId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_URL_BACK}/messages/${messageId}`,
        config
      );
      setMessages(messages.filter((m) => m.id !== messageId));
      setOwnMessages(ownMessages.filter((m) => m.id !== messageId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestionsContext.Provider
      value={{
        messageEditMode,
        messages,
        ownMessages,
        getMessages,
        getOwnMessages,
        getMessagesLength,
        handleSubmitMessage,
        catchMessageToEdit,
        deleteMessage,
        messagesLength,
        alert,
        loading,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
