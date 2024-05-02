"use client"; 
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [resultMessage, setResultMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        emailjs.sendForm(
            process.env.NEXT_PUBLIC_SERVICE_ID, 
            process.env.NEXT_PUBLIC_TEMPLATE_ID, 
            e.target,
            process.env.NEXT_PUBLIC_PUBLIC_KEY )
            .then((result) => {
                setResultMessage('Email successfully sent!');
                console.log('Email successfully sent!', result.text);
                setFormState({ name: '', email: '', message: '' });
            }, (error) => {
                setResultMessage('Failed to send email. Please try again later.');
                console.log('Failed to send email:', error.text);
            });
    };

    return (
        <div className="py-10 -mt-5 px-5">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto grid gap-2 px-6 border-rounded py-2">
            <Label className="mt-3" htmlFor="name">Full Name</Label>
                <Input onChange={handleChange} value={formState.name} autoComplete="off" name="name" id="name" type="text" placeholder="John Deo" required={true} />
                <Label className="mt-3" htmlFor="email">Email</Label>
                <Input onChange={handleChange} value={formState.email} autoComplete="off" name="email" id="email" type="email" placeholder="john@deo.com" required={true} />
                <Label className="mt-3" htmlFor="message">Message</Label>
                <Textarea onChange={handleChange} value={formState.message} autoComplete="off" name="message" id="message" placeholder="I wanna hire you.." required={true}></Textarea>
                <Button className="mt-4" type="submit">Send</Button>
                {resultMessage && (
                    <p className="mt-2 text-center text-xs">{resultMessage}</p>
                )}
            </form>
        </div>
    );
}
