"use client"; 
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
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
        <div className="py-20">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Skills<span className="text-primary">.</span></h1>
                <p className="text-xs">Some of my skills, i learnt in my journey of <br /> self thought coding<span className="text-primary">.</span></p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto grid gap-2 px-6">
            <Label className="mt-3" htmlFor="name">Full Name</Label>
                <Input onChange={handleChange} value={formState.name} autoComplete="off" name="name" id="name" type="text" placeholder="John Deo" />
                <Label className="mt-3" htmlFor="email">Email</Label>
                <Input onChange={handleChange} value={formState.email} autoComplete="off" name="email" id="email" type="email" placeholder="john@deo.com" />
                <Label className="mt-3" htmlFor="message">Message</Label>
                <Textarea onChange={handleChange} value={formState.message} autoComplete="off" name="message" id="message" placeholder="I wanna hire you.."></Textarea>
                <Button className="mt-4" type="submit">Send</Button>
                {resultMessage && (
                    <p className="mt-2 text-center text-xs">{resultMessage}</p>
                )}
            </form>
        </div>
    );
}
