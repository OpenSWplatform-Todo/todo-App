import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {images} from '../images';

const Icon = styled.Image`
    tint-color: ${({theme}) => theme.icon};
    width: 30px;
    height: 30px;
    margin: 10px;
`;

const Iconimg = ({type}) => {
    return (
        <Icon source={type}/>
    );
};

Iconimg.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
};

export default Iconimg;