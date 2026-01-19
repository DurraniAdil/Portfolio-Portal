import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
    onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 50,
    delay = 0,
    className = '',
    style = {},
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(false);

        const startDelay = setTimeout(() => {
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(startDelay);
    }, [text, delay]);

    useEffect(() => {
        if (!isTyping) return;

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [displayedText, text, speed, isTyping, onComplete]);

    return (
        <span className={className} style={style}>
            {displayedText}
            {displayedText.length < text.length && isTyping && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    );
};

export default TypewriterText;
