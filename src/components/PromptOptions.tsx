import { Button, Divider, Tooltip, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomUser } from '../api/types';
import { Prompt, promptIcons } from '../data/prompts';
import { useWindowSize } from '../hooks/useWindowSize';
import { breakPoints } from '../style/breakPoints';
import styles from '../style/promptOptions.module.css';
import PromptConversationPreferences from './PromptConversationPreferences';
import usePromptStore from '../zustand/prompts';

interface PromptOptionsProps {
    selectedPrompt: Prompt;
    user: CustomUser | null;
}

const PromptOptions = ({ selectedPrompt, user }: PromptOptionsProps) => {
    const { prompts, setPrompts } = usePromptStore();
    const { t } = useTranslation();
    const { width } = useWindowSize();

    const isSmall = width <= breakPoints.sm;

    const filteredPrompts = useMemo(
        () =>
            prompts.filter((p) => {
                if (user?.role === 'admin') {
                    return true;
                }
                return !p.adminOnly;
            }),
        [user],
    );

    return (
        <>
            <Divider sx={{ bgcolor: 'white', mt: isSmall ? 0 : 2 }} />
            <div className={styles.list}>
                {filteredPrompts.map((prompt) => {
                    const Icon = promptIcons[prompt.icon];
                    return (
                        <Tooltip key={prompt.id.toString()} title={t(prompt.explanation)} placement="right">
                            <Button
                                variant={selectedPrompt.id === prompt.id ? 'contained' : 'outlined'}
                                key={prompt.id.toString()}
                                className={styles.button}
                                sx={{
                                    marginTop: '1rem',
                                    marginLeft: isSmall ? '1rem' : 0,
                                    padding: '1rem',
                                    height: isSmall ? '3rem' : '5rem',
                                    minWidth: '12rem',
                                }}
                                onClick={() => {
                                    const clickedPrompt = prompts.find((p) => p.id === prompt.id)!;
                                    console.log('clickedPrompt', clickedPrompt);
                                    const updatedClickedPrompt = {
                                        ...clickedPrompt,
                                        selected: true,
                                    };
                                    const updatedPrompts = prompts.map((p) => {
                                        if (p.id === updatedClickedPrompt.id) {
                                            console.log('updatedClickedPrompt', updatedClickedPrompt);
                                            return updatedClickedPrompt;
                                        }
                                        return {
                                            ...p,
                                            selected: false,
                                        };
                                    });
                                    setPrompts(updatedPrompts);
                                }}>
                                <>
                                    <Icon
                                        sx={{
                                            marginRight: '1rem',
                                        }}
                                    />
                                    <Typography variant={isSmall ? 'subtitle2' : 'subtitle1'}>
                                        {t(prompt.key)}
                                    </Typography>
                                </>
                            </Button>
                        </Tooltip>
                    );
                })}
            </div>
            <PromptConversationPreferences isSmall={isSmall} selectedPrompt={selectedPrompt} />
        </>
    );
};

export { PromptOptions };
