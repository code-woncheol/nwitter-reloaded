import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth/cordova';
import { Navigate, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;
const Title = styled.h1`
    font-size: 42px;
`;
const Form = styled.form`
    margin-top: 50px;
    dispaly: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;
const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    margin-bottom: 10px;
    font-size: 16px;
    &[type='submit'] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [error, setError] = useState('');
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || name === '' || email === '' || password === '') return;
        setLoading(true);
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate('/');
            //
        } catch (e) {
            console.log(e);
            //setError
        } finally {
            setLoading(false);
        }
        console.log(name, email, password);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'name') {
            SetName(value);
        } else if (name === 'email') {
            SetEmail(value);
        } else if (name === 'password') {
            SetPassword(value);
        }
    };
    return (
        <Wrapper>
            <Title>Join x</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" onChange={onChange} value={name} placeholder="Name" type="text" required />
                <Input name="email" onChange={onChange} value={email} placeholder="Email" type="email" required />
                <Input
                    name="password"
                    onChange={onChange}
                    value={password}
                    placeholder="Password"
                    type="password"
                    required
                />
                <Input type="submit" value={isLoading ? 'Loading...' : 'Create Account'} />
            </Form>
            {error !== '' ? <Error>{error}</Error> : null}
        </Wrapper>
    );
}
