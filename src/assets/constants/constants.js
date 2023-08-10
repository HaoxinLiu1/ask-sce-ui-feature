import { createStyleSet } from 'botframework-webchat';
export const ASK_SCE_TITLE = "ASK SCE Chatbot";


export const createChatStyleSet = () => {
    const set = createStyleSet({
        bubbleBackground: '#F8F8F8',
        bubbleFromUserBackground: '#E4F5F5',
        bubbleTextColor: 'black',
        bubbleFromUserTextColor: 'black',
        groupTimestamp: true,
        timestampColor: 'rgba(0, 0, 0, .6)',
        timestampFormat: date => date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        bubbleFromUserMinWidth: 730, // try to control the width by minimum width
        bubbleFromUserBorderRadius: 8,
        bubbleNubOffset: 50, // Adds a 50px space below each bot message
        bubbleFromUserNubOffset: 50, // Adds a 50px space below each user message
        fontSizeSmall: '17px'
    });

    set.bubbleFromUserBorderRadius = '8px';
    set.bubbleFromUserBackgroundColor = '#E4F5F5';
    set.sendBoxButtonColorOnHover = 'white';
    set.sendBoxHeight = 49;
    set.sendBox = {
        boxSizing: 'border-box',
        height: '49px',
        border: '1px solid #C5C5C5',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
    };

    set.sendBoxButton = {
        height: '49px',
        width: '160px',
        borderRadius: '8px',
        backgroundColor: '#588935',
    };

    set.sendBoxContainer = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    return set;
};
