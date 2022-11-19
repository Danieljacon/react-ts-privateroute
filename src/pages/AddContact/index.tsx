import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { ContactContext } from '../../contexts/ContactContext'
import { IContact } from '../../utils/interfaces';
import { schemaContact } from '../../utils/schemas';

export const AddContact = () => {
    const {addContact} = useContext(ContactContext)
    const { register, handleSubmit, formState: {errors}} = useForm<IContact>({
        resolver: yupResolver(schemaContact),
      });
      const onSubmit = (data: IContact) => {
        // addContact(data);
      };



  return (
    <div>Contatto</div>
  )
}
