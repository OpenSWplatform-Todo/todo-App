import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';
import Modal from "./Modal";
import Popup from "./Popup";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme.itemBackground};
    width: 100%;
    padding: 10px;
    margin: 5px 0px;
`;

const Contents = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.text};
`;

const InnerContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
`;

const ModalContainer = styled.View`
    padding-top: 0px;
`;

const Date = styled.Text`
    font-size: 15px;
`;

const Task = ({text, date}) => {
    return (
        <Container>
            <IconButton type={images.uncompleted}/>
            <InnerContainer>
                <Contents>{text}</Contents>
                <Date>{date}</Date>
            </InnerContainer>
            <ModalContainer>
                <Popup />
                <Modal />
            </ModalContainer>
        </Container>
    );
};

Task.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Task;