import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../shared/component/uiElement/Card';

import Input from '../../shared/component/FormElements/Input';
import Button from '../../shared/component/FormElements/Button';
import LoadingSpinner from '../../shared/component/uiElement/LoadingSpinner';
import ErrorModal from '../../shared/component/uiElement/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

import { useHtttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/component/FormElements/ImageUploads';


const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHtttpClient();
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`
        );
        setLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            },
            image: {
              value: responseData.place.image,
              isValid: true
            },
            address: {
              value: responseData.place.address,
              isValid: true
            }
          },
          true
        );
      } 
      catch (err) {

      }
    };
    fetchPlaces();
  }, [sendRequest, setFormData, placeId]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try{
      const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('image', formState.inputs.image.value);
        formData.append('address', formState.inputs.address.value);
        
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`,
        'PATCH',
        formData,
        {Authorization: 'Bearer ' + auth.token}
      );
      navigate(`/${auth.userId}/places`);

    }
    catch(err){
    console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner/>
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
        <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
     <ErrorModal error={error} onClear={clearError}/>
    {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initialValid={true}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
      />

      <ImageUpload 
      id="image" 
      onInput={inputHandler} 
      errorText='please provide an image'
      initialImage={process.env.REACT_APP_ASSET_URL+`/${loadedPlace.image}`}
      />

      <Input
        id="address" 
        element="input" 
        type="text" 
        label="Address"
        validators= {[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid address"
        onInput={inputHandler}
        initialValue={loadedPlace.address}
        initialValid={true}
        />

      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>}
    </>
  );
};

export default UpdatePlace;
