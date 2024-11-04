import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;
export const Title = styled.h1`
    font-size: 42px;
`;
export const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
`;
export const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    margin-bottom: 10px;
    font-size: 16px;
    text-align: center;

    &[type='submit'] {
        cursor: pointer;
        text-align: center;
        &:hover {
            color: #9bb4ff;
            opacity: 0.8;
        }
    }
`;
export const Error = styled.span`
    font-weight: 10;
    color: #ff6f61;
`;
export const Swithcer = styled.span`
    margin-top: 20px;
    a {
        color: #ffd09b;
        &:hover {
            color: #9bb4ff;
            opacity: 0.8;
        }
    }
`;
