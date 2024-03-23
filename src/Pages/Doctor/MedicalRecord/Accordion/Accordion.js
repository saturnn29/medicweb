import React from "react";
import styled from "styled-components";

// Styled container for the entire accordion
const AccordionContainer = styled.div`
    overflow: hidden;
    width: 75rem; /* Initial width of the accordion */
    margin: 0 auto;
    border-radius: 0.5rem;
    background-color: rgba(22, 160, 133, 0.5);
    color: black;

    /* Responsive width adjustments */
    @media (max-width: 1650px) {
        width: 55rem;
    }
    // Additional media queries for different screen widths...
`;

// Styled container for the inner content of each accordion item
const Inner = styled.div`
    position: absolute;
    padding: 1rem;
    color: black;
`;

// Styled button serving as the header of each accordion item
const Header = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
    padding: 0 1rem;
    font-size: 1rem;
    text-align: left;
    background-color: rgba(22, 160, 133, 0.5);
    color: inherit;
    cursor: pointer;
    border: 1px solid #4EEE94; 

    // Additional styling for the header...
`;

// Styled span for the icon in the accordion header
const HeaderIcon = styled.span`
    transform: rotate(${props => props.isActive ? -180 : 0}deg); /* Rotate icon based on accordion state */
    transition: all 0.2s; /* Smooth transition effect */
`;

// Styled container for the content of each accordion item
const Content = styled.div`
    position: relative;
    overflow: hidden;
    height: ${props =>{
        const inner = document.getElementById(props.itemName);
        return `${props.isActive && inner ? inner.clientHeight : 0}px`; // Dynamic height calculation
    }};
    transition: height 0.35s; /* Smooth transition effect for height change */
`;

// Component representing an individual accordion item
const AccordionContent = ({onClick, itemName, itemContent, isActive}) =>{
    return(
        <React.Fragment>
            {/* Header for the accordion item */}
            <Header onClick={onClick}>
                {itemName}
                {/* Icon for indicating accordion state */}
                <HeaderIcon isActive={isActive} className="material-icons">
                    expand_more
                </HeaderIcon>
            </Header>
            {/* Content of the accordion item */}
            <Content itemName={itemName} isActive={isActive}>
                <Inner id={itemName}>{itemContent}</Inner>
            </Content>
        </React.Fragment>
    )
}

// Exporting the styled components and the AccordionContent component
export {AccordionContainer, AccordionContent};
