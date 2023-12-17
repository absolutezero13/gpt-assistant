import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { Alert, Collapse, Grid, Snackbar, Typography } from '@mui/material';
import { theme } from '../style/theme';
import styles from '../style/messages.module.css';
import { CustomUser, IMessage } from '../api/types';
import Loader from './Loader';
import LanguageSelection from './LanguageSelection';
import { Close } from '@mui/icons-material';
import { useWindowSize } from '../hooks/useWindowSize';
import { Prompt } from '../data/prompts';
import Message from './Message';

const dynamicStyles = {
    user: {
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        color: theme.palette.background.default,
    },
    assistant: {
        backgroundColor: theme.palette.background.paper,
        alignItems: 'flex-start',
        color: '#fff',
    },
};

interface MessagesProps {
    messages: IMessage[];
    pending: boolean;
    selectedPrompt: Prompt;
    errorAlert: string | null;
    setErrorAlert: (error: string | null) => void;
    user: CustomUser | null;
}

const Messages = ({ messages, pending, errorAlert, setErrorAlert, user, selectedPrompt }: MessagesProps) => {
    const { width } = useWindowSize();
    const ref = useRef<HTMLDivElement>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            ref.current?.scroll({
                top: ref.current?.scrollHeight,
                behavior: 'smooth',
            });
        }, 100);
    }, [messages]);

    const isSmall = width <= 768;

    return (
        <Grid ref={ref} mt={isSmall ? 10 : 0} mb={0} className={styles.container}>
            <LanguageSelection />
            <Grid position="relative">
                {messages.map((item: IMessage) => (
                    <Message
                        item={item}
                        selectedPrompt={selectedPrompt}
                        isSmall={isSmall}
                        user={user}
                        openSnackbar={() => setSnackbarOpen(true)}
                    />
                ))}
            </Grid>
            <Collapse
                in={errorAlert !== null}
                sx={{
                    position: 'fixed',
                    bottom: '8rem',
                    width: {
                        xs: '80%',
                        sm: '80%',
                        md: '50%',
                        lg: '50%',
                        xl: '50%',
                    },
                }}>
                <Alert
                    severity="error"
                    variant="filled"
                    action={
                        <Close
                            onClick={() => setErrorAlert(null)}
                            sx={{
                                color: '#fff',
                            }}
                        />
                    }>
                    {errorAlert}
                </Alert>
            </Collapse>
            {pending && (
                <Grid className={styles.spinner}>
                    <Loader />
                </Grid>
            )}
            <Snackbar
                color="secondary"
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Copied to clipboard"
            />
        </Grid>
    );
};

export { Messages };
