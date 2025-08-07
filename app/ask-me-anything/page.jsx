"use client";
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Loader2, MessageCircle, Sparkles, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

export default function AskMeAnythingPage() {
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [error, setError] = useState('');
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto scroll to bottom
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation, isLoading]);

    // Handle Enter/Shift+Enter
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;
        const userQuestion = question.trim();
        setQuestion('');
        setIsLoading(true);
        setError('');
        const now = new Date();
        const newConversation = [...conversation, {
            type: 'user',
            content: userQuestion,
            timestamp: now,
        }];
        setConversation(newConversation);
        try {
            const response = await fetch('/api/ask-me-anything', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-conversation-started': conversation.length > 0 ? 'true' : 'false',
                },
                body: JSON.stringify({ question: userQuestion }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to get answer');
            setConversation([...newConversation, {
                type: 'ai',
                content: data.answer,
                timestamp: new Date(),
            }]);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const clearConversation = () => {
        setConversation([]);
        setError('');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const suggestedQuestions = [
        "What are your main technical skills?",
        "Tell me about your impressive project",
        "How long have you been coding?",
        "What are your career goals?"
    ];

    // Typing indicator (animated dots)
    function TypingIndicator() {
        return (
            <div className="flex items-center gap-2">
                <span className="block w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="block w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="block w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:300ms]"></span>
                <span className="text-sm text-muted-foreground ml-2">AI is typing...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <MessageCircle className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Ask Me Anything</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions about my work, skills, or experience? I'm here to help! 
                        Ask me anything and get instant AI-powered answers.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    {/* Main Chat Area */}
                    <div className="relative">
                        <Card className="h-[600px] flex flex-col shadow-xl">
                            <CardHeader className="border-b flex flex-row items-center justify-between py-3 px-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Bot className="h-5 w-5 text-primary" />
                                    Chat with AI Assistant
                                </CardTitle>
                                {conversation.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={clearConversation}
                                        className="text-muted-foreground hover:text-destructive"
                                        title="Clear Conversation"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col p-0 bg-background rounded-b-xl">
                                {/* Conversation Display */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                    {conversation.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-8">
                                            <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                            <h3 className="text-lg font-semibold mb-4">Start a conversation!</h3>
                                            <p className="text-sm mb-6">Ask me anything about my skills, projects, or experience</p>
                                            
                                            {/* Suggested Questions */}
                                            <div className="space-y-2">
                                                <p className="text-xs text-muted-foreground mb-3">Suggested Questions:</p>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {suggestedQuestions.map((suggestion, index) => (
                                                        <Button
                                                            key={index}
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setQuestion(suggestion)}
                                                            className="text-xs px-3 py-1 h-auto"
                                                            disabled={isLoading}
                                                        >
                                                            {suggestion}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        conversation.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`flex max-w-[85%] md:max-w-[75%] gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                                    </div>
                                                    <div className={`rounded-2xl px-4 py-3 shadow-md whitespace-pre-wrap break-words ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-white dark:bg-muted/60 border border-muted'} `}>
                                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                                            <ReactMarkdown>{message.content}</ReactMarkdown>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mt-2 text-right">
                                                            {format(new Date(message.timestamp), 'p')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="flex gap-2 max-w-[75%]">
                                                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                                                    <Bot className="h-4 w-4" />
                                                </div>
                                                <div className="rounded-2xl px-4 py-3 shadow-md bg-white dark:bg-muted/60 border border-muted flex items-center">
                                                    <TypingIndicator />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>
                                {/* Error Display */}
                                {error && (
                                    <div className="mx-4 mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                        <p className="text-sm text-destructive">{error}</p>
                                    </div>
                                )}
                                {/* Input Form */}
                                <div className="border-t p-4 bg-background">
                                    <form onSubmit={handleSubmit} className="flex gap-3">
                                        <textarea
                                            ref={inputRef}
                                            value={question}
                                            onChange={e => setQuestion(e.target.value)}
                                            onKeyDown={handleInputKeyDown}
                                            placeholder="Ask me anything about my skills, projects, or experience..."
                                            disabled={isLoading}
                                            className="flex-1 resize-none rounded-lg border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px] max-h-32 shadow-sm"
                                            rows={1}
                                        />
                                        <Button 
                                            type="submit" 
                                            disabled={isLoading || !question.trim()}
                                            size="icon"
                                            className="shrink-0 h-11 w-11"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Send className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
} 