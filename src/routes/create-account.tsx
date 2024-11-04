import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Error, Form, Input, Swithcer, Title, Wrapper } from '../components/auth-components';
import GithubButton from '../components/github-btn';

import { useTranslation } from 'react-i18next';

export default function CreateAccount() {
    const navigate = useNavigate();
    const { t } = useTranslation(); // 다국어 지원을 위해 useTranslation 훅 사용
    const [isLoading, setLoading] = useState(false);
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (isLoading || name === '' || email === '' || password === '') return;

        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate('/');
            //
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
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
            <Title>{t('joinKawaiinu')}</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" onChange={onChange} value={name} placeholder={t('name')} type="text" required />
                <Input name="email" onChange={onChange} value={email} placeholder={t('email')} type="email" required />
                <Input
                    name="password"
                    onChange={onChange}
                    value={password}
                    placeholder={t('password')} // 수정된 부분
                    type="password"
                    required
                />
                <Input type="submit" value={isLoading ? t('loading') : t('createAccount')} />
            </Form>
            {error !== '' ? <Error>{error}</Error> : null}
            <Swithcer>
                {t('alreadyHaveAccount')} <Link to="/login">{t('logIn')} &rarr;</Link>
            </Swithcer>
            <GithubButton />
        </Wrapper>
    );
}
