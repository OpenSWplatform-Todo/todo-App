import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.itemBackground};
    width: 100%;
    padding: 5px;
    margin: 5px 0px;
`;

const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({theme}) => theme.text};
`;

const Task = ({text, date}) => {
    return (
        <Container>
            <IconButton type={images.uncompleted}/>
            <Contents>{text}</Contents>
            <Contents>{date}</Contents>
            <IconButton type={images.delete}/>
        </Container>
    );
};

Task.propTypes = {
    test: PropTypes.string.isRequired,
};

export default Task;