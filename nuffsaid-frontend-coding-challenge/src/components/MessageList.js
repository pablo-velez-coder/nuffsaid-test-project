import React, { useState, useEffect } from 'react'
import Api from '../api'
import Snackbar from '@material-ui/core/Snackbar';
import MessageCard from './MessageCard';
import styled from 'styled-components';

const MessageList = ()=> {
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [infos, setInfos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isApiStarted, setisApiStarted] = useState(false);

  const messagesArray = [
    {id:1, title:'Error Type 1', data:errors, color: '#F56236'},
    {id:2, title:'Warning Type 2', data:warnings, color: '#FCE788'},
    {id:3, title:'Info Type 3', data:infos, color: '#88FCA3'},
  ]

 const api = new Api({
    messageCallback: (message) => {
      messageCallback(message)
    },
  })

  useEffect(() => {
    api.start()
  }, [])

  const handleClick = () => {
    if (isApiStarted) {
      api.stop()
      setisApiStarted(false)
    } else {
      api.start()
      setisApiStarted(true)
    }
  }

  function messageCallback(message) {
    if(message.priority === 1){
      setErrorMessage(message.message)
      setOpenSnackbar(true);
      setErrors(errors=> [...errors,{
        ...message,
        id: Date.now()
        }])
    }
    if(message.priority === 2){
      setWarnings(warnings=> [ ...warnings,  {
        ...message,
        id: Date.now()
        } ])
    }
    if(message.priority === 3){
      setInfos(infos=> [...infos,{
      ...message,
      id: Date.now()
      }
      ])
    }
  }

  const deleteMessage = (id,type) =>{
    if(type ===1){
      setErrors(errors.filter(item => item.id !== id))
    }
    if(type ===2){
      setWarnings(warnings.filter(item => item.id !== id))
    }
    if(type ===3){
      setInfos(infos.filter(item => item.id !== id))
    }
  }

  const handleDeleteAll = () =>{
    setErrors([])
    setWarnings([])
    setInfos([])
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  function renderButton() {
    const isApiStarted = api.isStarted()
    return (
      <ButtonsContainer>
      <ButtonAction
      data-testid="stop-play"
        variant="contained"
        onClick={handleClick}
      >
        {isApiStarted ? 'Stop' : 'Start'}
      </ButtonAction>
      <ButtonAction
      data-testid="clear"
        variant="contained"
        onClick={handleDeleteAll}
      >
        Clear
      </ButtonAction>
      </ButtonsContainer>
    )
  }
    
    return (
      <>
      <Title
      data-testid="title"
      >
        nuffsaid.com Coding Challengue
      </Title>
      <Container>
        {renderButton()}
        <ListContainer>
        {messagesArray.map(item => (
          <CardsContainer key={item.id}>
          <MessageType>
              {item.title}
          </MessageType>
          <MessageCount>
            Count: {item.data.length}
          </MessageCount>
          {item.data.map(el=>(
            <MessageCard
            deleteMessage={deleteMessage}
            key={el.id}
            data={el}
            color={item.color}
            />
          ))}
        </CardsContainer>
          ) )}
        </ListContainer>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        message={errorMessage}
      />
      </>
    )
}

export default MessageList

const Container = styled.div`
  margin:0 auto;
  max-width: 1250px;
`
const ListContainer = styled.div`
  display:flex;
  justify-content: space-between;
`
const CardsContainer = styled.div`
  width:400px;
  margin-right: 1rem;
`
const MessageType = styled.h2`
`
const Title = styled.h1`
  font-weight: 300;
  padding-left: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid lightgray;
`
const MessageCount = styled.p``

const ButtonAction = styled.button`
  background-color: #88FCA3;
  text-transform: uppercase;
  font-weight: bold;
  border-width: 0;
  border-radius: 6px;
  outline-width: 0;
  display:flex;
  justify-content: center;
  padding:10px 12px;
  cursor: pointer;
`

const ButtonsContainer = styled.div`
  display:flex;
  justify-content:space-between;
  margin-bottom: 3rem;
  max-width: 13%;
  margin:2rem auto 3rem;
`