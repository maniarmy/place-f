import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/component/FormElements/Input';
import './PlaceForm.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import  Button  from '../../shared/component/FormElements/Button';
import {useForm} from '../../shared/hooks/form-hook'
import { useHtttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/component/uiElement/LoadingSpinner';
import ErrorModal from '../../shared/component/uiElement/ErrorModal';
import ImageUpload from '../../shared/component/FormElements/ImageUploads';



const NewPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHtttpClient();
  const [formState,inputHandler] = useForm({
    title:{
      value:'',
      isValid: false
    },
    description:{
      value:'',
      isValid: false
    },
    address:{
      value:'',
      isValid: false
    },
    image: {
      value: null,
      isValid: false
    }
  }, false);
  

  const placeSubmitHandler = async event =>{
    event.preventDefault();
    try{
      const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('address', formState.inputs.address.value);
        formData.append('image', formState.inputs.image.value);
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        formData,
        {Authorization: 'Bearer ' + auth.token}
      );
      navigate('/');
    }
    catch{

    }
   
  }

  
  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay/>}
      <Input
        id="title" 
        element="input" 
        type="text" 
        label="Title"
        validators= {[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid title"
        onInput={inputHandler}
        />

        <Input
        id="description" 
        element="textarea" 
        type="text" 
        label="Description"
        validators= {[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="please enter a valid description"
        onInput={inputHandler}
        />

        <Input
        id="address" 
        element="input" 
        type="text" 
        label="Address"
        validators= {[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid address"
        onInput={inputHandler}
        />

        <ImageUpload id='image' 
        onInput= {inputHandler} 
        errorText='please provide an image'
        />

        <Button type="submit" disabled = {!formState.isValid}>ADDplace</Button>
    </form>
    </>
  );
};

export default NewPlace;
