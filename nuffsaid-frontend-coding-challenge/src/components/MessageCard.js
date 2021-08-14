import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    width:400px;
    border-radius: 6px;
    padding:4px 8px;
    background-color: ${props => props.color};
    margin-bottom:1rem;
    box-sizing: border-box;
`
const Message = styled.p``

const Clear = styled.div`
    text-align:right;
    cursor: pointer;
`

const MessageCard = ({data, color, deleteMessage}) => {
    const {priority,message, id} = data;

    const handleDelete = id =>{
        deleteMessage(id, priority)
    }
    return (
        <Card color={color}>
            <Message>
                {message}
            </Message>
            <Clear
            onClick={()=> handleDelete(id)}
            >
                Clear
            </Clear>
        </Card>
    )
}

export default MessageCard
